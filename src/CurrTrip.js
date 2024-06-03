// CurrentTrip.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function CurrentTrip() {
  const location = useLocation();
  const searchParams = location.state && location.state.searchParams;

  return (
    <div>
      <h1>Current Trip</h1>
      {searchParams ? (
        <div>
          <h2>Search Parameters:</h2>
          <p>Location: {searchParams.location}</p>
          <p>Start Date: {searchParams.startDate}</p>
          <p>End Date: {searchParams.endDate}</p>
        </div>
      ) : (
        <div>
          <p>No search parameters provided</p>
          <p>Please <Link to="/">search</Link> to set parameters first.</p>
        </div>
      )}
    </div>
  );
}

export default CurrentTrip;
