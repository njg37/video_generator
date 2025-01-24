import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Upload music file
export const uploadMusicFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading music file:", error.response?.data || error.message);
    throw error;
  }
};

// Generate video
export const generateVideo = async (audioFile, theme) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audioFile, theme }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error generating video: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating video:", error.message);
    throw error;
  }
};

// Fetch Spotify token
export const getSpotifyToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/spotify/login`);
    
    console.log("Spotify Token Response:", response.data);
    
    // Validate token response structure
    if (!response.data || !response.data.access_token) {
      throw new Error("Invalid Spotify token response");
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching Spotify token:", error.response?.data || error.message);
    throw error;
  }
};

// Search for songs on Spotify
export const searchSpotifySongs = async (query, accessToken) => {
  try {
    if (!query || query.trim() === "") {
      throw new Error("Search query is required.");
    }
    if (!accessToken) {
      throw new Error("Access token is missing or invalid.");
    }

    console.log("Search query:", query);
    console.log("Access Token:", accessToken);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Spotify response:", response.data);
    return response.data.tracks.items;
  } catch (error) {
    if (error.response) {
      console.error("Error searching Spotify songs (API error):", error.response.data);
    } else {
      console.error("Error searching Spotify songs:", error.message);
    }
    throw error;
  }
};

// Suggest songs based on a seed track (Spotify recommendation API)
export const getSuggestedSongs = async (seedTrackId, accessToken) => {
  try {
    if (!seedTrackId) {
      throw new Error("Seed track ID is required.");
    }
    if (!accessToken) {
      throw new Error("Access token is missing or invalid.");
    }

    console.log("Seed Track ID:", seedTrackId);
    console.log("Access Token:", accessToken);

    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTrackId}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Spotify recommended songs response:", response.data);
    return response.data.tracks;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching suggested songs (API error):", error.response.data);
    } else {
      console.error("Error fetching suggested songs:", error.message);
    }
    throw error;
  }
};