import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Preview Your Video</h2>
        
        <div className="mb-6">
          <video
            ref={videoRef}
            className="w-full rounded shadow-lg"
            controls
            preload="auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleRegenerate}
            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Regenerate
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPlayer;