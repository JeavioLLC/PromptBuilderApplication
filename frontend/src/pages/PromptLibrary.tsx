import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PROMPTS = [
  {
    id: 1,
    title: 'Summarize Meeting Notes',
    description: 'Please summarize the key decisions and action items from the following m...',
    author: 'Hiren Jivani (Admin)',
    likes: 25,
    views: 150,
    isPrivate: false,
    needsValidation: false,
    tag: null,
  },
  {
    id: 2,
    title: 'Generate Python Boilerplate',
    description: 'Create a Python script for a basic Flask API with a single GET endpoint at "/..."',
    author: 'Bob Smith',
    likes: 42,
    views: 210,
    isPrivate: false,
    needsValidation: false,
    tag: null,
  },
  {
    id: 3,
    title: 'My Private QA Checklist',
    description: 'List the top 5 regression testing scenarios for the login page.',
    author: 'Hiren Jivani (Admin)',
    likes: 0,
    views: 5,
    isPrivate: true,
    needsValidation: false,
    tag: 'Private',
  },
  {
    id: 4,
    title: 'Legacy Feature Documentation',
    description: 'Explain the purpose of the legacy billing module.',
    author: 'Charlie Brown',
    likes: 10,
    views: 88,
    isPrivate: false,
    needsValidation: true,
    tag: 'Needs Validation',
  },
];

const PromptLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const navigate = useNavigate();

  const filteredPrompts = PROMPTS.filter(p =>
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())) &&
    (!tag || (p.tag && p.tag === tag))
  );

  return (
    <div style={{ padding: '32px 0', background: '#f7f8fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#222' }}>Prompt Library</h1>
          <button
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontWeight: 600,
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
            onClick={() => navigate('/prompts/create')}
          >
            <span style={{ fontSize: 20, display: 'flex', alignItems: 'center' }}>＋</span> Add New Prompt
          </button>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Search by title or content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '14px 16px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: 16,
              background: '#fff',
              outline: 'none'
            }}
          />
          <select
            value={tag}
            onChange={e => setTag(e.target.value)}
            style={{
              padding: '14px 16px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: 16,
              background: '#fff',
              minWidth: 160
            }}
          >
            <option value="">Filter by Tag</option>
            <option value="Private">Private</option>
            <option value="Needs Validation">Needs Validation</option>
          </select>
        </div>
        <div>
          {filteredPrompts.map(prompt => (
            <div key={prompt.id} style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              padding: 24,
              marginBottom: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: prompt.needsValidation ? '#eab308' : '#2563eb', marginBottom: 4 }}>
                  {prompt.title}
                </div>
                <div style={{ color: '#374151', fontSize: 16, marginBottom: 8 }}>{prompt.description}</div>
                <div style={{ fontSize: 15, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 12 }}>
                  By <span style={{ fontWeight: 600, color: '#222' }}>{prompt.author}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span role="img" aria-label="likes">👍</span> {prompt.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span role="img" aria-label="views">👁️</span> {prompt.views}
                  </span>
                  {prompt.isPrivate && (
                    <span style={{ background: '#e5e7eb', color: '#374151', borderRadius: 6, padding: '2px 10px', fontSize: 13, fontWeight: 500 }}>Private</span>
                  )}
                  {prompt.needsValidation && (
                    <span style={{ background: '#fef08a', color: '#a16207', borderRadius: 6, padding: '2px 10px', fontSize: 13, fontWeight: 500 }}>Needs Validation</span>
                  )}
                </div>
              </div>
              <button style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                minWidth: 160
              }}>
                Use This Prompt
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptLibrary;
