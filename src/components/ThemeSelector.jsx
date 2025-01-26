import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThemes } from '../utils/api';
import '../styles/ThemeSelector.css';

const ThemeSelector = ({ onThemeSelect }) => {
  const [themes, setThemes] = useState([
    { id: 'minimalistic', name: 'Minimalistic' },
    { id: 'neon', name: 'Neon' },
    { id: 'retro', name: 'Retro' },
    { id: 'default', name: 'Default' }
  ]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const availableThemes = await Promise.all(
          themes.map(async (theme) => {
            const themeData = await getThemes(theme.id);
            return { ...theme, videoUrl: themeData.videoUrl };
          })
        );
        setThemes(availableThemes);
      } catch (error) {
        console.error('Theme loading error:', error);
      }
    };
    loadThemes();
  }, []);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
    navigate('/customize');
  };

  return (
    <div className="theme-selector-container">
      <h2 className="theme-selector-title">Select Video Theme</h2>
      <div className="theme-selector-grid">
        {themes.map(theme => (
          <div
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`theme-option ${selectedTheme?.id === theme.id ? 'selected' : ''}`}
          >
            <h3 className="theme-option-title">{theme.name}</h3>
            {theme.videoUrl && (
              <video 
                src={theme.videoUrl} 
                className="theme-option-video" 
                muted 
                loop 
                playsInline
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
