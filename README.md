# API Observability Dashboard

A simple full-stack project that tracks API requests and shows basic performance data in a dashboard.

## What this project does

This project has two parts:

- **Backend (Flask):** saves request data like endpoint, status code, and response time
- **Frontend (React):** shows that data in a simple dashboard

In plain terms, this project acts like a small monitoring tool.  
It lets you log API activity and then view useful stats such as:

- how many requests were made
- how many failed
- the average response time

## Why this project exists

The goal of this project is to simulate a lightweight observability tool.

Observability means being able to see what your system is doing.
For example:

- Is the API getting requests?
- Are any requests failing?
- Is the system getting slower?

This project helps answer those questions in a simple way.

## Features

- Log API requests
- Store request data in SQLite
- View all saved logs
- Filter logs by status or endpoint
- View metrics like:
  - total requests
  - error count
  - average response time
- React dashboard for displaying the data

## Tech stack

### Backend
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- SQLite

### Frontend
- React
- Vite

## Project structure

```text
api-observability-dashboard/
├── app.py
├── requirements.txt
├── run.sh
├── venv/
├── instance/
│   └── database.db
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...