import API from "./api";

export const uploadResumes = async ({
  files,
  jd,
  weights,
  maxCount,
  jdTitle,
}) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("resumes", files[i]);
  }

  formData.append("job_description", jd || "");
  formData.append("job_title", jdTitle || "Untitled Screening");

  formData.append("cutoff_score", "50");
  formData.append("shortlist_count", String(maxCount));

  formData.append("skills_weight", String(weights.skill));
  formData.append("projects_weight", String(weights.project));
  formData.append("experience_weight", String(weights.experience));
  formData.append("education_weight", String(weights.education));

  const res = await API.post("/resume/upload", formData);

  return res.data;
};

export const generateQuestions = async (candidate, jobTitle) => {
  const res = await API.post("/resume/generate-questions", {
    candidate: candidate,
    job_title: jobTitle,
  });

  return res.data;
};

export const sendEmail = async (data) => {
  const res = await API.post("/resume/send-email", data);
  return res.data;
};
