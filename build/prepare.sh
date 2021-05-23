#!/bin/sh

# Exit immediately on error
set -o errexit

# Update Legacy site
echo "Updating the legacy directory"
cd legacy/
python2 generate-text-directory.py
cd -

echo "Complete"
