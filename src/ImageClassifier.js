import React, { useState } from "react";

function ImageClassifier() {
  const [images, setImages] = useState([]);
  const [model, setModel] = useState("vit");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="container mt-5">
      <h2>Bean Disease Classifier</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Select Model:</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="form-select">
            <option value="vit">Vision Transformer</option>
            <option value="resnet18">ResNet18</option>
            <option value="mobilenetv2">MobileNetV2</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Classifying..." : "Classify"}
        </button>
      </form>

      <hr />

      {results.length > 0 && (
        <div>
          <h4>Results</h4>
          <div className="row">
            {results.map((r, idx) => (
              <div key={idx} className="col-md-4 mb-3">
                <div className="card">
                  <img src={r.image_url} alt={r.filename} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{r.pred_class}</h5>
                    <p>Confidence: {r.confidence}%</p>
                    <p><small>{r.filename}</small></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageClassifier;
