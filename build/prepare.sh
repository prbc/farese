#!/bin/sh

# Update Legacy site
echo "Updating the legacy directory"
cd legacy/
python2 generate-text-directory.py

