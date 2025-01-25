import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadMusic from "./components/UploadMusic";
import ThemeSelector from "./components/ThemeSelector";
import VideoCustomizer from "./components/VideoCustomizer";
import SetEffects from "./components/SetEffects";
import PreviewPlayer from "./components/PreviewPlayer";
import FinalOutput from "./components/FinalOutput";

const App = () => {
  return (
    <Router>
      {/* Navbar displayed on all pages */}
      <Navbar />
      <div className="app-container p-4">
        <Routes>
          {/* Routes for each page */}
          <Route path="/" element={<UploadMusic />} />
          <Route path="/theme-selector" element={<ThemeSelector />} />
          <Route path="/video-customizer" element={<VideoCustomizer />} />
          <Route path="/set-effects" element={<SetEffects />} />
          <Route path="/preview" element={<PreviewPlayer />} />
          <Route path="/final-output" element={<FinalOutput />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
