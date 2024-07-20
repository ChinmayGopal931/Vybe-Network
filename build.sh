#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
# set -e


# chmod +x ./frontend-build.sh
# chmod +x ./backend-build.sh

# ./backend.sh & ./frontend-build.sh && fg


echo "Starting frontend and backend in parallel..."

sh -ec 'cd backend && npm install && docker-compose up --build' &
sh -ec 'cd frontend && npm install && npm run dev' &

# Wait for all background jobs to complete
wait