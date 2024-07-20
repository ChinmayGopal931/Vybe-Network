#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Building frontend..."
cd frontend
npm install
npm run build

echo "Copying frontend build to backend public directory..."
cd ../backend
mkdir -p public
cp -r ../frontend/dist/* public/

echo "Building and running Docker containers..."
docker-compose up --build
