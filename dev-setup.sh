#!/bin/bash
# Check if tunnel is already running
if [ -f .cf-tunnel.pid ]; then
  echo "Tunnel already running"
else
  # Load environment variables
  source .env
  
  # Start tunnel in background
  cloudflared access tcp --hostname db.nyxsis.io --url localhost:5005 \
    --id "$CF_SERVICE_TOKEN_ID" --secret "$CF_SERVICE_TOKEN_SECRET" &
  
  # Save PID
  echo $! > .cf-tunnel.pid
  
  echo "Tunnel established. Database available at localhost:5005"
fi
