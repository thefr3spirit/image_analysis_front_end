import React, { useState } from "react";

function ImageClassifier() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [model, setModel] = useState("vit");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImages(files);
    
    // Create preview URLs for the selected images
    const imageUrls = files.map(file => ({
      file: file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImagePreviews(imageUrls);
  };

  const handleSubmit = async () => {
    if (images.length === 0) return;

    const formData = new FormData();
    formData.append("model", model);
    images.forEach((img) => formData.append("image", img));

    setLoading(true);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Error uploading:", err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #ffffff 50%, #f0f8f0 100%)',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      color: '#2d5a2d',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      maxWidth: '800px',
      margin: '0 auto 2rem auto'
    },
    inputGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#2d5a2d',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    fileInput: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '2px solid #90c695',
      background: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '2px solid #90c695',
      background: 'white',
      fontSize: '1rem',
      color: '#2d5a2d',
      transition: 'all 0.3s ease'
    },
    primaryButton: {
      background: 'linear-gradient(45deg, #87ceeb, #add8e6)',
      color: '#2d5a2d',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(135, 206, 235, 0.3)',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    secondaryButton: {
      background: 'linear-gradient(45deg, #4a90e2, #5ba3f5)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)'
    },
    resultsContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    resultsHeader: {
      color: '#2d5a2d',
      fontSize: '1.8rem',
      marginBottom: '1.5rem',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '1rem'
    },
    resultCard: {
      background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #e0e0e0'
    },
    resultImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderBottom: '3px solid #90c695'
    },
    resultBody: {
      padding: '1.5rem'
    },
    resultTitle: {
      color: '#2d5a2d',
      fontSize: '1.3rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    confidenceText: {
      color: '#4a90e2',
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    filenameText: {
      color: '#666',
      fontSize: '0.9rem',
      fontStyle: 'italic'
    },
    divider: {
      height: '2px',
      background: 'linear-gradient(90deg, #90c695, #4a90e2)',
      border: 'none',
      margin: '2rem 0',
      borderRadius: '1px'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #2d5a2d',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '10px'
    },
    previewSection: {
      background: 'rgba(240, 248, 240, 0.5)',
      borderRadius: '10px',
      padding: '1rem',
      marginTop: '1rem',
      border: '1px solid #d4e6d4'
    },
    previewHeader: {
      color: '#2d5a2d',
      fontSize: '1.1rem',
      marginBottom: '0.75rem',
      fontWeight: 'bold'
    },
    previewGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '0.75rem',
      marginTop: '0.5rem'
    },
    previewCard: {
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      border: '1px solid #90c695'
    },
    previewImage: {
      width: '100%',
      height: '100px',
      objectFit: 'cover'
    },
    previewName: {
      padding: '0.4rem',
      fontSize: '0.75rem',
      color: '#666',
      textAlign: 'center',
      background: '#f8f9fa'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🌱 Bean Disease Classifier</h1>

      <div style={styles.formContainer}>
        <div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>📁 Select Images:</label>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageChange} 
              style={styles.fileInput}
              onFocus={(e) => e.target.style.borderColor = '#ffd700'}
              onBlur={(e) => e.target.style.borderColor = '#90c695'}
            />
            
            {imagePreviews.length > 0 && (
              <div style={styles.previewSection}>
                <h3 style={styles.previewHeader}>📷 Selected Images ({imagePreviews.length})</h3>
                <div style={styles.previewGrid}>
                  {imagePreviews.map((img, idx) => (
                    <div key={idx} style={styles.previewCard}>
                      <img 
                        src={img.url} 
                        alt={img.name} 
                        style={styles.previewImage}
                      />
                      <div style={styles.previewName}>
                        {img.name.length > 15 ? `${img.name.substring(0, 15)}...` : img.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>🤖 Select Model:</label>
            <select 
              value={model} 
              onChange={(e) => setModel(e.target.value)} 
              style={styles.select}
              onFocus={(e) => e.target.style.borderColor = '#ffd700'}
              onBlur={(e) => e.target.style.borderColor = '#90c695'}
            >
              <option value="vit">Vision Transformer</option>
              <option value="resnet18">ResNet18</option>
              <option value="mobilenetv2">MobileNetV2</option>
            </select>
          </div>

          <button 
            onClick={handleSubmit}
            style={styles.primaryButton}
            disabled={loading}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(135, 206, 235, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(135, 206, 235, 0.3)';
            }}
          >
            {loading && <span style={styles.loadingSpinner}></span>}
            {loading ? "Classifying..." : "🔍 Classify Images"}
          </button>
        </div>
      </div>

      <div style={styles.divider}></div>

      {results.length > 0 && (
        <div style={styles.resultsContainer}>
          <h2 style={styles.resultsHeader}>📊 Classification Results</h2>
          <div style={styles.resultsGrid}>
            {results.map((r, idx) => (
              <div 
                key={idx} 
                style={styles.resultCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }}
              >
                <img 
                  src={r.image_url} 
                  alt={r.filename} 
                  style={styles.resultImage}
                />
                <div style={styles.resultBody}>
                  <h3 style={styles.resultTitle}>🏷️ {r.pred_class}</h3>
                  <p style={styles.confidenceText}>📈 Confidence: {r.confidence}%</p>
                  <p style={styles.filenameText}>📄 {r.filename}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ImageClassifier;