from groq import Groq
from config import GROQ_API_KEY

# ✅ Initialize client
client = Groq(api_key=GROQ_API_KEY)

# ✅ Model name
MODEL_NAME = "llama-3.1-8b-instant"


def generate_interview_questions(candidate, job_title):
    try:
        print("👉 Inside AI Service")

        prompt = f"""
You are a senior interviewer conducting a real interview.

Generate 5 to 7 interview questions for a candidate applying for:

Job Role: {job_title}

Candidate strengths:
{candidate.get("matched_skills")}

Areas to improve:
{candidate.get("missing_skills")}

Guidelines:
- Mix difficulty levels (easy, medium, hard)
- Include at least:
  • 2 conceptual questions
  • 2 practical / scenario-based questions
  • 1 problem-solving or debugging question
- Make questions feel natural and human-written (not robotic)
- Avoid generic textbook questions
- Do NOT mention “based on your skills” or sound like AI

Style:
- Ask like a real interviewer
- Keep them concise but thoughtful
- Do not add explanations, only questions

Output format:
1. Question...
2. Question...
"""

        # ✅ CORRECT GROQ CALL
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a senior interviewer."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )

        # ✅ Extract text properly
        return response.choices[0].message.content

    except Exception as e:
        print("❌ Groq ERROR:", e)
        return "Error generating questions"