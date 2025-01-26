import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateVideo } from '../utils/api';

const VideoCustomizer = ({ song, theme, onVideoGenerate }) => {
  const [effects, setEffects] = useState({
    beatSync: false,
    colorPattern: '',
    customAnimation: ''
  });
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGenerateVideo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateVideo(song, theme, effects);
      const generatedVideoPath = result.video;
      
      setGeneratedVideo(generatedVideoPath);
      onVideoGenerate(generatedVideoPath);
      navigate('/preview');
    } catch (error) {
      console.error('Video generation failed', error);
      setError(error.response?.data?.message || 'Video generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Customize Your Video</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="beatSync"
              checked={effects.beatSync}
              onChange={(e) => setEffects({...effects, beatSync: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="beatSync">Beat Synchronization</label>
          </div>

          <div>
            <label className="block mb-2">Color Pattern:</label>
            <select
              value={effects.colorPattern}
              onChange={(e) => setEffects({...effects, colorPattern: e.target.value})}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Color Pattern</option>
              <option value="vibrant">Vibrant</option>
              <option value="pastel">Pastel</option>
              <option value="monochrome">Monochrome</option>
            </select>
          </div>

          <button
            onClick={handleGenerateVideo}
            disabled={isLoading}
            className={`
              w-full p-3 rounded 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'}
            `}
          >
            {isLoading ? 'Generating...' : 'Generate Preview'}
          </button>

          {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default VideoCustomizer;