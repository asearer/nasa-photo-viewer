import React, { useState, useEffect } from 'react';
import './Epic.css';

// Epic component for displaying NASA EPIC images
const Epic = () => {
  // State variables for EPIC image data, loading state, and description display
  const [epicImageData, setEpicImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  // useEffect hook to fetch EPIC image data from NASA API upon component mount
  useEffect(() => {
    // Function to fetch EPIC image data
    const fetchData = async () => {
      try {
        // Fetch EPIC image data from NASA API
        const response = await fetch('https://api.nasa.gov/EPIC/api/natural/images?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB');
        const data = await response.json();
        setEpicImageData(data[0]); // Update EPIC image data state with fetched data
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching NASA EPIC image data:', error);
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
    <div className="EpicContainer">
      {/* Render loading message while data is being fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        {/* Render EPIC image and description */}
        <div className="Epic">
          <div className="image-container" onClick={handleImageClick}>
            {/* Render EPIC image */}
            <img 
              src={`https://api.nasa.gov/EPIC/archive/natural/${epicImageData.date.slice(0, 4)}/${epicImageData.date.slice(5, 7)}/${epicImageData.date.slice(8, 10)}/png/${epicImageData.image}.png?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB`} 
              alt="NASA EPIC" 
            /> 
          </div>
          {/* Render description if showDescription is true */}
          {showDescription && (
            <div className="description">
              {/* Insert EPIC image description here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Epic;
