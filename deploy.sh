#!/bin/bash

# AppSupp Docs Deployment Script
# This script builds the Docusaurus static site and syncs it to the Nginx web root.

set -e

# Configuration
PROJECT_DIR="/home/abil/final_asp/website-dokumentasi"
NGINX_WEB_ROOT="/var/www/appsupp-docs/build"

echo "==> Starting Deployment for AppSupp Docs"

# 1. Move to project directory
cd "$PROJECT_DIR"

# 2. Install dependencies (optional, but good for CI)
echo "==> Installing dependencies..."
npm ci || npm install

# 3. Build the static site
echo "==> Building static files..."
npm run build

# 4. Sync files to Nginx web root
echo "==> Syncing files to Nginx root ($NGINX_WEB_ROOT)..."
# Using rsync to copy the build folder contents to the web root
sudo rsync -av --delete "$PROJECT_DIR/build/" "$NGINX_WEB_ROOT/"

# 5. Reload Nginx (optional, usually not needed just for static files, but good practice if config changed)
# echo "==> Reloading Nginx..."
# sudo systemctl reload nginx

echo "==> Deployment Complete!"
