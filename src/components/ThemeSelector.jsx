import React, { useState, useEffect } from 'react';
import { getThemes } from '../utils/api';

const ThemeSelector = ({ onThemeSelect }) => {
  const [themes, setThemes] = useState([
    { id: 'minimalistic', name: 'Minimalistic' },
    { id: 'neon', name: 'Neon' },
    { id: 'retro', name: 'Retro' },
    { id: 'default', name: 'Default' }
  ]);

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

  return (
    <div className="theme-selector grid grid-cols-4 gap-4">
      {themes.map(theme => (
        <div 
          key={theme.id} 
          onClick={() => onThemeSelect(theme)}
          className="theme-option cursor-pointer p-4 border rounded hover:bg-gray-100"
        >
          {theme.name}
          {theme.videoUrl && <video src={theme.videoUrl} className="w-full h-32 object-cover" />}
        </div>
      ))}
    </div>
  );
};

export default ThemeSelector;