import React, { useState } from 'react';
import UploadMusic from './components/UploadMusic';
import ThemeSelector from './components/ThemeSelector';
import VideoCustomizer from './components/VideoCustomizer';
import './App.css';
import './index.css';

function App() {
  const [uploadedSong, setUploadedSong] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // const handleSongUpload = (song) => {
  //   setUploadedSong(song);
  // };
  const handleSongUpload = (song) => {
    // Ensure we're passing the full file object or filename
    setUploadedSong(song.name || song); 
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="App">
      <h1>VideoVerse - Song Background Generator</h1>
      <UploadMusic onSongUpload={handleSongUpload} />
      {uploadedSong && (
        <ThemeSelector onThemeSelect={handleThemeSelect} />
      )}
      {uploadedSong && selectedTheme && (
        <VideoCustomizer 
          song={uploadedSong} 
          theme={selectedTheme} 
        />
      )}
    </div>
  );
}

export default App;