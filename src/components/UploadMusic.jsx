import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadMusicFile, searchSpotifySongs, getSpotifyToken } from "../utils/api";

const UploadMusic = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [uploadedAudioFile, setUploadedAudioFile] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("Default");
  const [isUploading, setIsUploading] = useState(false);
  const [spotifySearchQuery, setSpotifySearchQuery] = useState("");
  const [spotifyResults, setSpotifyResults] = useState([]);
  const [selectedSpotifyTrack, setSelectedSpotifyTrack] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const navigate = useNavigate();

  const themes = ["Default", "Neon", "Retro", "Minimalistic"];

  // Fetch Spotify token on component mount
  useEffect(() => {
    const fetchSpotifyToken = async () => {
      try {
        setIsTokenLoading(true);
        const tokenResponse = await getSpotifyToken();
        console.log("Spotify Token Fetched:", tokenResponse);
        setAccessToken(tokenResponse.access_token);
      } catch (error) {
        console.error("Error fetching Spotify token:", error);
        alert("Failed to retrieve Spotify authentication token.");
      } finally {
        setIsTokenLoading(false);
      }
    };

    fetchSpotifyToken();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setSelectedAudio(file);
      console.log("Selected audio file:", file.name);
    } else {
      alert("Please select a valid audio file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedAudio) {
      alert("Please select an audio file before uploading.");
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadMusicFile(selectedAudio);
      console.log("Audio uploaded successfully:", result);
      setUploadedAudioFile(result.file);
      alert("Audio uploaded successfully!");
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Failed to upload audio file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSpotifySearch = async () => {
    if (!spotifySearchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }

    if (!accessToken) {
      alert("Spotify authentication token is not available. Please try again later.");
      return;
    }

    console.log("Searching Spotify with query:", spotifySearchQuery);
    console.log("Access Token for Search:", accessToken);

    try {
      const results = await searchSpotifySongs(spotifySearchQuery, accessToken);
      console.log("Spotify API response:", results);
      setSpotifyResults(results);
    } catch (error) {
      console.error("Error searching Spotify:", error);
      
      // More detailed error handling
      if (error.response && error.response.status === 401) {
        alert("Spotify authentication expired. Attempting to refresh token...");
        // Implement token refresh logic here if needed
      } else {
        alert("Failed to fetch Spotify songs. Please try again.");
      }
    }
  };

  const handleNext = () => {
    if (!uploadedAudioFile && !selectedSpotifyTrack) {
      alert("Please upload an audio file or select a Spotify track before proceeding.");
      return;
    }
    if (!selectedTheme) {
      alert("Please select a theme before proceeding.");
      return;
    }

    const audioFile = selectedSpotifyTrack
      ? { spotifyTrack: selectedSpotifyTrack }
      : uploadedAudioFile;

    navigate("/video-customizer", { state: { selectedTheme, audioFile } });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Music & Select Theme</h2>

      {/* Audio Upload Section - Unchanged */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">1. Upload Your Audio File</h3>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Audio"}
        </button>
        {uploadedAudioFile && (
          <div className="mt-2 text-green-600">
            Uploaded audio file: <strong>{uploadedAudioFile}</strong>
          </div>
        )}
        {selectedAudio && !uploadedAudioFile && (
          <div className="mt-2 text-gray-600">
            Selected audio file (not uploaded yet): {selectedAudio.name}
          </div>
        )}
      </div>

      {/* Spotify Search Section - Minor Updates */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">2. Search Music on Spotify</h3>
        <input
          type="text"
          placeholder="Search Spotify for a song..."
          value={spotifySearchQuery}
          onChange={(e) => setSpotifySearchQuery(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          onClick={handleSpotifySearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isTokenLoading || !accessToken}
        >
          {isTokenLoading ? "Loading..." : "Search"}
        </button>
        {spotifyResults.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Search Results:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {spotifyResults.map((track) => (
                <li
                  key={track.id}
                  className={`cursor-pointer p-2 rounded ${
                    selectedSpotifyTrack?.id === track.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedSpotifyTrack(track)}
                >
                  {track.name} - {track.artists.map((artist) => artist.name).join(", ")}
                </li>
              ))}
            </ul>
            {selectedSpotifyTrack && (
              <div className="mt-4 text-green-600">
                Selected Spotify Track: <strong>{selectedSpotifyTrack.name}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Theme Selector Section - Unchanged */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">3. Select a Theme</h3>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme}
              className={`w-full p-4 text-lg font-semibold rounded-md transition-all duration-300 ${
                selectedTheme === theme
                  ? "bg-blue-500 text-white ring-4 ring-blue-300"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
        <div className="mt-4 text-gray-700">
          Selected Theme: <strong>{selectedTheme}</strong>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full mt-6 p-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default UploadMusic;