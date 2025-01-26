// UploadMusic.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadSong } from '../utils/api';
import '../styles/UploadMusic.css'

const UploadMusic = ({ onSongUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadedSong = await uploadSong(selectedFile);
      onSongUpload(uploadedSong);
      navigate('/theme');
    } catch (error) {
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-music-container">
      <div className="upload-music-card">
        <h2 className="upload-music-title">Upload Music</h2>
        
        <input 
          type="file" 
          accept="audio/*"
          onChange={handleFileChange}
          className="upload-music-input"
        />
        
        {error && (
          <div className="upload-music-error">
            {error}
          </div>
        )}
        
        <button 
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
          className={`upload-music-button ${isUploading || !selectedFile ? 'disabled' : ''}`}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default UploadMusic;
