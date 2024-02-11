import React, { useState, useEffect } from 'react';
import './NasaApodComponent.css';

// NasaApodComponent for displaying NASA's Astronomy Picture of the Day (APOD)
const NasaApodComponent = () => {
  // State variables for APOD data, loading state, and description display
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  // useEffect hook to fetch APOD data from NASA API upon component mount
  useEffect(() => {
    // Function to fetch APOD data
    const fetchData = async () => {
      try {
        // Fetch APOD data from NASA API
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB');
        const data = await response.json();
        setApodData(data); // Update APOD data state with fetched data
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching APOD data:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData(); // Invoke fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once upon mount

  // Function to toggle description display
  const handleImageClick = () => {
    setShowDescription(!showDescription); // Toggle showDescription state
  };

  return (
    <div className="NasaApodContainer">
      {/* Render loading message while data is being fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        {/* Render APOD image and description */}
        <div className="NasaApod">
          {/* Render APOD title */}
          <h2>{apodData.title}</h2>
          {/* Render APOD image with optional description overlay */}
          <div className="image-container" onClick={handleImageClick}>
            <img src={apodData.url} alt={apodData.title} />
            {/* Render description overlay if showDescription is true */}
            {showDescription && (
              <div className="description-overlay">
                <p className="description">{apodData.explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NasaApodComponent;
