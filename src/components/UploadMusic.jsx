import React, { useState } from 'react';
import { uploadSong } from '../utils/api';

const UploadMusic = ({ onSongUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const uploadedSong = await uploadSong(selectedFile);
        onSongUpload(uploadedSong);
      } catch (error) {
        // Handle upload error
      }
    }
  };

  return (
    <div className="upload-music">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Song</button>
    </div>
  );
};

export default UploadMusic;