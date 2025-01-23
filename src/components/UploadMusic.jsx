import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadMusicFile } from "../utils/api";

const UploadMusic = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [uploadedAudioFile, setUploadedAudioFile] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("Default");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const themes = ["Default", "Neon", "Retro", "Minimalistic"];

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedAudio(file);
      console.log("Selected audio file:", file.name);
    } else {
      console.log("No file selected");
    }
  };

  // Handle audio file upload
  const handleUpload = async () => {
    if (!selectedAudio) {
      alert("Please select an audio file before uploading.");
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadMusicFile(selectedAudio); // Upload API call
      console.log("Audio uploaded successfully:", result);
      setUploadedAudioFile(result.file); // Store uploaded file name
      alert("Audio uploaded successfully!");
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Failed to upload audio file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle navigation to the next step
  const handleNext = () => {
    if (!uploadedAudioFile) {
      alert("Please upload an audio file before proceeding.");
      return;
    }
    if (!selectedTheme) {
      alert("Please select a theme before proceeding.");
      return;
    }

    // Navigate to VideoCustomizer with both audioFile and selectedTheme
    navigate("/video-customizer", { state: { selectedTheme, audioFile: uploadedAudioFile } });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Music & Select Theme</h2>

      {/* Audio Upload Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">1. Upload Your Audio File</h3>
        <input type="file" accept="audio/*" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleUpload}
          className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Audio"}
        </button>
        {uploadedAudioFile && (
          <div className="mt-2 text-green-600">
            Uploaded audio file: <strong>{uploadedAudioFile}</strong>
          </div>
        )}
        {selectedAudio && !uploadedAudioFile && (
          <div className="mt-2 text-gray-600">
            Selected audio file (not uploaded yet): {selectedAudio.name}
          </div>
        )}
      </div>

      {/* Theme Selector Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">2. Select a Theme</h3>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme}
              className={`w-full p-4 text-lg font-semibold rounded-md transition-all duration-300 ${
                selectedTheme === theme
                  ? "bg-blue-500 text-white ring-4 ring-blue-300"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
        <div className="mt-4 text-gray-700">
          Selected Theme: <strong>{selectedTheme}</strong>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full mt-6 p-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default UploadMusic;
