from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.resume import router as resume_router
from database import engine
from models import Base

app = FastAPI(title="AI Resume Screener Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB
Base.metadata.create_all(bind=engine)

# Router (ONLY ONCE)
app.include_router(resume_router)

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}