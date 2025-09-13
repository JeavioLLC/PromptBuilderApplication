import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';

const USERS = [
  { name: 'Hiren Jivani (Admin)', email: 'hiren.jivani@jeavio.com', role: 'Admin' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
];

const TABS = [
  'User Management',
  'LLM Management',
  'Tag Management',
];

const LLM_LIST = [
  { version: 'Gemini 2.6 Pro', status: 'Active', fallback: 'None' },
  { version: 'GPT-4 Turbo', status: 'Active', fallback: 'None' },
  { version: 'Claude 3 Opus', status: 'Active', fallback: 'None' },
  { version: 'Gemini 2.5 Pro', status: 'Discontinued', fallback: 'None' },
];

const AdminPanel: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState(USERS);
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
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                style={{
                  flex: 1,
                  padding: '18px 0',
                  fontWeight: 600,
                  fontSize: 17,
                  color: tab === i ? '#2563eb' : '#374151',
                  border: 'none',
                  background: 'none',
                  borderBottom: tab === i ? '3px solid #2563eb' : '3px solid transparent',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'color 0.2s, border-bottom 0.2s'
                }}
              >
                {t}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontWeight: 600,
                fontSize: 16,
                margin: 12,
                cursor: 'pointer',
                alignSelf: 'center'
              }}
              onClick={() => navigate('/admin/add-user')}
            >
              ＋ Add New User
            </button>
          </div>
          {tab === 0 && (
            <div style={{ padding: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#f7f8fa', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: 15 }}>
                    <th style={{ padding: '18px 32px' }}>NAME</th>
                    <th style={{ padding: '18px 32px' }}>EMAIL</th>
                    <th style={{ padding: '18px 32px' }}>ROLE</th>
                    <th style={{ padding: '18px 32px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.email} style={{ borderTop: idx === 0 ? 'none' : '1px solid #e5e7eb', fontSize: 17 }}>
                      <td style={{ padding: '18px 32px', fontWeight: 600, color: '#222' }}>{user.name}</td>
                      <td style={{ padding: '18px 32px', color: '#374151' }}>{user.email}</td>
                      <td style={{ padding: '18px 32px', color: '#374151' }}>{user.role}</td>
                      <td style={{ padding: '18px 32px', textAlign: 'right' }}>
                        <a
                          href="#"
                          style={{ color: '#2563eb', fontWeight: 600, marginRight: 18, textDecoration: 'none', cursor: 'pointer' }}
                          onClick={e => {
                            e.preventDefault();
                            navigate('/admin/edit-user', { state: { user } });
                          }}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          style={{ color: '#ef4444', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
                          onClick={e => {
                            e.preventDefault();
                            handleDelete(user);
                          }}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal
                isOpen={isDeleteModalOpen}
                onClose={cancelDelete}
                title="Delete User Confirmation"
                maxWidth="400px"
              >
                <div style={{ padding: '12px 0 0 0', fontSize: 17, color: '#222' }}>
                  Are you sure you want to delete <b>{deleteUser?.name}</b>?
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 28 }}>
                  <button
                    onClick={cancelDelete}
                    style={{ padding: '8px 22px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f3f4f6', color: '#374151', fontWeight: 600, fontSize: 16 }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    style={{ padding: '8px 22px', borderRadius: 6, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 600, fontSize: 16 }}
                  >
                    Delete
                  </button>
                </div>
              </Modal>
            </div>
          )}
          {tab === 1 && (
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
          {tab === 2 && (
            <div style={{ padding: 32 }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Request Prompt Tags</div>
                <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 18 }}>
                  These temporary tags guide the AI during initial prompt generation and are not saved with the prompt.
                </div>
                <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, maxWidth: 480 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Tag Categories
                    <span style={{ color: '#2563eb', fontSize: 26, cursor: 'pointer', fontWeight: 400 }}>+</span>
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
