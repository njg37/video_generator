import React, { useState } from 'react';
import axios from 'axios';

const SpotifySongSearch = ({ onSongSelect }) => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add this line

  const searchTracks = async () => {
    if (!query) return;
  
    setLoading(true);
    setError(null);
  
    try {
      // Use relative path instead of full URL
      const tokenResponse = await axios.get('/api/spotify/token');
      const { access_token } = tokenResponse.data;
  
      const response = await axios.get('/api/spotify/search', {
        params: { query },
        headers: { Authorization: `Bearer ${access_token}` }
      });
  
      setTracks(response.data);
    } catch (error) {
      console.error('Track search error:', error.response?.data || error.message);
      setError('Failed to search tracks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search songs"
      />
      <button onClick={searchTracks} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <div className="text-red-500">{error}</div>}

      {tracks.map(track => (
        <div key={track.id} onClick={() => onSongSelect(track)}>
          {track.name} - {track.artist}
        </div>
      ))}
    </div>
  );
};

export default SpotifySongSearch;