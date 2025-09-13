import React, { useState } from 'react';

const MY_PROMPTS = [
  {
    id: 1,
    title: 'Summarize Meeting Notes',
    upvotes: 25,
    usage: 150,
    status: 'ACTIVE',
  },
  {
    id: 2,
    title: 'My Private QA Checklist',
    upvotes: 0,
    usage: 5,
    status: 'ACTIVE',
  },
];

const MyContributions: React.FC = () => {
  const [filter, setFilter] = useState('Lifetime');

  return (
    <div style={{ padding: '32px 0', background: '#f7f8fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#222', marginBottom: 24 }}>My Contributions</h1>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 22 }}>Your Prompts</div>
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
              <option value="Lifetime">Lifetime</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </div>
          {MY_PROMPTS.map(prompt => (
            <div key={prompt.id} style={{
              background: '#f9fafb',
              borderRadius: 10,
              padding: 24,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #e5e7eb'
            }}>
              <div>
                <a href="#" style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', textDecoration: 'none', marginBottom: 6, display: 'block' }}>{prompt.title}</a>
                <div style={{ color: '#6b7280', fontSize: 15, display: 'flex', alignItems: 'center', gap: 18 }}>
                  <span>👍 Upvotes:<b>{prompt.upvotes}</b></span>
                  <span>Usage Count:<b>{prompt.usage}</b></span>
                </div>
              </div>
              <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 16 }}>{prompt.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyContributions;
