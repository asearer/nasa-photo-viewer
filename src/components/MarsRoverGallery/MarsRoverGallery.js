import React, { useState, useEffect } from 'react';
import './MarsRoverGallery.css';

function MarsRoverGallery({ onCameraSelect }) {
  const [photos, setPhotos] = useState([]);
  const [cameraGroups, setCameraGroups] = useState({});
  const [selectedCamera, setSelectedCamera] = useState('');
  
  useEffect(() => {
    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB')
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        const groupedPhotos = groupPhotosByCamera(data.photos);
        setCameraGroups(groupedPhotos);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const groupPhotosByCamera = (photos) => {
    const grouped = {};
    photos.forEach(photo => {
      const cameraName = photo.camera.full_name;
      if (!grouped[cameraName]) {
        grouped[cameraName] = [];
      }
      grouped[cameraName].push(photo.img_src);
    });
    return grouped;
  };

  const handleCameraChange = (cameraName) => {
    setSelectedCamera(cameraName);
    onCameraSelect(cameraGroups[cameraName] || []);
  };

  return (
    <div className="mars-rover-gallery">
      <select value={selectedCamera} onChange={(e) => handleCameraChange(e.target.value)}>
        <option value="">Select a camera...</option>
        {Object.keys(cameraGroups).map(cameraName => (
          <option key={cameraName} value={cameraName}>{cameraName}</option>
        ))}
      </select>
    </div>
  );
}

export default MarsRoverGallery;
