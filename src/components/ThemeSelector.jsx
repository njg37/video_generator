import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThemes } from '../utils/api';

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
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Select Video Theme</h2>
      <div className="theme-selector grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {themes.map(theme => (
          <div
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`
              theme-option cursor-pointer p-4 border rounded 
              hover:bg-gray-100 transition-all duration-300
              ${selectedTheme?.id === theme.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300'}
            `}
          >
            <h3 className="text-center text-xl font-semibold mb-4">{theme.name}</h3>
            {theme.videoUrl && (
              <video 
                src={theme.videoUrl} 
                className="w-full h-32 object-cover rounded" 
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