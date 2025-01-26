import React, { useState } from 'react';
import { generateVideo } from '../utils/api';

const VideoCustomizer = ({ song, theme }) => {
  const [effects, setEffects] = useState({
    beatSync: false,
    colorPattern: '',
    customAnimation: ''
  });
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [error, setError] = useState(null);

  // const handleGenerateVideo = async () => {
  //   try {
  //     setError(null);
  //     // Check if song is a File or filename
  //     const result = await generateVideo(
  //       song.name || song, // Use filename or File object
  //       theme, 
  //       effects
  //     );
  //     setGeneratedVideo(result.video);
  //   } catch (error) {
  //     console.error('Video generation failed', error);
  //     setError(error.response?.data?.message || 'Video generation failed');
  //   }
  // };
  const handleGenerateVideo = async () => {
    try {
      console.log('Generating video with:', {
         song,
         songType: typeof song,
         theme
      });
      
      // Ensure song is passed correctly
      const result = await generateVideo(
        song,  // Pass entire song/upload object 
        theme, 
        effects
      );
      
      setGeneratedVideo(result.video);
    } catch (error) {
      console.error('Detailed error:', error);
      setError(error.message || 'Video generation failed');
    }
 };

  return (
    <div className="video-customizer space-y-4">
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
        <label className="block">Color Pattern:</label>
        <input 
          type="text" 
          value={effects.colorPattern}
          onChange={(e) => setEffects({...effects, colorPattern: e.target.value})}
          className="border p-2 w-full"
        />
      </div>
      
      <button 
        onClick={handleGenerateVideo}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Preview
      </button>
      
      {error && <div className="text-red-500">{error}</div>}
      {generatedVideo && (
  <video
    src={`http://localhost:5000/uploads/${generatedVideo}`}
    controls
    onError={(e) => {
      console.error('Video load details:', {
        src: `http://localhost:5000/uploads/${generatedVideo}`,
        error: e
      });
    }}
    className="w-full"
  />
)}
    </div>
  );
};

export default VideoCustomizer;