import React from 'react';

function ItineraryItem({ itinerary }) {
  return (
    <li>
      <h3>{itinerary.name}</h3>
      <p>{itinerary.description}</p>
    </li>
  );
}

function ItineraryList({ itineraries }) {
  return (
    <div>
      <h2>Possible Itineraries</h2>
      <ul>
        {itineraries.map((itinerary) => (
          <ItineraryItem key={itinerary.id} itinerary={itinerary} />
        ))}
      </ul>
    </div>
  );
}

export default ItineraryList;
