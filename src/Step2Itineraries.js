import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step2Itineraries.css';
import fetchImage from './unsplashAPI'; // Assuming you have a function to fetch images from Unsplash

function Step2Itineraries({ itineraries, setSelectedItinerary }) {
  const navigate = useNavigate();

  const handleSelectItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    navigate('/map');
  };

  const [itineraryImages, setItineraryImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (let i = 0; i < itineraries.length; i++) {
        // Get the first location name before a space
        const locationName = itineraries[i].description.split(' ')[0]; // Assuming the first part is the location name
        const imageUrl = await fetchImage(locationName); // Fetch image from Unsplash based on locationName
        images[i] = imageUrl; // Use index i as the key
      }
      setItineraryImages(images);
    };
    loadImages();
  }, [itineraries]);

  return (
    <div className="itineraries-container">
      <div className="initial-text">
        <h2>choose your favorite itinerary below...</h2>
      </div>
      <div className="sub-text">
        <h3>don't worry you can always edit the activities later!</h3>
      </div>
      <ul className="itinerary-list">
        {itineraries.map((itinerary) => (
          <li key={itinerary.id} className="itinerary-item" onClick={() => handleSelectItinerary(itinerary)}>
            {/* Replace with actual image logic */}
            <img src={fetchImage(itinerary.name)} alt={itinerary.name} className="itinerary-image" />
            <div className="itinerary-content">
              <h3 className="itinerary-name">{itinerary.name}</h3>
              <p className="itinerary-description">{itinerary.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default Step2Itineraries;

