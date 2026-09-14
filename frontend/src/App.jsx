import { useState } from 'react';
import FarmerSimulator from './components/FarmerSimulator';
import RSKDashboard from './components/RSKDashboard';

const LANGUAGES = [
  { code: 'te', label: 'తెలుగు', name: 'Telugu' },
  { code: 'hi', label: 'हिंदी', name: 'Hindi' },
  { code: 'kn', label: 'ಕನ್ನಡ', name: 'Kannada' },
  { code: 'mr', label: 'मराठी', name: 'Marathi' },
];

export default function App() {
  const [selectedMandal, setSelectedMandal] = useState('MH001');
  const [language, setLanguage] = useState('hi');
  const [ticketRefresh, setTicketRefresh] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f1a0f', color: '#e8f5e9', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #1a3a1a', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 22 }}>🌾</span>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#66bb6a' }}>KISAAN SIGNAL</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4a7c59' }}>Agricultural Intelligence Platform · Telangana Demo</span>
      </div>

      {/* Two panels */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <FarmerSimulator
          mandal={selectedMandal}
          onMandalChange={setSelectedMandal}
          language={language}
          onLanguageChange={setLanguage}
          languages={LANGUAGES}
          onTicketCreated={() => setTicketRefresh(r => r + 1)}
        />
        <RSKDashboard refreshKey={ticketRefresh} />
      </div>
    </div>
  );
}
