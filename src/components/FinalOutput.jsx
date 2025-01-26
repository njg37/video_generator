import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/FinalOutput.css';

const FinalOutput = ({ video }) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/uploads/${video}`;
    link.download = "generated_video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    alert("Social media sharing not implemented");
  };

  const handleStartOver = () => {
    navigate("/upload");
  };

  return (
    <div className="final-container">
      <div className="final-card">
        <h2 className="final-title">Your Generated Video</h2>
        
        <video 
          src={`http://localhost:5000/uploads/${video}`} 
          controls 
          className="final-video"
        />
        
        <div className="final-buttons">
          <button 
            onClick={handleDownload}
            className="final-button final-button--download"
          >
            Download
          </button>
          
          <button 
            onClick={handleShare}
            className="final-button final-button--share"
          >
            Share
          </button>
          
          <button 
            onClick={handleStartOver}
            className="final-button final-button--startover"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalOutput;
