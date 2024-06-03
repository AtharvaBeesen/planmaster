import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step2Itineraries.css';
import fetchImage from './unsplashAPI';
import ProgressBar from './ProgressBar';

function Step2Itineraries({ itineraries, setSelectedItinerary }) {
  const navigate = useNavigate();
  const [itineraryImages, setItineraryImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const itinerary of itineraries) {
        const imageUrl = await fetchImage(itinerary.name);
        images[itinerary.id] = imageUrl;
      }
      setItineraryImages(images);
    };
    loadImages();
  }, [itineraries]);

  const handleSelectItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    navigate('/map');
  };

  return (
    <div className="itineraries-container">
      <div className="initial-text">
        <h2>choose your favorite itinerary below...</h2>
      </div>
      <div className="sub-text">
        <h3>don't worry you can always edit the activities later!</h3>
      </div>
      <ul className="itinerary-list">
        {itineraries.map(itinerary => (
          <li key={itinerary.id} className="itinerary-item" onClick={() => handleSelectItinerary(itinerary)}>
            <img src={itineraryImages[itinerary.id]} alt={itinerary.name} className="itinerary-image" />
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
