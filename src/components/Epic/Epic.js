import React, { useState, useEffect } from 'react';
import './Epic.css';

const Epic = () => {
  const [epicImageData, setEpicImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/EPIC/api/natural/images?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB');
        const data = await response.json();
        setEpicImageData(data[0]); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NASA EPIC image data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="EpicContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="Epic">
          
          <div className="image-container" >
            <img src={`https://api.nasa.gov/EPIC/archive/natural/${epicImageData.date.slice(0, 4)}/${epicImageData.date.slice(5, 7)}/${epicImageData.date.slice(8, 10)}/png/${epicImageData.image}.png?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB`} alt="NASA EPIC" /> 
              
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Epic;
