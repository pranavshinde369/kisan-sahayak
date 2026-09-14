import { useState, useRef } from 'react';
import { detectDisease } from '../api';

export default function DiseaseCard({ mandal, language, onTicketCreated }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (f) => {
    setFile(f);
    setResult(null);
    const objectUrl = URL.createObjectURL(f);
    setPreview(objectUrl);
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await detectDisease(file, mandal, language);
      setResult(data);
      if (onTicketCreated) onTicketCreated();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#1a2d1a', padding: 20, borderRadius: 8, border: '1px solid #2d4a2d' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>📸</span>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Report Disease</h3>
      </div>

      <div 
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        style={{ 
          border: `2px dashed ${dragActive ? '#66bb6a' : '#2d4a2d'}`,
          borderRadius: 8, padding: preview ? 8 : 24, textAlign: 'center',
          background: dragActive ? '#152015' : '#0f1a0f',
          cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: 16
        }}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
        {preview ? (
          <img src={preview} alt="Preview" style={{ maxHeight: 200, maxWidth: '100%', objectFit: 'contain', borderRadius: 4 }} />
        ) : (
          <div style={{ color: '#7a9e7a' }}>
            <p style={{ margin: '0 0 8px 0' }}>Drag & drop crop leaf photo here</p>
            <span style={{ fontSize: 12, opacity: 0.8 }}>or click to browse</span>
          </div>
        )}
      </div>

      {file && !result && (
        <button 
          onClick={analyze} disabled={loading}
          style={{ width: '100%', background: '#f44336', color: '#fff', border: 'none', padding: '10px', borderRadius: 6, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >
          {loading ? 'Analysing Image...' : 'Analyse Crop'}
        </button>
      )}

      {result && (
        <div style={{ background: '#0f1a0f', padding: 16, borderRadius: 8, border: '1px solid #2d4a2d', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ background: '#66bb6a20', color: '#66bb6a', padding: '8px 12px', borderRadius: 4, marginBottom: 16, fontSize: 13, fontWeight: 500, border: '1px solid #66bb6a' }}>
            ✅ Ticket #{result.ticket_id} created — RSK notified
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#f44336', marginBottom: 4 }}>
                {result.top_prediction.display_name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: '#2d4a2d', color: '#e8f5e9', padding: '2px 8px', borderRadius: 12, fontSize: 11, textTransform: 'uppercase' }}>
                  {result.top_prediction.severity} SEVERITY
                </span>
                <span style={{ fontSize: 13, color: '#7a9e7a' }}>{result.top_prediction.probability}% confidence</span>
              </div>
            </div>
          </div>
          
          <div style={{ background: '#152015', padding: 12, borderRadius: 6, border: '1px solid #2d4a2d', fontSize: 14, lineHeight: 1.5 }}>
            {result.top_prediction.advisory}
          </div>
        </div>
      )}
    </div>
  );
}
