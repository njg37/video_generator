import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadSong } from '../utils/api';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Music</h2>
        
        <input 
          type="file" 
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-4 w-full border p-2 rounded"
        />
        
        {error && (
          <div className="text-red-500 mb-4 text-center">
            {error}
          </div>
        )}
        
        <button 
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
          className={`
            w-full py-2 rounded transition-colors 
            ${isUploading || !selectedFile 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'}
          `}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default UploadMusic;