// App.js

import React, { useState } from 'react';
import SearchForm from './SearchForm';
import ItineraryList from './ItineraryList';
import Header from './Header';
import './App.css';
import beachImage from './beach.png'; // Import the beach image

function App() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showItineraries, setShowItineraries] = useState(false); // New state to control visibility of itineraries

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError('');
    try {
      // Simulate an API call
      const mockItineraries = [
        { id: 1, name: 'Beach Getaway', description: 'Relax on the beach for 3 days' },
        { id: 2, name: 'Mountain Adventure', description: 'Hiking and camping in the mountains' },
        { id: 3, name: 'City Exploration', description: 'Explore museums, parks, and restaurants' }
      ];
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setItineraries(mockItineraries);
      setShowItineraries(true); // Show itineraries when search is successful
    } catch (err) {
      setError('Failed to fetch itineraries');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="landing">
        <div className="landing-image-container">
          <img src={beachImage} alt="Beach" className="landing-image" />
          <div className="landing-image-overlay"></div>
        </div>
        <div className="landing-text">
          <h1>ready to plan your perfect trip...</h1>
        </div>
        <div className="form-container">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      {showItineraries && <ItineraryList itineraries={itineraries} />} {/* Render ItineraryList when showItineraries is true */}
    </div>
  );
}

export default App;