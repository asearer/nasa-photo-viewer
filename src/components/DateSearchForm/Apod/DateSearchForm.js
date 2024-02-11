import React, { useState } from 'react';

// DateSearchForm component for selecting a date and fetching related NASA APOD data
const DateSearchForm = ({ onDateChange }) => {
  // State variables for selected date, fetched image data, and error handling
  const [selectedDate, setSelectedDate] = useState('');
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle date change and fetch data from NASA APOD API
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    try {
      // Fetch APOD data from NASA API based on selected date
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB&date=${date}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from NASA API');
      }
      const data = await response.json();
      setImageData(data); // Update image data state with fetched data
      setError(null); // Clear any previous error
      // If a callback function is provided, invoke it with the fetched data
      if (typeof onDateChange === 'function') {
        onDateChange(data);
      }
    } catch (error) {
      console.error('Error fetching data from NASA API:', error.message);
      setError('Failed to fetch image for selected date'); // Set error message
    }
  };

  return (
    <div>
      {/* Date selection input */}
      <label>Select Date: </label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      {/* Display error message if there is an error */}
      {error && <p>{error}</p>}
      {/* Display fetched image data if available */}
      {imageData && (
        <div>
          <img src={imageData.url} alt="APOD" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          <p>{imageData.title}</p>
          <p>{imageData.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default DateSearchForm;
