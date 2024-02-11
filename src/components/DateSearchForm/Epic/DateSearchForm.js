import React, { useState } from 'react';

// DateSearchForm component for selecting a date and fetching related NASA EPIC data
const DateSearchForm = ({ onDateChange }) => {
  // State variables for selected date, fetched image data, and error handling
  const [selectedDate, setSelectedDate] = useState('');
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle date change and fetch data from NASA EPIC API
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    try {
      // Fetch EPIC data from NASA API based on selected date
      const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from NASA EPIC API');
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No images available for the selected date');
      }
      
      setImageData(data[0]); // Update image data state with fetched data
      setError(null); // Clear any previous error
      // If a callback function is provided, invoke it with the fetched data
      if (typeof onDateChange === 'function') {
        onDateChange(data);
      }
    } catch (error) {
      console.error('Error fetching data from NASA EPIC API:', error.message);
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
          {/* Display image fetched from NASA EPIC API */}
          <img 
            src={`https://api.nasa.gov/EPIC/archive/natural/${imageData.date.slice(0, 4)}/${imageData.date.slice(5, 7)}/${imageData.date.slice(8, 10)}/png/${imageData.image}.png?api_key=DEMO_KEY`} 
            alt="NASA EPIC" 
            style={{ maxWidth: '100%', maxHeight: '300px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default DateSearchForm;
