import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';

const LLM_LIST = [
  { version: 'Gemini 2.6 Pro', status: 'Active', fallback: 'None' },
  { version: 'GPT-4 Turbo', status: 'Active', fallback: 'None' },
  { version: 'Claude 3 Opus', status: 'Active', fallback: 'None' },
  { version: 'Gemini 2.5 Pro', status: 'Discontinued', fallback: 'None' },
];

const AdminPanel: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [llms, setLlms] = useState(LLM_LIST);
  const [requestTags, setRequestTags] = useState([
    { name: 'Project', status: 'Active', mandatory: true },
    { name: 'Persona', status: 'Active', mandatory: false },
    { name: 'Desired Output', status: 'Active', mandatory: true },
  ]);
  const [discoveryTags, setDiscoveryTags] = useState([
    { name: 'Department', status: 'Active', mandatory: true },
    { name: 'Usecase', status: 'Active', mandatory: false },
  ]);
  const [deleteUser, setDeleteUser] = useState<null | { name: string; email: string; role: string }>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddRequestTagModalOpen, setAddRequestTagModalOpen] = useState(false);
  const [newRequestTagName, setNewRequestTagName] = useState('');
  const navigate = useNavigate();

  const handleDelete = (user: { name: string; email: string; role: string }) => {
    setDeleteUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteUser) {
      setUsers(users.filter(u => u.email !== deleteUser.email));
    }
    setDeleteModalOpen(false);
    setDeleteUser(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDeleteUser(null);
  };

  return (
    <div style={{ padding: '32px 0', background: '#f7f8fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#222', marginBottom: 24 }}>Admin Panel</h1>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 0 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setTab(0)}
              style={{
                flex: 1,
                padding: '18px 0',
                fontWeight: 600,
                fontSize: 17,
                color: tab === 0 ? '#2563eb' : '#374151',
                border: 'none',
                background: 'none',
                borderBottom: tab === 0 ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                outline: 'none',
                transition: 'color 0.2s, border-bottom 0.2s'
              }}
            >
              LLM Management
            </button>
            <button
              onClick={() => setTab(1)}
              style={{
                flex: 1,
                padding: '18px 0',
                fontWeight: 600,
                fontSize: 17,
                color: tab === 1 ? '#2563eb' : '#374151',
                border: 'none',
                background: 'none',
                borderBottom: tab === 1 ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                outline: 'none',
                transition: 'color 0.2s, border-bottom 0.2s'
              }}
            >
              Tag Management
            </button>
          </div>
          {tab === 0 && (
            <div style={{ padding: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#f7f8fa', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: 15 }}>
                    <th style={{ padding: '18px 32px' }}>LLM VERSION</th>
                    <th style={{ padding: '18px 32px' }}>STATUS</th>
                    <th style={{ padding: '18px 32px' }}>FALLBACK LLM</th>
                    <th style={{ padding: '18px 32px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {llms.map((llm, idx) => (
                    <tr key={llm.version} style={{ borderTop: idx === 0 ? 'none' : '1px solid #e5e7eb', fontSize: 17 }}>
                      <td style={{ padding: '18px 32px', fontWeight: 600, color: '#222' }}>{llm.version}</td>
                      <td style={{ padding: '18px 32px' }}>
                        {llm.status === 'Active' ? (
                          <span style={{ background: '#d1fae5', color: '#059669', fontWeight: 600, borderRadius: 12, padding: '4px 16px', fontSize: 15 }}>Active</span>
                        ) : (
                          <span style={{ background: '#fee2e2', color: '#dc2626', fontWeight: 600, borderRadius: 12, padding: '4px 16px', fontSize: 15 }}>Discontinued</span>
                        )}
                      </td>
                      <td style={{ padding: '18px 32px' }}>
                        <select
                          value={llm.fallback}
                          style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 12px', fontSize: 15 }}
                          onChange={e => {
                            const newLlms = [...llms];
                            newLlms[idx].fallback = e.target.value;
                            setLlms(newLlms);
                          }}
                        >
                          <option value="None">None</option>
                          {llms.filter(l => l.version !== llm.version && l.status === 'Active').map(l => (
                            <option key={l.version} value={l.version}>{l.version}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '18px 32px', textAlign: 'right' }}>
                        {llm.status === 'Active' ? (
                          <a
                            href="#"
                            style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
                            onClick={e => {
                              e.preventDefault();
                              const newLlms = [...llms];
                              newLlms[idx].status = 'Discontinued';
                              setLlms(newLlms);
                            }}
                          >
                            Discontinue
                          </a>
                        ) : (
                          <a
                            href="#"
                            style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
                            onClick={e => {
                              e.preventDefault();
                              const newLlms = [...llms];
                              newLlms[idx].status = 'Active';
                              setLlms(newLlms);
                            }}
                          >
                            Reactivate
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 1 && (
            <div style={{ padding: 32 }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Request Prompt Tags</div>
                <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 18 }}>
                  These temporary tags guide the AI during initial prompt generation and are not saved with the prompt.
                </div>
                <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, maxWidth: 480 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Tag Categories
                    <span style={{ color: '#2563eb', fontSize: 26, cursor: 'pointer', fontWeight: 400 }} onClick={() => setAddRequestTagModalOpen(true)}>+</span>
                  </div>
                  {requestTags.map((tag, idx) => (
                    <div key={tag.name} style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', borderRadius: 8, padding: '14px 18px', marginBottom: 12 }}>
                      <div style={{ flex: 1, fontWeight: 600, fontSize: 16 }}>{tag.name}</div>
                      <span style={{ background: '#d1fae5', color: '#059669', fontWeight: 600, borderRadius: 12, padding: '2px 12px', fontSize: 14, marginRight: 10 }}>Active</span>
                      <span style={{ background: tag.mandatory ? '#fee2e2' : '#dbeafe', color: tag.mandatory ? '#dc2626' : '#2563eb', fontWeight: 600, borderRadius: 12, padding: '2px 12px', fontSize: 14, marginRight: 18 }}>{tag.mandatory ? 'Mandatory' : 'Optional'}</span>
                      <a href="#" style={{ color: '#6b7280', fontWeight: 600, marginRight: 18, textDecoration: 'none', cursor: 'pointer', fontSize: 15 }} onClick={e => { e.preventDefault(); setRequestTags(requestTags.map((t, i) => i === idx ? { ...t, status: 'Inactive' } : t)); }}>Deactivate</a>
                      <a href="#" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', cursor: 'pointer', fontSize: 15 }} onClick={e => { e.preventDefault(); setRequestTags(requestTags.map((t, i) => i === idx ? { ...t, mandatory: !t.mandatory } : t)); }}>{tag.mandatory ? 'Make Optional' : 'Make Mandatory'}</a>
                    </div>
                  ))}
                </div>
                <Modal
                  isOpen={isAddRequestTagModalOpen}
                  onClose={() => setAddRequestTagModalOpen(false)}
                  title="Add New Request Tag Category"
                  maxWidth="420px"
                >
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      if (newRequestTagName.trim()) {
                        setRequestTags([...requestTags, { name: newRequestTagName.trim(), status: 'Active', mandatory: false }]);
                        setNewRequestTagName('');
                        setAddRequestTagModalOpen(false);
                      }
                    }}
                  >
                    <div style={{ marginBottom: 28 }}>
                      <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 10, fontSize: 18 }}>Category Name</label>
                      <input
                        type="text"
                        value={newRequestTagName}
                        onChange={e => setNewRequestTagName(e.target.value)}
                        style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '14px 16px', fontSize: 18, background: '#fff', color: '#222' }}
                        autoFocus
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                      <button
                        type="button"
                        onClick={() => setAddRequestTagModalOpen(false)}
                        style={{ padding: '12px 32px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f3f4f6', color: '#374151', fontWeight: 600, fontSize: 17 }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{ padding: '12px 32px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 17 }}
                      >
                        Add Category
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Discovery Prompt Tags</div>
                <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 18 }}>
                  These permanent tags are saved with prompts for searching, filtering, and recommendations.
                </div>
                <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, maxWidth: 480 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Tag Categories
                    <span style={{ color: '#2563eb', fontSize: 26, cursor: 'pointer', fontWeight: 400 }}>+</span>
                  </div>
                  {discoveryTags.map((tag, idx) => (
                    <div key={tag.name} style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', borderRadius: 8, padding: '14px 18px', marginBottom: 12 }}>
                      <div style={{ flex: 1, fontWeight: 600, fontSize: 16 }}>{tag.name}</div>
                      <span style={{ background: '#d1fae5', color: '#059669', fontWeight: 600, borderRadius: 12, padding: '2px 12px', fontSize: 14, marginRight: 10 }}>Active</span>
                      <span style={{ background: tag.mandatory ? '#fee2e2' : '#dbeafe', color: tag.mandatory ? '#dc2626' : '#2563eb', fontWeight: 600, borderRadius: 12, padding: '2px 12px', fontSize: 14, marginRight: 18 }}>{tag.mandatory ? 'Mandatory' : 'Optional'}</span>
                      <a href="#" style={{ color: '#6b7280', fontWeight: 600, marginRight: 18, textDecoration: 'none', cursor: 'pointer', fontSize: 15 }} onClick={e => { e.preventDefault(); setDiscoveryTags(discoveryTags.map((t, i) => i === idx ? { ...t, status: 'Inactive' } : t)); }}>Deactivate</a>
                      <a href="#" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', cursor: 'pointer', fontSize: 15 }} onClick={e => { e.preventDefault(); setDiscoveryTags(discoveryTags.map((t, i) => i === idx ? { ...t, mandatory: !t.mandatory } : t)); }}>{tag.mandatory ? 'Make Optional' : 'Make Mandatory'}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
