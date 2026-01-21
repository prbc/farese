#!/usr/bin/env python3
# /// script
# dependencies = [
#   "anthropic>=0.40.0",
#   "httpx>=0.27.0",
#   "python-dotenv>=1.0.0",
# ]
# requires-python = ">=3.11"
# ///
"""
Email Backlog Processor for Farese.com Church Directory

Processes email files containing church update requests, uses Claude to analyze
and extract church information, geocodes addresses, and submits to the API.

Usage:
    uv run scripts/process_emails.py [--dry-run] [email_file_or_directory]

Environment Variables:
    ANTHROPIC_API_KEY: Required - Your Anthropic API key
    FARESE_API_URL: Optional - API endpoint (default: https://farese-api.pig.workers.dev)
"""

import argparse
import json
import os
import sys
import email
from email import policy
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass, asdict
from typing import Optional

import httpx
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

# Configuration
API_URL = os.environ.get("FARESE_API_URL", "https://farese-api.pig.workers.dev")
NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
PROCESSED_FILE = Path("mail/processed.json")

@dataclass
class ChurchSubmission:
    action: str  # add, edit, delete
    name: str
    address: str
    region: str
    website: Optional[str] = None
    note: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    submitter_email: Optional[str] = None
    submitter_notes: Optional[str] = None


def load_processed() -> dict:
    """Load the list of already processed emails."""
    if PROCESSED_FILE.exists():
        return json.loads(PROCESSED_FILE.read_text())
    return {}


def save_processed(processed: dict):
    """Save the processed emails list."""
    PROCESSED_FILE.parent.mkdir(parents=True, exist_ok=True)
    PROCESSED_FILE.write_text(json.dumps(processed, indent=2))


def parse_email_file(file_path: Path) -> tuple[str, str, str]:
    """Parse an email file and return (subject, sender, body)."""
    content = file_path.read_text(errors='replace')

    # Try parsing as standard email format
    if file_path.suffix.lower() == '.eml':
        msg = email.message_from_string(content, policy=policy.default)
        subject = msg.get('Subject', '')
        sender = msg.get('From', '')

        # Get body
        if msg.is_multipart():
            body = ''
            for part in msg.walk():
                if part.get_content_type() == 'text/plain':
                    body = part.get_content()
                    break
        else:
            body = msg.get_content()
    else:
        # Plain text file - try to extract headers
        lines = content.split('\n')
        subject = ''
        sender = ''
        body_start = 0

        for i, line in enumerate(lines):
            if line.lower().startswith('subject:'):
                subject = line.split(':', 1)[1].strip()
            elif line.lower().startswith('from:'):
                sender = line.split(':', 1)[1].strip()
            elif line.strip() == '' and (subject or sender):
                body_start = i + 1
                break

        body = '\n'.join(lines[body_start:]) if body_start else content

    return subject, sender, body


def analyze_email_with_claude(subject: str, sender: str, body: str) -> Optional[ChurchSubmission]:
    """Use Claude to analyze an email and extract church information."""
    client = Anthropic()

    prompt = f"""Analyze this email about a church directory update and extract the relevant information.

Email Subject: {subject}
From: {sender}

Email Body:
{body}

Based on this email, determine:
1. What action is being requested (add new church, edit existing, or delete/report closure)
2. Church name
3. Full address (street, city, state/province, postal code, country)
4. Region code (USA, CAN, UK, AUS, EUR, AFR, ASIA, SA, or OTHER)
5. Website URL (if mentioned)
6. Additional notes (pastor name, phone, service times, etc.)
7. Any reason given for the update

Respond in JSON format only:
{{
    "action": "add" | "edit" | "delete",
    "name": "Church Name",
    "address": "Full street address, City, State ZIP, Country",
    "region": "USA",
    "website": "https://example.com" or null,
    "note": "Additional info" or null,
    "submitter_notes": "Reason for update" or null,
    "confidence": "high" | "medium" | "low",
    "issues": ["list of any unclear or missing information"]
}}

If you cannot determine the action or church name with reasonable confidence, set action to null."""

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    # Extract JSON from response
    response_text = response.content[0].text.strip()

    # Try to parse JSON (handle markdown code blocks)
    if response_text.startswith('```'):
        lines = response_text.split('\n')
        response_text = '\n'.join(lines[1:-1])

    try:
        data = json.loads(response_text)
    except json.JSONDecodeError as e:
        print(f"  Failed to parse Claude response: {e}")
        print(f"  Response was: {response_text[:500]}")
        return None

    if not data.get('action') or not data.get('name'):
        print(f"  Claude couldn't determine action or church name")
        if data.get('issues'):
            print(f"  Issues: {', '.join(data['issues'])}")
        return None

    return ChurchSubmission(
        action=data['action'],
        name=data['name'],
        address=data['address'],
        region=data.get('region', 'USA'),
        website=data.get('website'),
        note=data.get('note'),
        submitter_email=sender if '@' in sender else None,
        submitter_notes=data.get('submitter_notes'),
    )


def geocode_address(address: str) -> tuple[Optional[float], Optional[float]]:
    """Geocode an address using Nominatim."""
    try:
        with httpx.Client() as client:
            response = client.get(
                NOMINATIM_URL,
                params={
                    'q': address,
                    'format': 'json',
                    'limit': 1,
                },
                headers={
                    'User-Agent': 'Farese.com Church Directory (contact: admin@farese.com)',
                },
                timeout=10.0,
            )
            response.raise_for_status()
            results = response.json()

            if results:
                return float(results[0]['lat']), float(results[0]['lon'])
    except Exception as e:
        print(f"  Geocoding failed: {e}")

    return None, None


def submit_to_api(submission: ChurchSubmission, dry_run: bool = False) -> Optional[str]:
    """Submit the church update to the API."""
    if not submission.latitude or not submission.longitude:
        print("  Error: Missing coordinates, cannot submit")
        return None

    payload = {
        "action": submission.action,
        "church": {
            "name": submission.name,
            "address": submission.address,
            "region": submission.region,
        },
        "geometry": {
            "type": "Point",
            "coordinates": [submission.longitude, submission.latitude],
        },
        "submitter": {
            "email": submission.submitter_email or "email-processor@farese.com",
            "notes": submission.submitter_notes,
        },
    }

    if submission.website:
        payload["church"]["website"] = submission.website
    if submission.note:
        payload["church"]["note"] = submission.note

    if dry_run:
        print(f"  [DRY RUN] Would submit:")
        print(f"    {json.dumps(payload, indent=2)}")
        return "dry-run"

    try:
        with httpx.Client() as client:
            response = client.post(
                f"{API_URL}/api/submit-church",
                json=payload,
                timeout=30.0,
            )
            response.raise_for_status()
            result = response.json()
            return result.get('prUrl', 'submitted')
    except httpx.HTTPStatusError as e:
        print(f"  API error: {e.response.status_code} - {e.response.text}")
    except Exception as e:
        print(f"  Submission failed: {e}")

    return None


def process_email(file_path: Path, dry_run: bool = False) -> dict:
    """Process a single email file."""
    result = {
        "file": str(file_path),
        "timestamp": datetime.now().isoformat(),
        "status": "pending",
    }

    print(f"\nProcessing: {file_path.name}")

    # Parse email
    try:
        subject, sender, body = parse_email_file(file_path)
        print(f"  Subject: {subject[:50]}..." if len(subject) > 50 else f"  Subject: {subject}")
        print(f"  From: {sender}")
    except Exception as e:
        print(f"  Failed to parse email: {e}")
        result["status"] = "parse_error"
        result["error"] = str(e)
        return result

    # Analyze with Claude
    print("  Analyzing with Claude...")
    submission = analyze_email_with_claude(subject, sender, body)

    if not submission:
        result["status"] = "analysis_failed"
        return result

    print(f"  Action: {submission.action}")
    print(f"  Church: {submission.name}")
    print(f"  Address: {submission.address}")
    result["submission"] = asdict(submission)

    # Geocode
    print("  Geocoding address...")
    lat, lon = geocode_address(submission.address)

    if lat and lon:
        submission.latitude = lat
        submission.longitude = lon
        print(f"  Coordinates: {lat}, {lon}")
    else:
        print("  Warning: Could not geocode address")
        result["status"] = "geocode_failed"
        return result

    # Submit to API
    print("  Submitting to API...")
    pr_url = submit_to_api(submission, dry_run)

    if pr_url:
        result["status"] = "success"
        result["pr_url"] = pr_url
        print(f"  Success! PR: {pr_url}")
    else:
        result["status"] = "submit_failed"

    return result


def main():
    parser = argparse.ArgumentParser(description="Process email backlog for Farese.com")
    parser.add_argument("path", nargs="?", default="mail/inbox",
                        help="Email file or directory to process (default: mail/inbox)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Analyze emails but don't submit to API")
    parser.add_argument("--reprocess", action="store_true",
                        help="Reprocess already processed emails")
    args = parser.parse_args()

    # Check for API key
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: ANTHROPIC_API_KEY environment variable is required")
        print("Set it in a .env file or export it in your shell")
        sys.exit(1)

    path = Path(args.path)

    if not path.exists():
        print(f"Error: Path not found: {path}")
        print(f"\nTo get started, create the directory and add email files:")
        print(f"  mkdir -p mail/inbox")
        print(f"  # Add .eml or .txt email files to mail/inbox/")
        sys.exit(1)

    # Collect email files
    if path.is_file():
        email_files = [path]
    else:
        email_files = list(path.glob("*.eml")) + list(path.glob("*.txt"))

    if not email_files:
        print(f"No email files found in {path}")
        print("Looking for files with .eml or .txt extension")
        sys.exit(0)

    print(f"Found {len(email_files)} email file(s)")

    # Load processed list
    processed = load_processed()

    # Process each email
    results = []
    for email_file in sorted(email_files):
        file_key = str(email_file)

        if file_key in processed and not args.reprocess:
            print(f"\nSkipping (already processed): {email_file.name}")
            continue

        result = process_email(email_file, args.dry_run)
        results.append(result)

        # Update processed list
        if not args.dry_run:
            processed[file_key] = result
            save_processed(processed)

    # Summary
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)

    success = sum(1 for r in results if r["status"] == "success")
    failed = len(results) - success

    print(f"Processed: {len(results)}")
    print(f"Success: {success}")
    print(f"Failed: {failed}")

    if failed > 0:
        print("\nFailed emails:")
        for r in results:
            if r["status"] != "success":
                print(f"  - {r['file']}: {r['status']}")


if __name__ == "__main__":
    main()
