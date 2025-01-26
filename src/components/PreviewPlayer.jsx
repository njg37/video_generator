import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/PreviewPlayer.css';

const PreviewPlayer = ({ video }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRegenerate = () => {
    navigate("/customize");
  };

  const handleConfirm = () => {
    navigate("/final");
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = `http://localhost:5000/uploads/${video}`;
    }
  }, [video]);

  return (
    <div className="preview-container">
      <div className="preview-card">
        <h2 className="preview-title">Preview Your Video</h2>
        
        <div>
          <video
            ref={videoRef}
            className="preview-video"
            controls
            preload="auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="preview-buttons">
          <button
            onClick={handleRegenerate}
            className="preview-button preview-button--regenerate"
          >
            Regenerate
          </button>
          <button
            onClick={handleConfirm}
            className="preview-button preview-button--confirm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPlayer;
