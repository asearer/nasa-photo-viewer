import React, { useState, useEffect } from 'react';
import './MarsRover.css';

// MarsRoverComponent for displaying the latest Mars rover image
const MarsRoverComponent = () => {
  // State variables for rover image data and loading state
  const [roverImageData, setRoverImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // useEffect hook to fetch latest Mars rover image data from NASA API upon component mount
  useEffect(() => {
    // Function to fetch Mars rover image data
    const fetchData = async () => {
      try {
        // Fetch latest Mars rover image data from NASA API
        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB');
        const data = await response.json();
        setRoverImageData(data.latest_photos[0]); // Update rover image data state with fetched data
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching Mars Rover image data:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData(); // Invoke fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once upon mount

  return (
    <div className="MarsRoverContainer">
      {/* Render loading message while data is being fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        {/* Render Mars rover image once data is fetched */}
        <div className="MarsRover">
          <div className="image-container" >
            {/* Render Mars rover image */}
            <img src={roverImageData.img_src} alt="Mars Rover" /> 
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsRoverComponent;
