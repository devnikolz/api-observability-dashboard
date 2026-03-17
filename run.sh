#!/bin/bash

cleanup() {
  echo ""
  echo "Stopping services..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

trap cleanup SIGINT

echo "Killing any process on port 5000..."
kill -9 $(lsof -ti :5000) 2>/dev/null

echo "Starting backend..."
source venv/bin/activate
python app.py &
BACKEND_PID=$!

echo "Starting frontend..."
cd frontend || exit
npm run dev &
FRONTEND_PID=$!

echo "Backend running with PID $BACKEND_PID"
echo "Frontend running with PID $FRONTEND_PID"
echo "Open http://localhost:5173"
echo "Press Ctrl+C to stop both."

wait