// src/App.js
import React, { useState } from 'react';

function App() {
  // State hooks:
  // file: holds the selected File object
  // preview: URL to show the image preview
  // result: prediction result from API
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  // Called when user picks a file
  const handleChange = (e) => {
    const imgFile = e.target.files[0];            // grab first file
    if (!imgFile) return;                         // guard clause
    setFile(imgFile);                             // save file in state
    setPreview(URL.createObjectURL(imgFile));     // create preview URL
    setResult(null);                              // reset previous result
  };

  // Called when user clicks “Predict”
  const handlePredict = async () => {
    if (!file) return;

    // Prepare form data to mimic a browser form submit
    const formData = new FormData();
    formData.append('image', file);

    // TODO: Replace with real API URL
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    const res = await fetch(`${API_URL}/predict/`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      // handle error (e.g. show a message)
      console.error('Prediction failed');
      return;
    }

    const data = await res.json();
    // Expecting { label_name: "...", confidence: 0.97 }
    setResult({
      label: data.label_name,
      confidence: data.confidence,
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <h1>Image Classifier</h1>

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {/* Image preview */}
      {preview && (
        <div style={{ margin: '1rem 0' }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: 200 }}
          />
        </div>
      )}

      {/* Predict button */}
      <button
        onClick={handlePredict}
        disabled={!file}
      >
        Predict
      </button>

      {/* Prediction result */}
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Label:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
