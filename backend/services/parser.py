import re
from PyPDF2 import PdfReader

def extract_text_from_pdf(file):
    reader = PdfReader(file)
    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    return text.strip()


# Drop these into your existing services/parser.py file

def extract_email(text: str) -> str:
    # Regex to find standard email formats
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    match = re.search(email_pattern, text)
    return match.group(0) if match else "No Email Found"

def extract_name(text: str) -> str:
    # Names are notoriously hard to parse perfectly without advanced NLP.
    # This is a simple fallback: grabs the first line or filename if needed.
    # If your ATS logic already has a better name extractor, use that!
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if lines:
        return lines[0][:50] # Assuming name is often at the top
    return "Unknown Candidate"
