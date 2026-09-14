export default function MandalRiskTable({ risks }) {
  const getRiskColor = (level) => {
    if (level === 'HIGH') return '#f44336';
    if (level === 'MEDIUM') return '#ff9800';
    return '#66bb6a';
  };

  const getRiskBg = (level) => {
    if (level === 'HIGH') return '#3a1a1a';
    if (level === 'MEDIUM') return '#3a2a1a';
    return '#1a3a1a';
  };

  return (
    <div style={{ flex: 1, background: '#1a2d1a', borderRadius: 8, border: '1px solid #2d4a2d', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #2d4a2d', background: '#152015', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>🌡️</span>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Dry-Spell Risk</h3>
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead style={{ background: '#0f1a0f', position: 'sticky', top: 0, zIndex: 1 }}>
            <tr>
              <th style={{ padding: '12px 20px', textAlign: 'left', color: '#7a9e7a', fontWeight: 500 }}>Mandal</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', color: '#7a9e7a', fontWeight: 500 }}>Risk</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', color: '#7a9e7a', fontWeight: 500 }}>Probability</th>
            </tr>
          </thead>
          <tbody>
            {risks.map(r => (
              <tr key={r.mandal_id} style={{ background: getRiskBg(r.risk_level), borderBottom: '1px solid #2d4a2d' }}>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ fontWeight: 500 }}>{r.mandal_name}</div>
                  <div style={{ fontSize: 12, color: '#7a9e7a' }}>{r.district}</div>
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <span style={{ 
                    background: getRiskColor(r.risk_level) + '20', 
                    color: getRiskColor(r.risk_level), 
                    padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700, border: `1px solid ${getRiskColor(r.risk_level)}`
                  }}>
                    {r.risk_level}
                  </span>
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, background: '#0f1a0f', height: 6, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${r.probability}%`, background: getRiskColor(r.risk_level), height: '100%' }}></div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, width: 40 }}>{r.probability}%</span>
                  </div>
                </td>
              </tr>
            ))}
            {risks.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: 32, textAlign: 'center', color: '#7a9e7a' }}>Loading risks...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
