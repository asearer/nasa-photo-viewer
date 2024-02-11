import React, { useState, useEffect } from 'react';
import './MarsRoverGallery.css';

// MarsRoverGallery component for displaying a gallery of Mars rover photos grouped by camera
function MarsRoverGallery({ onCameraSelect }) {
  // State variables for photos, camera groups, and selected camera
  const [photos, setPhotos] = useState([]);
  const [cameraGroups, setCameraGroups] = useState({});
  const [selectedCamera, setSelectedCamera] = useState('');
  
  // useEffect hook to fetch Mars rover photos from NASA API upon component mount
  useEffect(() => {
    // Function to fetch Mars rover photos and group them by camera
    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB')
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        const groupedPhotos = groupPhotosByCamera(data.photos); // Group photos by camera
        setCameraGroups(groupedPhotos); // Update camera groups state with grouped photos
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []); // Empty dependency array ensures useEffect runs only once upon mount

  // Function to group photos by camera
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

  // Function to handle camera selection
  const handleCameraChange = (cameraName) => {
    setSelectedCamera(cameraName); // Update selected camera state
    onCameraSelect(cameraGroups[cameraName] || []); // Invoke callback function with selected camera's photos
  };

  return (
    <div className="mars-rover-gallery">
      {/* Dropdown menu to select camera */}
      <select value={selectedCamera} onChange={(e) => handleCameraChange(e.target.value)}>
        <option value="">Select a camera...</option>
        {/* Render options for each camera */}
        {Object.keys(cameraGroups).map(cameraName => (
          <option key={cameraName} value={cameraName}>{cameraName}</option>
        ))}
      </select>
    </div>
  );
}

export default MarsRoverGallery;
