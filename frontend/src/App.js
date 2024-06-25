import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import MyTrips from './MyTrips';
import MyAccount from './MyAccount';
import './App.css';
import beachImage from './beach.png';
import Step1LocationDate from './Step1LocationDate';
import Step2Itineraries from './Step2Itineraries';
import Step3Map from './Step3Map';
import Step4Confirmation from './Step4Confirmation';

function App() {
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = async (params) => {
    setSearchParams(params);
    const mockItineraries = [
      { id: 1, name: 'Miami', description: 'Explore museums, Cuban food, and parks' },
      { id: 2, name: 'Tampa', description: 'Walk around the historic district' },
      { id: 3, name: 'Fort Lauderdale', description: 'Relax on the beach for 3 days' }
    ];
    await new Promise(resolve => setTimeout(resolve, 1000));
    setItineraries(mockItineraries);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="landing">
              <div className="landing-image-container">
                <img src={beachImage} alt="Beach" className="landing-image" />
                <div className="landing-image-overlay"></div>
              </div>
              <div className="landing-text">
                <h1>ready to plan your perfect trip...</h1>
              </div>
              <div className="form-container">
                <Step1LocationDate onSearch={handleSearch} />
              </div>
            </div>
          } />
          <Route path="/itineraries" element={<Step2Itineraries itineraries={itineraries} setSelectedItinerary={setSelectedItinerary} />} />
          <Route path="/map" element={<Step3Map selectedItinerary={selectedItinerary} />} />
          <Route path="/confirmation" element={<Step4Confirmation itinerary={selectedItinerary} searchParams={searchParams} />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
      </div>
    </Router>
  );

  
}

export default App;

