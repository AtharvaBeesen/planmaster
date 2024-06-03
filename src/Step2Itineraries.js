import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Step2Itineraries.css';

function Step2Itineraries({ itineraries, setSelectedItinerary }) {
  const navigate = useNavigate();

  const handleSelectItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    navigate('/map');
  };

  return (
    <div className="itineraries-container">
      <h2>Select an Itinerary</h2>
      <ul className="itinerary-list">
        {itineraries.map(itinerary => (
          <li key={itinerary.id} className="itinerary-item" onClick={() => handleSelectItinerary(itinerary)}>
            <h3 className="itinerary-name">{itinerary.name}</h3>
            <p className="itinerary-description">{itinerary.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Step2Itineraries;
