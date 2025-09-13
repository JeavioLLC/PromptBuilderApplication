import React, { useState } from 'react';
import { generatePrompt } from '../api/generatePrompt';

const CreatePrompt: React.FC = () => {
  const [context, setContext] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateDraft = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await generatePrompt(context);
      setPrompt(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px 0', background: '#f7f8fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#222', marginBottom: 24 }}>Create New Prompt</h1>
        <div style={{ background: '#f1f6fd', borderRadius: 10, padding: 24, marginBottom: 32, border: '1px solid #e0e7ef' }}>
          <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 18, marginBottom: 8 }}>AI-Assisted Generation</div>
          <div style={{ color: '#2563eb', fontSize: 15, marginBottom: 18 }}>
            Select request tags and provide context to help the AI generate a high-quality draft.
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Project <span style={{ color: 'red' }}>*</span></div>
              <select style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
                <option>-- Select a value --</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Persona</div>
              <select style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
                <option>-- Select a value --</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Desired Output <span style={{ color: 'red' }}>*</span></div>
              <select style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
                <option>-- Select a value --</option>
              </select>
            </div>
            <div style={{ flex: 1 }}></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Use Case / Context</div>
            <textarea
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16, minHeight: 60 }}
              placeholder="Provide any additional context or describe the specific use case for the prompt..."
              value={context}
              onChange={e => setContext(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8 }}
            onClick={handleGenerateDraft}
            disabled={loading || !context.trim()}
          >
            {loading ? 'Generating...' : 'Generate Draft'}
          </button>
          {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 500, marginBottom: 6 }}>Prompt Title</div>
          <input style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 500, marginBottom: 6 }}>Prompt Text</div>
          <textarea
            style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16, minHeight: 120 }}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Type</div>
            <select style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
              <option>Private</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Target LLM</div>
            <select style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
              <option>Gemini 2.6 Pro</option>
            </select>
          </div>
          <div style={{ flex: 1 }}></div>
        </div>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Discovery Tags</div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Department <span style={{ color: 'red' }}>*</span></div>
            <select style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
              <option>-- Select a value --</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Usecase</div>
            <select style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
              <option>-- Select a value --</option>
            </select>
          </div>
          <div style={{ flex: 1 }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button style={{ background: '#f3f4f6', color: '#222', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Save Prompt</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePrompt;
