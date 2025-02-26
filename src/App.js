import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UploadMusic from './components/UploadMusic';
import ThemeSelector from './components/ThemeSelector';
import VideoCustomizer from './components/VideoCustomizer';
import PreviewPlayer from './components/PreviewPlayer';
import FinalOutput from './components/FinalOutput';
import './App.css';
import './index.css';

function App() {
  const [uploadedSong, setUploadedSong] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [generatedVideo, setGeneratedVideo] = useState(null);

  const handleSongUpload = (song) => {
    setUploadedSong(song);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleVideoGenerate = (video) => {
    setGeneratedVideo(video);
  };

  return (
    <Router>
      <div className="App">
        <h1 className="text-3xl font-bold text-center my-4">Song Background Generator</h1>
        
        <Routes>
          <Route 
            path="/upload" 
            element={<UploadMusic onSongUpload={handleSongUpload} />} 
          />
          
          <Route 
            path="/theme" 
            element={uploadedSong ? (
              <ThemeSelector onThemeSelect={handleThemeSelect} />
            ) : (
              <Navigate to="/upload" />
            )} 
          />
          
          <Route 
            path="/customize" 
            element={(uploadedSong && selectedTheme) ? (
              <VideoCustomizer 
                song={uploadedSong}
                theme={selectedTheme}
                onVideoGenerate={handleVideoGenerate}
              />
            ) : (
              <Navigate to="/upload" />
            )} 
          />
          
          <Route 
            path="/preview" 
            element={generatedVideo ? (
              <PreviewPlayer video={generatedVideo} />
            ) : (
              <Navigate to="/upload" />
            )} 
          />
          
          <Route 
            path="/final" 
            element={generatedVideo ? (
              <FinalOutput video={generatedVideo} />
            ) : (
              <Navigate to="/upload" />
            )} 
          />
          
          <Route path="*" element={<Navigate to="/upload" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;