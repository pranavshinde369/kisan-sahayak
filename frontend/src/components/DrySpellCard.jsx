import { useState } from 'react';
import { getDrySpell } from '../api';

export default function DrySpellCard({ mandal, language }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetchRisk = async () => {
    setLoading(true);
    try {
      const data = await getDrySpell(mandal, language);
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const getRiskColor = (level) => {
    if (level === 'HIGH') return '#f44336';
    if (level === 'MEDIUM') return '#ff9800';
    return '#66bb6a';
  };

  return (
    <div style={{ background: '#1a2d1a', padding: 20, borderRadius: 8, border: '1px solid #2d4a2d' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🌡️</span>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Dry-Spell Alert</h3>
        </div>
        <button 
          onClick={fetchRisk}
          disabled={loading}
          style={{ background: '#ff9800', color: '#000', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >
          {loading ? 'Analysing...' : 'Check Forecast'}
        </button>
      </div>

      {result && (
        <div style={{ background: '#0f1a0f', padding: 16, borderRadius: 8, border: '1px solid #2d4a2d', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ 
              background: getRiskColor(result.risk_level) + '20', 
              color: getRiskColor(result.risk_level), 
              padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 700, border: `1px solid ${getRiskColor(result.risk_level)}`
            }}>
              {result.risk_level} RISK
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, background: '#2d4a2d', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${result.probability}%`, background: getRiskColor(result.risk_level), height: '100%' }}></div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{result.probability}%</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: '#e8f5e9' }}>{result.response_text}</p>
        </div>
      )}
    </div>
  );
}
