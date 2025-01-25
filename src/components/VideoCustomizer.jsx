import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateVideo } from "../utils/api";

const VideoCustomizer = () => {
  const location = useLocation();
  const { selectedTheme, audioFile } = location.state || {};

  const [selectedAudio, setSelectedAudio] = useState(audioFile || "");
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioFileUpload, setAudioFileUpload] = useState(null);

  useEffect(() => {
    if (!selectedTheme) {
      alert("No theme selected! Redirecting back to Theme Selector.");
      window.history.back(); // Redirect if no theme was passed
    }
    setSelectedAudio(audioFile || "");
  }, [selectedTheme, audioFile]);

  const handleGenerateVideo = async () => {
    if (!selectedAudio || !selectedTheme) {
      alert("Please select both an audio file and a theme.");
      return;
    }

    try {
      setIsGenerating(true);

      let audioData;
      if (audioFileUpload) {
        audioData = new FormData();
        audioData.append("file", audioFileUpload);
      } else {
        audioData = { filename: selectedAudio };
      }

      const response = await generateVideo(audioData, selectedTheme);
      if (response.video) {
        setGeneratedVideo(response.video);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error generating video:", error);
      alert("Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Customize Your Video</h2>

      {/* Selected Theme Display */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Selected Theme:</label>
        <span className="text-gray-700">{selectedTheme || "No theme selected"}</span>
      </div>

      {/* Audio File Upload */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Audio File:</label>
        {selectedAudio ? (
          <p className="text-gray-800">{selectedAudio}</p>
        ) : (
          <>
            <input
              type="file"
              accept=".mp3,.wav"
              onChange={(e) => setAudioFileUpload(e.target.files[0])}
              className="block w-full p-2 border rounded-md"
            />
            {audioFileUpload && (
              <div className="mt-2">
                <p className="text-gray-600">{audioFileUpload.name}</p>
                <button
                  onClick={() => setSelectedAudio(audioFileUpload.name)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Use Selected File
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Generate Video Button */}
      <button
        onClick={handleGenerateVideo}
        className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${
          isGenerating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating Video..." : "Generate Video"}
      </button>

      {/* Generated Video Section */}
      {generatedVideo && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Your Video:</h3>
          <video
            className="w-full rounded-md mb-4"
            controls
            src={`http://localhost:5000/uploads/${generatedVideo}`}
          />
          <a
            href={`http://localhost:5000/uploads/${generatedVideo}`}
            download
            className="block w-full text-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoCustomizer;
