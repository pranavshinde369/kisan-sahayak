import { useState, useEffect } from 'react';
import { getTickets, getAllMandalRisks } from '../api';
import MandalRiskTable from './MandalRiskTable';
import TicketFeed from './TicketFeed';

export default function RSKDashboard({ refreshKey }) {
  const [tickets, setTickets] = useState([]);
  const [risks, setRisks] = useState([]);

  const loadData = () => {
    getTickets().then(setTickets);
    getAllMandalRisks().then(setRisks);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [refreshKey]);

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const resolvedToday = tickets.filter(t => t.status === 'resolved').length;
  const mandalsAtRisk = risks.filter(r => r.risk_level === 'HIGH').length;

  return (
    <div style={{ flex: 1, padding: 24, background: '#152015', overflowY: 'auto' }}>
      <h2 style={{ fontSize: 14, color: '#7a9e7a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>RSK Agronomist Dashboard</h2>
      
      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, background: '#1a2d1a', padding: 16, borderRadius: 8, border: '1px solid #2d4a2d', borderLeft: '4px solid #f44336' }}>
          <div style={{ color: '#7a9e7a', fontSize: 12, marginBottom: 4 }}>OPEN TICKETS</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#f44336' }}>{openTickets}</div>
        </div>
        <div style={{ flex: 1, background: '#1a2d1a', padding: 16, borderRadius: 8, border: '1px solid #2d4a2d', borderLeft: '4px solid #66bb6a' }}>
          <div style={{ color: '#7a9e7a', fontSize: 12, marginBottom: 4 }}>RESOLVED TODAY</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#66bb6a' }}>{resolvedToday}</div>
        </div>
        <div style={{ flex: 1, background: '#1a2d1a', padding: 16, borderRadius: 8, border: '1px solid #2d4a2d', borderLeft: '4px solid #ff9800' }}>
          <div style={{ color: '#7a9e7a', fontSize: 12, marginBottom: 4 }}>MANDALS AT RISK</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#ff9800' }}>{mandalsAtRisk}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <MandalRiskTable risks={risks} />
        <TicketFeed tickets={tickets} onUpdate={loadData} />
      </div>
    </div>
  );
}
