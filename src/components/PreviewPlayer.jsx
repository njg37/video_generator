import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PreviewPlayer = () => {
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

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Preview Your Video</h2>

      {/* Video Preview Section */}
      <div className="mb-6">
        <video
          ref={videoRef}
          className="w-full rounded shadow-lg"
          controls={false}
          preload="auto"
        >
          <source src="your-video-source.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="mt-4 flex justify-center">
          <button
            onClick={togglePlayPause}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/video-customizer")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/final-output")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PreviewPlayer;
