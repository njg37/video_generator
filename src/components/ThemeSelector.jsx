import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const ThemeSelector = () => {
  const location = useLocation();
  const [selectedTheme, setSelectedTheme] = useState("Default");
  const navigate = useNavigate();
  const { audioFile } = location.state || {};

  const themes = ["Default", "Neon", "Retro", "Minimalistic"];

  const handleNext = () => {
    if (!selectedTheme) {
      alert("Please select a theme before proceeding.");
      return;
    }
    // Navigate to the VideoCustomizer page with both selectedTheme and audioFile
    navigate("/video-customizer", { state: { selectedTheme, audioFile } });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Select a Theme</h2>
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
      <button
        onClick={handleNext}
        className="w-full mt-6 p-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default ThemeSelector;
