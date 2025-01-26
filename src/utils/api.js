import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const uploadSong = async (file) => {
  const formData = new FormData();
  formData.append('file', file);  // Changed from 'song' to 'file'
  
  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Song upload error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getThemes = async (themeName = 'default') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/theme/${themeName}`);
    return response.data;
  } catch (error) {
    console.error('Themes fetch error:', error);
    throw error;
  }
};

export const generateVideo = async (uploadResponse, theme, effects) => {
  try {
    const formData = new FormData();
    
    // Check if uploadResponse is a File or an object with file info
    const audioFilename = uploadResponse.file || uploadResponse.name;
    
    formData.append('audioFilename', audioFilename);
    formData.append('theme', theme.id || theme);

    const response = await axios.post(`${API_BASE_URL}/generate`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Video generation error:', 
       error.response ? error.response.data : error.message
    );
    throw error;
  }
};