import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def send_email(to_email, candidate_name, job_title, questions=None):
    try:
        subject = f"Interview Opportunity - {job_title}"

        body = f"""
Hi {candidate_name},

Congratulations!

You have been shortlisted for the role of {job_title}.

"""


        body += "\n\nBest Regards,\nHiring Team"

        # Create email
        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = to_email
        msg["Subject"] = subject

        msg.attach(MIMEText(body, "plain"))

        # Send email
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, to_email, msg.as_string())
        server.quit()

        print("✅ Email Sent")
        return True

    except Exception as e:
        print("❌ EMAIL ERROR:", e)
        return False