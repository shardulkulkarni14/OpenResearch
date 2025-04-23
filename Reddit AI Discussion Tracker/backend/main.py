from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import praw
import os
from dotenv import load_dotenv
from typing import List, Optional
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Reddit AI Discussion Tracker")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Reddit client
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)

class Post(BaseModel):
    id: str
    title: str
    author: str
    score: int
    num_comments: int
    created_utc: float
    content: str
    url: str

@app.get("/api/subreddits")
async def get_subreddits():
    """Get list of available AI-related subreddits"""
    return {
        "subreddits": [
            "openai",
            "artificial",
            "MachineLearning",
            "AI",
            "ChatGPT",
            "Cursor"
        ]
    }

@app.get("/api/posts/{subreddit}")
async def get_posts(
    subreddit: str,
    sort_by: str = "hot",
    limit: int = 25
) -> List[Post]:
    """Get posts from a specific subreddit"""
    try:
        subreddit_obj = reddit.subreddit(subreddit)
        
        # Get posts based on sort method
        if sort_by == "hot":
            posts = subreddit_obj.hot(limit=limit)
        elif sort_by == "new":
            posts = subreddit_obj.new(limit=limit)
        elif sort_by == "top":
            posts = subreddit_obj.top(limit=limit)
        else:
            raise HTTPException(status_code=400, detail="Invalid sort method")
        
        result = []
        for post in posts:
            # Use post content directly instead of summarization
            content = post.selftext if post.selftext else "No content available"
            
            result.append(Post(
                id=post.id,
                title=post.title,
                author=post.author.name if post.author else "[deleted]",
                score=post.score,
                num_comments=post.num_comments,
                created_utc=post.created_utc,
                content=content,
                url=post.url
            ))
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 