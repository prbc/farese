#!/bin/sh

# Update Legacy site
echo "Updating the legacy directory"
cd legacy/
python2 generate-text-directory.py
cd ..

# Update service worker cache hashes
echo "Updating the service worker cached file hashes"
workbox generateSW workbox-config.js

echo "Complete"

