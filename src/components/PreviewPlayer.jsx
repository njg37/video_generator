import React from "react";
import { useNavigate } from "react-router-dom";

const PreviewPlayer = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Preview Your Video</h2>
      {/* Add video preview logic here */}
      <button
        onClick={() => navigate("/video-customizer")}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back
      </button>
      <button
        onClick={() => navigate("/final-output")}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default PreviewPlayer;
