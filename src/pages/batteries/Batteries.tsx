import React, { useState } from 'react';

const Batteries = () => {
  // Sample data for the dropdowns
  const cars = {
    Honda: {
      Accord: ['Petrol', 'Diesel'],
      Civic: ['Petrol', 'Hybrid'],
    },
    Toyota: {
      Corolla: ['Petrol', 'Diesel'],
      Camry: ['Hybrid'],
    },
    Ford: {
      Mustang: ['Petrol'],
      F150: ['Diesel', 'Electric'],
    },
  };

  // React state to store selected Make, Model, and Variant
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [variant, setVariant] = useState('');

  // Function to handle the Make dropdown change
  const handleMakeChange = (e) => {
    setMake(e.target.value);
    setModel(''); // Reset model selection when Make changes
    setVariant(''); // Reset variant selection when Make changes
  };

  // Function to handle the Model dropdown change
  const handleModelChange = (e) => {
    setModel(e.target.value);
    setVariant(''); // Reset variant selection when Model changes
  };

  // Function to handle the Variant dropdown change
  const handleVariantChange = (e) => {
    setVariant(e.target.value);
  };

  // Handle "Find Now" button click
  const handleFindNowClick = () => {
    if (make && model && variant) {
      alert(`Finding Batteries for ${variant} ${model} (${make})`);
    } else {
      alert('Please select Make, Model, and Variant to find the Batteries.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
      {/* Make Dropdown */}
      <select
        value={make}
        onChange={handleMakeChange}
        style={{ padding: '5px', fontSize: '16px' }}
      >
        <option value="">Select Make</option>
        {Object.keys(cars).map((carMake) => (
          <option key={carMake} value={carMake}>
            {carMake}
          </option>
        ))}
      </select>

      {/* Model Dropdown */}
      <select
        value={model}
        onChange={handleModelChange}
        style={{ padding: '5px', fontSize: '16px' }}
        disabled={!make} // Disable model dropdown if no make is selected
      >
        <option value="">Select Model</option>
        {make &&
          Object.keys(cars[make]).map((carModel) => (
            <option key={carModel} value={carModel}>
              {carModel}
            </option>
          ))}
      </select>

      {/* Variant Dropdown */}
      <select
        value={variant}
        onChange={handleVariantChange}
        style={{ padding: '5px', fontSize: '16px' }}
        disabled={!model} // Disable variant dropdown if no model is selected
      >
        <option value="">Select Variant</option>
        {make &&
          model &&
          cars[make][model].map((carVariant) => (
            <option key={carVariant} value={carVariant}>
              {carVariant}
            </option>
          ))}
      </select>

      {/* Find Now Button */}
      <button
        onClick={handleFindNowClick}
        style={{
          padding: '8px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          gap: '8px',
        }}
      >
        Batteries 
      </button>
    </div>
  );
};

export default Batteries;
