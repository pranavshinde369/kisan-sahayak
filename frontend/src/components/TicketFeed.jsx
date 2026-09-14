import { useState } from 'react';
import { updateTicket } from '../api';

export default function TicketFeed({ tickets, onUpdate }) {
  const [assigning, setAssigning] = useState(null);
  const [assignName, setAssignName] = useState('');

  const handleAssign = async (id) => {
    if (!assignName) return;
    await updateTicket(id, { status: 'assigned', assigned_to: assignName });
    setAssigning(null);
    setAssignName('');
    onUpdate();
  };

  const handleResolve = async (id) => {
    await updateTicket(id, { status: 'resolved' });
    onUpdate();
  };

  const getStatusColor = (status) => {
    if (status === 'open') return '#f44336';
    if (status === 'assigned') return '#ff9800';
    if (status === 'resolved') return '#66bb6a';
    return '#7a9e7a';
  };

  return (
    <div style={{ flex: 1, background: '#1a2d1a', borderRadius: 8, border: '1px solid #2d4a2d', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #2d4a2d', background: '#152015', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>📋</span>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Live Ticket Feed</h3>
      </div>

      <div style={{ padding: 20, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tickets.map(t => (
          <div key={t.id} style={{ background: '#0f1a0f', borderRadius: 8, border: '1px solid #2d4a2d', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #2d4a2d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#152015' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 600, color: '#e8f5e9' }}>Ticket #{t.id}</span>
                <span style={{ fontSize: 12, color: '#7a9e7a' }}>{new Date(t.created_at).toLocaleString()}</span>
              </div>
              <div style={{ 
                background: getStatusColor(t.status) + '20', 
                color: getStatusColor(t.status), 
                padding: '4px 12px', borderRadius: 12, fontSize: 11, fontWeight: 700, border: `1px solid ${getStatusColor(t.status)}`, textTransform: 'uppercase'
              }}>
                {t.status}
              </div>
            </div>
            
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ width: 80, height: 80, background: '#1a2d1a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1px solid #2d4a2d' }}>
                  {t.photo_filename ? '📸' : '❓'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#f44336', marginBottom: 4 }}>{t.ai_diagnosis}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ background: '#2d4a2d', color: '#e8f5e9', padding: '2px 8px', borderRadius: 12, fontSize: 11, textTransform: 'uppercase' }}>
                      {t.severity} SEVERITY
                    </span>
                    <span style={{ fontSize: 13, color: '#7a9e7a' }}>{t.confidence}% AI Confidence</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#e8f5e9' }}>
                    <span style={{ color: '#7a9e7a' }}>Mandal: </span> {t.mandal_name}
                  </div>
                </div>
              </div>
              
              {t.status !== 'resolved' && (
                <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #2d4a2d', paddingTop: 16 }}>
                  {t.status === 'open' && (
                    <>
                      {assigning === t.id ? (
                        <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                          <input 
                            autoFocus
                            value={assignName} onChange={e => setAssignName(e.target.value)}
                            placeholder="Agronomist Name..."
                            style={{ flex: 1, padding: '6px 12px', background: '#1a2d1a', border: '1px solid #2d4a2d', color: '#e8f5e9', borderRadius: 4, outline: 'none' }}
                          />
                          <button onClick={() => handleAssign(t.id)} style={{ background: '#ff9800', color: '#000', border: 'none', padding: '6px 16px', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}>Save</button>
                          <button onClick={() => setAssigning(null)} style={{ background: 'transparent', color: '#7a9e7a', border: '1px solid #2d4a2d', padding: '6px 16px', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setAssigning(t.id)} style={{ background: '#ff9800', color: '#000', border: 'none', padding: '8px 16px', borderRadius: 4, fontWeight: 600, cursor: 'pointer', flex: 1 }}>Assign to Agronomist</button>
                      )}
                    </>
                  )}
                  {t.status === 'assigned' && (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#ff9800', fontSize: 13 }}>Assigned to: {t.assigned_to}</span>
                      <button onClick={() => handleResolve(t.id)} style={{ background: '#66bb6a', color: '#000', border: 'none', padding: '8px 16px', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}>Mark Resolved</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {tickets.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#7a9e7a' }}>
            No tickets found.
          </div>
        )}
      </div>
    </div>
  );
}
