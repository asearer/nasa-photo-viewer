import React, { useState, useEffect } from 'react';
import './NasaApodComponent.css';

const NasaApodComponent = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB');
        const data = await response.json();
        setApodData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="NasaApodContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="NasaApod">
          
          <h2>{apodData.title}</h2>
          <div className="image-container" onClick={handleImageClick}>
            <img src={apodData.url} alt={apodData.title} />
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
