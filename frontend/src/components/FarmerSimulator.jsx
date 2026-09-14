import { useState, useEffect } from 'react';
import { getMandals } from '../api';
import CropAdvisoryCard from './CropAdvisoryCard';
import DrySpellCard from './DrySpellCard';
import DiseaseCard from './DiseaseCard';

export default function FarmerSimulator({ mandal, onMandalChange, language, onLanguageChange, languages, onTicketCreated }) {
  const [mandals, setMandals] = useState([]);

  useEffect(() => {
    getMandals().then(setMandals);
  }, []);

  return (
    <div style={{ flex: 1, padding: 24, borderRight: '1px solid #1a3a1a', background: '#152015', overflowY: 'auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, color: '#7a9e7a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Farmer Simulator</h2>
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <select 
            value={mandal} 
            onChange={e => onMandalChange(e.target.value)}
            style={{ padding: '8px 12px', background: '#1a2d1a', border: '1px solid #2d4a2d', color: '#e8f5e9', borderRadius: 6, outline: 'none' }}
          >
            {mandals.map(m => <option key={m.mandal_id} value={m.mandal_id}>{m.mandal_name} ({m.district})</option>)}
          </select>

          <div style={{ display: 'flex', background: '#1a2d1a', borderRadius: 6, overflow: 'hidden', border: '1px solid #2d4a2d' }}>
            {languages.map(l => (
              <button 
                key={l.code}
                onClick={() => onLanguageChange(l.code)}
                style={{ 
                  padding: '8px 16px', 
                  background: language === l.code ? '#66bb6a' : 'transparent',
                  color: language === l.code ? '#000' : '#7a9e7a',
                  border: 'none', cursor: 'pointer', fontWeight: 500
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CropAdvisoryCard mandal={mandal} language={language} />
          <DrySpellCard mandal={mandal} language={language} />
          <DiseaseCard mandal={mandal} language={language} onTicketCreated={onTicketCreated} />
        </div>
      </div>
    </div>
  );
}
