import React, { useState } from 'react';



const DateSearchForm = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB&date=${date}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from NASA API');
      }
      const data = await response.json();
      setImageData(data);
      setError(null);
      if (typeof onDateChange === 'function') {
        onDateChange(data);
      }
    } catch (error) {
      console.error('Error fetching data from NASA API:', error.message);
      setError('Failed to fetch image for selected date');
    }
  };

  return (
    <div>
      <label>Select Date: </label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      {error && <p>{error}</p>}
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
