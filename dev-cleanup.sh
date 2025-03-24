#!/bin/bash

# Check if PID file exists
if [ -f .cf-tunnel.pid ]; then
  # Kill the tunnel process
  kill $(cat .cf-tunnel.pid)
  rm .cf-tunnel.pid
  echo "Cloudflare tunnel closed"
else
  echo "No active tunnel found"
fi
