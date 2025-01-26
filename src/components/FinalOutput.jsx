import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinalOutput = ({ video }) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/uploads/${video}`;
    link.download = 'generated_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    alert('Social media sharing not implemented');
  };

  const handleStartOver = () => {
    navigate('/upload');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Generated Video</h2>
        
        <video 
          src={`http://localhost:5000/uploads/${video}`} 
          controls 
          className="w-full rounded mb-6"
        />
        
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={handleDownload}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Download
          </button>
          
          <button 
            onClick={handleShare}
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Share
          </button>
          
          <button 
            onClick={handleStartOver}
            className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalOutput;