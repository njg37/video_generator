import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateVideo } from '../utils/api';
import '../styles/VideoCustomizer.css';

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
    <div className="customizer-container">
      <div className="customizer-card">
        <h2 className="customizer-title">🎨 Customize Your Video</h2>

        <div className="customizer-options">
          <div className="option-item">
            <input
              type="checkbox"
              id="beatSync"
              checked={effects.beatSync}
              onChange={(e) =>
                setEffects({ ...effects, beatSync: e.target.checked })
              }
              className="checkbox-input"
            />
            <label htmlFor="beatSync" className="checkbox-label">
              🔊 Beat Synchronization
            </label>
          </div>

          <div className="option-item">
            <label className="dropdown-label">🎨 Color Pattern:</label>
            <select
              value={effects.colorPattern}
              onChange={(e) =>
                setEffects({ ...effects, colorPattern: e.target.value })
              }
              className="dropdown-select"
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
            className={`generate-btn ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? '🎥 Generating...' : '✨ Generate Preview'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default VideoCustomizer;
