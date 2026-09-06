import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-screener-backend-hn66.onrender.com",
});

export default API;