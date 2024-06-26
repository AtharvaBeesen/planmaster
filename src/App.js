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
    const formData = {
      location: params.location,
      startDate: params.startDate,
      endDate: params.endDate
    };

    try {
      const response = await fetch('http://localhost:8000/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
      //update how we are storing itineraries

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        const { location, startDate, endDate, durationDays, options } = data;
    
        // Transform options into an array of objects suitable for rendering
        const transformedItineraries = Object.keys(options).map(key => ({
            id: key,
            name: `Option ${key}`,
            description: options[key]
        }));
    
        setItineraries(transformedItineraries); // Update state with transformed itineraries
    
        console.log('Form submitted successfully!');
        setLocation('');
        setStartDate('');
        setEndDate('');
        navigate('/itineraries'); // Navigate to itineraries page
      } else {
          console.error('Error submitting form.');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
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

