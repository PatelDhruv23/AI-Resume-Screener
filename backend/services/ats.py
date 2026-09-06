import datetime
import re

SKILL_SYNONYMS = {
    "reactjs": ["react"],
    "node.js": ["node", "nodejs"],
    "postgresql": ["postgres"],
    "ci/cd pipelines": ["cicd", "ci cd"],
    "machine learning": ["ml"],
}

def extract_required_skills(jd_text: str):
    jd_text = jd_text.lower()

    # Locate Required Technical Skills section
    start = jd_text.find("required technical skills")
    if start == -1:
        return []

    end = jd_text.find("preferred qualifications")

    if end == -1:
        skills_section = jd_text[start:]
    else:
        skills_section = jd_text[start:end]

    skills_section = skills_section.replace("required technical skills", "")

    parts = re.split(r"•", skills_section)

    extracted_skills = []

    for part in parts:
        part = part.strip()

        if ":" in part:
            part = part.split(":", 1)[1]

        sub_parts = part.split(",")

        for skill in sub_parts:
            skill = skill.strip()
            skill = re.sub(r"\(.*?\)", "", skill)

            if len(skill) > 2:
                extracted_skills.append(skill)

    return list(set(extracted_skills))



def calculate_jd_score(resume_text: str, required_skills: list):

    resume_text = normalize_text(resume_text)

    normalized_skills = [
        normalize_text(skill)
        for skill in required_skills
    ]

    if not normalized_skills:
        return 0, [], []

    matched = [
        skill for skill in normalized_skills
        if skill in resume_text
    ]

    missing = [
        skill for skill in normalized_skills
        if skill not in resume_text
    ]

    score = (len(matched) / len(normalized_skills)) * 100

    return int(score), matched, missing




def calculate_project_score(resume_text: str, required_skills: list):

    resume_text = normalize_text(resume_text)
    required_skills = [normalize_text(skill) for skill in required_skills]

    project_section = extract_project_section(resume_text)

    if not project_section or len(project_section) < 50:
        return 0

    matched = [
        skill for skill in required_skills
        if skill in project_section
    ]

    score = (len(matched) / len(required_skills)) * 100

    return int(score)



def calculate_experience_score(resume_text: str):
    resume_text = resume_text.lower()

    current_year = datetime.datetime.now().year

    # 1️⃣ Direct "X years" detection
    match = re.search(r'(\d+)\+?\s+years', resume_text)
    if match:
        years = int(match.group(1))
        return map_years_to_score(years)

    # 2️⃣ Detect year ranges like 2019-2023
    ranges = re.findall(r'(20\d{2})\s*[-–]\s*(20\d{2}|present)', resume_text)

    total_years = 0

    for start, end in ranges:
        start_year = int(start)

        if end == "present":
            end_year = current_year
        else:
            end_year = int(end)

        if end_year >= start_year:
            years = (end_year - start_year)
            total_years = max(total_years, years)

    if total_years > 0:
        return map_years_to_score(total_years)

    # 3️⃣ Seniority keywords
    if "senior" in resume_text or "lead" in resume_text:
        return 85

    if "intern" in resume_text:
        return 25

    # Default fallback
    return 40


def map_years_to_score(years: int):
    if years <= 1:
        return 30
    elif years <= 3:
        return 60
    elif years <= 6:
        return 80
    else:
        return 100



def extract_education_section(resume_text: str):
    resume_text = resume_text.lower()

    match = re.search(
        r"(education|academic background)(.*?)(experience|projects|skills|certifications|\Z)",
        resume_text,
        re.DOTALL
    )

    if match:
        return match.group(2)

    return ""



    
def calculate_education_score(resume_text: str, required_skills: list):
    resume_text = resume_text.lower()

    education_section = extract_education_section(resume_text)

    if not education_section:
        return 20

    score = 0

    # 🎓 Degree hierarchy
    if "phd" in education_section:
        score = 100
    elif "master" in education_section or "m.tech" in education_section or "mba" in education_section:
        score = 85
    elif "bachelor" in education_section or "b.tech" in education_section:
        score = 70
    elif "diploma" in education_section:
        score = 50
    else:
        score = 30

    # 🎯 Field relevance bonus
    relevant_fields = [
        skill for skill in required_skills
        if skill in education_section
    ]

    if relevant_fields:
        score += 10

    return min(score, 100)


    

def normalize_text(text: str):
    text = text.lower()

    for main_skill, variations in SKILL_SYNONYMS.items():
        for variation in variations:
            text = text.replace(variation, main_skill)

    return text

import re

def extract_project_section(resume_text: str):
    resume_text = resume_text.lower()

    # Try to find project heading
    match = re.search(
        r"(projects|project experience|academic projects)(.*?)(experience|education|skills|certifications|\Z)",
        resume_text,
        re.DOTALL
    )

    if match:
        return match.group(2)

    return ""