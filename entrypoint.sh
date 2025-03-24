#!/bin/bash

# Check if environment variables are set
if [ -z "$CF_SERVICE_TOKEN_ID" ] || [ -z "$CF_SERVICE_TOKEN_SECRET" ]; then
  echo "Error: Cloudflare service token credentials are not set"
  exit 1
fi

# Start cloudflared to create a local proxy to your MySQL database
cloudflared access tcp --hostname db.nyxsis.io --url localhost:5005 \
  --id "$CF_SERVICE_TOKEN_ID" --secret "$CF_SERVICE_TOKEN_SECRET" &

# Wait for the tunnel to establish
sleep 3

# Start the Next.js application
HOSTNAME="0.0.0.0" exec bun run server.js
