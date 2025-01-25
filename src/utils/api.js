import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Upload music file
export const uploadMusicFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Music file upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading music file:", error.response?.data || error.message);
    throw error;
  }
};

// Generate video
export const generateVideo = async (audioFile, theme) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/generate`,
      { audioFile, theme },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Video generation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating video:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Spotify token
export const getSpotifyToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spotify/login`);
    console.log("Spotify Token Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Spotify token:", error.response?.data || error.message);
    throw error;
  }
};

// Search for songs on Spotify
export const searchSpotifySongs = async (query, accessToken) => {
  try {
    if (!query.trim()) {
      throw new Error("Search query is required.");
    }
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error searching Spotify songs:", error.response?.data || error.message);
    throw error;
  }
};

// Suggest songs based on a seed track
export const getSuggestedSongs = async (seedTrackId, accessToken) => {
  try {
    if (!seedTrackId) {
      throw new Error("Seed track ID is required.");
    }
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTrackId}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching suggested songs:", error.response?.data || error.message);
    throw error;
  }
};
