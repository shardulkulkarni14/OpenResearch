# Reddit AI Discussion Tracker

A web application that tracks and summarizes AI-related discussions from Reddit.

## Features
- Browse AI-related subreddits (r/openai, r/ai, r/cursor, etc.)
- View post summaries and discussions
- Sort posts by upvotes, date, and comment count
- Clean, modern user interface

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Reddit API credentials (create at https://www.reddit.com/prefs/apps)

### Backend Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory with your Reddit API credentials:
```
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USER_AGENT=your_app_name
```

4. Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Project Structure
```
reddit-ai-tracker/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
``` 