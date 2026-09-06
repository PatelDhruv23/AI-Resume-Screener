from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from services.email_service import send_email
from typing import List
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import Depends
from deps import get_db
import models
from pydantic import BaseModel
from models import Resume, ScreeningResult
from services.ai_service import generate_interview_questions
from services.parser import extract_text_from_pdf, extract_email, extract_name 
from services.ats import extract_required_skills, calculate_jd_score,calculate_project_score,calculate_experience_score,calculate_education_score
from services.shortlist import is_properly_structured

router = APIRouter(prefix="/resume", tags=["Resumes"])

MAX_FILES = 100


@router.post("/upload")
async def upload_resumes(
    resumes: List[UploadFile] = File(...),
    job_description: str = Form(...),
    job_title: str = Form(...),
    cutoff_score: int = Form(...),  # 🔥 NEW: HR defines the cutoff score here
    shortlist_count: int = Form(...),
    skills_weight: int = Form(...),
    projects_weight: int = Form(...),
    experience_weight: int = Form(...),
    education_weight: int = Form(...),
    db: Session = Depends(get_db)
):
    

    # Validate weights
    total_weight = skills_weight + projects_weight + experience_weight + education_weight
    if total_weight != 100:
        raise HTTPException(status_code=400, detail="All weights must sum to 100")

    if len(resumes) > MAX_FILES:
        raise HTTPException(status_code=400, detail=f"You can upload maximum {MAX_FILES} resumes at a time")

    required_skills = extract_required_skills(job_description)
    results = []

    job = models.JobDescription(job_text=job_description,job_title=job_title)
    db.add(job)
    db.commit()
    db.refresh(job)

    for file in resumes:
        if file.content_type != "application/pdf":
            continue

        text = extract_text_from_pdf(file.file)
        is_valid = is_properly_structured(text)
        
        # 🔥 NEW: Extract Name and Email
        candidate_email = extract_email(text)
        candidate_name = extract_name(text)

        skill_score, matched, missing = calculate_jd_score(text, required_skills)
        project_score = calculate_project_score(text, required_skills)
        experience_score = calculate_experience_score(text)
        education_score = calculate_education_score(text, required_skills)

        final_score = (
            (skills_weight / 100) * skill_score +
            (projects_weight / 100) * project_score +
            (experience_weight / 100) * experience_score +
            (education_weight / 100) * education_score
        )

        # 🔥 NEW: Added name and email to the dictionary so frontend can use it
        results.append({
            "filename": file.filename,
            "candidate_name": candidate_name,
            "candidate_email": candidate_email,
            "is_structured": is_valid,
            "skill_score": skill_score,
            "project_score": project_score,
            "experience_score": experience_score,
            "education_score": education_score,
            "final_score": int(final_score),
            "matched_skills": matched,
            "missing_skills": missing
        })

        # 🔥 NEW: Save name and email to the DB
        resume_record = models.Resume(
            filename=file.filename,
            candidate_name=candidate_name,
            candidate_email=candidate_email,
            text_length=len(text),
            is_structured=is_valid
        )
        db.add(resume_record)
        db.commit()
        db.refresh(resume_record)

        result = models.ScreeningResult(
            resume_id=resume_record.id,
            job_id=job.id,
            skill_score=skill_score,
            project_score=project_score,
            experience_score=experience_score,
            education_score=education_score,
            final_score=final_score,
            matched_skills=",".join(matched),
            missing_skills=",".join(missing)
        )
        db.add(result)
        db.commit()

    # 🔥 NEW: FILTER BASED ON DYNAMIC cutoff_score instead of hardcoded 60
    qualified = [
        r for r in results
        if r["is_structured"] and r["final_score"] >= cutoff_score
    ]

    # SORT BY FinalScore
    qualified.sort(key=lambda x: x["final_score"], reverse=True)

    # SHORTLIST TOP N
    shortlisted = qualified[:shortlist_count]

    return {
        "job_title": job_title,
        "job_description": job_description,
        "required_skills": required_skills,
        "total_uploaded": len(results),
        "qualified_count": len(qualified),
        "shortlisted_count": len(shortlisted),
        "shortlisted_candidates": shortlisted, 
    }

    # ... (End of your upload_resumes function)

# ... (End of your upload_resumes function)


class CandidateData(BaseModel):
    candidate_name: str
    matched_skills: Optional[str] = ""
    missing_skills: Optional[str] = ""
    project_score: Optional[float] = 0.0


class QuestionRequest(BaseModel):
    candidate: dict
    job_title: str


@router.post("/generate-questions")
async def generate_questions(req: dict):
    try:
        print("🔥 RAW REQUEST:", req)

        candidate = req.get("candidate")
        job_title = req.get("job_title")

        if not candidate or not job_title:
            return {"questions": "Invalid request data"}

        questions = generate_interview_questions(candidate, job_title)

        return {"questions": questions}

    except Exception as e:
        print("❌ ERROR:", e)
        return {"questions": "Error generating questions"}
    

@router.post("/send-email")
async def send_email_route(req: dict):
    try:
        print("📩 EMAIL REQUEST:", req)

        success = send_email(
            req.get("email"),
            req.get("name"),
            req.get("job_title"),
            req.get("questions")
        )

        return {"status": "success" if success else "failed"}

    except Exception as e:
        print("❌ ERROR:", e)
        return {"status": "error"}