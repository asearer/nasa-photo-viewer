import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './NavBar.css';
import NasaApodComponent from '../NasaApodComponent/NasaApodComponent';
import MarsRoverGallery from '../MarsRoverGallery/MarsRoverGallery';
import ApodSearch from '../DateSearchForm/Apod/DateSearchForm';
import EpicSearch from '../DateSearchForm/Epic/DateSearchForm';
import MarsSearch from '../DateSearchForm/MarsRover/DateSearchForm';

// ShootingStarNavBar component for navigation and routing
const ShootingStarNavBar = ({ isLoggedIn }) => {
  // State variables for lightbox images and submenu visibility
  const [lightboxImages, setLightboxImages] = useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Function to handle camera selection
  const handleCameraSelect = (images) => {
    setLightboxImages(images);
  };

  // Function to toggle submenu visibility
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  // Function to hide submenu
  const hideSubMenu = () => {
    setIsSubMenuOpen(false);
  };

  return (
    <Router>
      <div className="nav-container">
        {/* Navigation bar */}
        <nav className="navbar">
          <ul>
            {isLoggedIn && ( // Render these links only if user is logged in
              <>
                <li>
                  {/* Main menu item for searching image sources by date */}
                  <div onClick={toggleSubMenu}>Search Image Sources by Date</div>
                  {/* Submenu for selecting search options */}
                  {isSubMenuOpen && (
                    <ul className={`submenu typewriter`}>
                      {/* Links to search by APOD, EPIC, and Mars Rover */}
                      <li><Link to="/search/apod" onClick={hideSubMenu}>Astronomy Photo of the Day</Link></li>
                      <li><Link to="/search/epic" onClick={hideSubMenu}>Earth Polychromatic Imaging Camera</Link></li>
                      <li><Link to="/search/mars" onClick={hideSubMenu}>Mars Curiosity Rover</Link></li>
                    </ul>
                  )}
                </li>
                <li>|</li>
                {/* Link to NASA's Astronomy Picture of the Day */}
                <li><Link to="/photo-of-the-day" onClick={hideSubMenu}>Photo of the Day</Link></li>
                <li>|</li>
                {/* Link to Mars Curiosity Rover photos with associated gallery */}
                <li>
                  <Link to="/mars-rover" onClick={hideSubMenu}>Mars Curiosity Rover</Link>
                  <MarsRoverGallery onCameraSelect={handleCameraSelect} />
                </li>
              </>
            )}
          </ul>
        </nav>
        {/* Shooting star decorative element */}
        <div className="shooting-star"></div>
      </div>
      {/* Routes for different search options */}
      <Routes>
        <Route path="/search/apod" element={<ApodSearch />} />
        <Route path="/search/epic" element={<EpicSearch />} />
        <Route path="/search/mars" element={<MarsSearch />} />
        <Route path="/photo-of-the-day" element={<NasaApodComponent />} />
      </Routes>
      {/* Lightbox for displaying selected rover images */}
      {lightboxImages.length > 0 && (
        <div className="lightbox">
          <span className="close" onClick={() => setLightboxImages([])}>×</span>
          <div className="scrollable-images">
            {/* Display each image in lightbox */}
            {lightboxImages.map((imageSrc, index) => (
              <img key={index} src={imageSrc} alt={`Mars Rover ${index}`} />
            ))}
          </div>
        </div>
      )}
      {/* CSS for typewriter animation */}
      <style>
        {`
          @keyframes typing {
            from { width: 0 } /* Start from 0 width */
            to { width: 100vw } /* End at 100% viewport width */
          }

          .typewriter {
            overflow: hidden; /* Hide overflow to mimic typewriter effect */
            white-space: nowrap; /* Prevent text from wrapping */
            animation: typing 3s steps(20) forwards; /* Typewriter animation */
          }
        `}
      </style>
    </Router>
  );
};

export default ShootingStarNavBar;
