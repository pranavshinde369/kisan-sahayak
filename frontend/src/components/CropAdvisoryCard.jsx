import { useState } from 'react';
import { getCropAdvisory } from '../api';

export default function CropAdvisoryCard({ mandal, language }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetchAdvisory = async () => {
    setLoading(true);
    try {
      const data = await getCropAdvisory(mandal, language);
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#1a2d1a', padding: 20, borderRadius: 8, border: '1px solid #2d4a2d' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🌱</span>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Crop Advisory</h3>
        </div>
        <button 
          onClick={fetchAdvisory}
          disabled={loading}
          style={{ background: '#66bb6a', color: '#000', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >
          {loading ? 'Analysing...' : 'Get Recommendation'}
        </button>
      </div>

      {result && (
        <div style={{ background: '#0f1a0f', padding: 16, borderRadius: 8, border: '1px solid #2d4a2d', animation: 'fadeIn 0.3s ease-out' }}>
          <p style={{ margin: '0 0 16px 0', fontSize: 15, lineHeight: 1.5 }}>{result.response_text}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {result.predictions.map((p, i) => (
              <div key={i} style={{ flex: 1, background: '#152015', padding: 12, borderRadius: 6, border: '1px solid #2d4a2d' }}>
                <div style={{ fontSize: 12, color: '#7a9e7a', marginBottom: 4, textTransform: 'capitalize' }}>{p.translations[language] || p.crop}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, background: '#2d4a2d', height: 6, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${p.probability}%`, background: i === 0 ? '#66bb6a' : '#4a7c59', height: '100%' }}></div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: i === 0 ? '#66bb6a' : '#e8f5e9' }}>{p.probability}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
