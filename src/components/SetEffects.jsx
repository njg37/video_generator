import React from "react";
import { useNavigate } from "react-router-dom";

const SetEffects = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/preview");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Set Effects</h2>
      <p>Choose beat sync, color patterns, and animations here.</p>
      <button
        onClick={handleNext}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default SetEffects;
