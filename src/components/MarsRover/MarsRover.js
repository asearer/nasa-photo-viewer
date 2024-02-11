import React, { useState, useEffect } from 'react';
import './MarsRover.css';

const MarsRoverComponent = () => {
  const [roverImageData, setRoverImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB');
        const data = await response.json();
        setRoverImageData(data.latest_photos[0]); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Mars Rover image data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="MarsRoverContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="MarsRover">
           
          <div className="image-container" >
            <img src={roverImageData.img_src} alt="Mars Rover" /> 
            
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsRoverComponent;
