import React from 'react';
import { useNavigate } from 'react-router-dom';

function Step2Itineraries({ itineraries, setSelectedItinerary }) {
  const navigate = useNavigate();

  const handleSelectItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    navigate('/map');
  };

  return (
    <div>
      <h2>Select an Itinerary</h2>
      <ul>
        {itineraries.map(itinerary => (
          <li key={itinerary.id} onClick={() => handleSelectItinerary(itinerary)}>
            <h3>{itinerary.name}</h3>
            <p>{itinerary.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Step2Itineraries;
