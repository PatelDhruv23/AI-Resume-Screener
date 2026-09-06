from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(Integer, primary_key=True, index=True)
    job_text = Column(Text)
    job_title = Column(String, nullable=True)

    results = relationship("ScreeningResult", back_populates="job")

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    
    # 🔥 NEW: Added columns for Name and Email
    candidate_name = Column(String, nullable=True) 
    candidate_email = Column(String, nullable=True)
    
    text_length = Column(Integer)
    is_structured = Column(Boolean)

    results = relationship("ScreeningResult", back_populates="resume")

class ScreeningResult(Base):
    __tablename__ = "screening_results"
    
    # ... (Keep the rest of your ScreeningResult class exactly the same)
    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"))
    job_id = Column(Integer, ForeignKey("job_descriptions.id"))
    skill_score = Column(Float)
    project_score = Column(Float)
    experience_score = Column(Float)
    education_score = Column(Float)
    final_score = Column(Float)
    matched_skills = Column(Text)
    missing_skills = Column(Text)
    resume = relationship("Resume", back_populates="results")
    job = relationship("JobDescription", back_populates="results")