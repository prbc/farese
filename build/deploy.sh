#!/bin/sh

aws --profile prbc s3 sync . s3://farese.com --exclude ".git*" --delete
aws --profile prbc s3 cp s3://farese.com/sw.js s3://farese.com/sw.js --metadata-directive REPLACE --cache-control no-cache
