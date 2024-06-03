import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

function Step1LocationDate({ onSearch }) {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchParams = { location, startDate, endDate };
    await onSearch(searchParams);
    navigate('/itineraries');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="input-container">
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Enter location" 
          required 
        />
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          required 
        />
      </div>
      <div className="button-container">
        <button type="submit">Next</button>
      </div>
    </form>
  );
}

export default Step1LocationDate;
