import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const uploadMusicFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const generateVideo = async (audioFile, theme) => {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ audioFile, theme }),
  });

  const data = await response.json();
  return data;
};
