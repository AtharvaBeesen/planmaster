// ItineraryPage.js
import React from 'react';
import ItineraryList from './ItineraryList';

function ItineraryPage({ itineraries }) {
  return (
    <div>
      <h2>Search Results</h2>
      <ItineraryList itineraries={itineraries} />
    </div>
  );
}

export default ItineraryPage;
