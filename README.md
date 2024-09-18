<div align="center"><img src="frontend/public/static/logo.png" width='70px' alt="Logo"></div>

---

**Subbit** is a full-stack web application that allows users to upload videos, search for specific phrases in subtitles, and jump to the exact timestamp where the phrase appears.

- **Backend**: Django Rest Framework (DRF) with PostgreSQL
- **Frontend**: Next.js
- **Containerization**: Docker, Docker Compose

## Features

- **Video Upload**: Upload videos (MP4, WebM, MKV).
- **Subtitle Extraction**: Extract available subtitle languages.
- **Search Subtitles**: Search phrases within subtitles.
- **Jump to Timestamp**: Click to jump directly to the phrase in the video.

---

## Project Structure

- **Backend**: `Django` (API built with Django Rest Framework)
- **Frontend**: `Next.js` (React-based front-end framework)
- **Database**: PostgreSQL
- **Storage**: Local file system for media files (videos and subtitles)

---

## Installation

### Prerequisites

- Docker
- Docker Compose
- Node.js
- Python 3.x

### Backend Setup

Clone the repository:

```bash
git clone https://github.com/Sahil-B07/Subbit
```

## Development

Running Locally Without Docker
If you prefer to run the project without Docker, follow these steps:

**Backend Setup**

1. Set up a virtual environment and install dependencies:

   ```
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. Set up the PostgreSQL database and configure the .env file with your credentials.

   **.env (backend)**

   ```

   POSTGRES_DB=subbit_db
   POSTGRES_USER=subbit_user
   POSTGRES_PASSWORD=yourpassword
   PG_HOST = 'localhost'
   ```

3. Run migrations and start the Django server:

   ```
   python manage.py migrate
   python manage.py runserver
   ```

**Frontend Setup**

1. Install dependencies and start the development server:

   ```
   cd frontend
   npm install
   npm run dev
   ```

2. The Next.js frontend will run on http://localhost:3000.

# Docker Setup

### **Build and Run the Containers**

Start all services using Docker Compose:

```
docker-compose up --build
```

### This will:

1. Spin up a PostgreSQL database on port `5432`.
2. Launch the Django backend on port `8000`.
3. Run the Next.js frontend on port `3000`.

# Demo

[demo](Fatmug2/demo.mp4)
