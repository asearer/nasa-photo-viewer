import React, { useState } from 'react';

const DateSearchForm = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    try {
      const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=zOpGoqJdp9tjkydekW65khLKjcx866FQyrV9BJKB`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from NASA EPIC API');
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No images available for the selected date');
      }
      
      setImageData(data[0]);
      setError(null);
      if (typeof onDateChange === 'function') {
        onDateChange(data);
      }
    } catch (error) {
      console.error('Error fetching data from NASA EPIC API:', error.message);
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
          <img src={`https://api.nasa.gov/EPIC/archive/natural/${imageData.date.slice(0, 4)}/${imageData.date.slice(5, 7)}/${imageData.date.slice(8, 10)}/png/${imageData.image}.png?api_key=DEMO_KEY`} alt="NASA EPIC" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          
        </div>
      )}
    </div>
  );
};

export default DateSearchForm;
