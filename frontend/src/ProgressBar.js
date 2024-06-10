import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Location & Dates', 'Itineraries', 'Map', 'Confirmation'];

  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
