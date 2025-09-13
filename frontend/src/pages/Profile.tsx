import React, { useState } from 'react';

const defaultUser = {
  firstName: 'Hiren',
  lastName: 'Jivani',
  email: 'hiren.jivani@jeavio.com',
  role: 'Admin',
  department: '-- No preference --',
  usecase: '-- No preference --',
};

const USERS = [
  { name: 'Hiren Jivani (Admin)', email: 'hiren.jivani@jeavio.com', role: 'Admin' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
];

const departments = ['-- No preference --', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales'];
const usecases = ['-- No preference --', 'Prompt Creation', 'Prompt Review', 'Prompt Usage'];

export default function Profile() {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(defaultUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    // Optionally reset to original
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fa', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#222', marginBottom: 24 }}>People</h1>
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
              My Profile
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
              All Users
            </button>
          </div>
          {tab === 0 && (
            <form onSubmit={handleSubmit} style={{ padding: 48, maxWidth: 900, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', color: '#374151', fontWeight: 500, marginBottom: 8 }}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '12px 14px', fontSize: 17, background: '#fff', color: '#222' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#374151', fontWeight: 500, marginBottom: 8 }}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '12px 14px', fontSize: 17, background: '#fff', color: '#222' }}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: 500, marginBottom: 8 }}>Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '12px 14px', fontSize: 17, background: '#fff', color: '#222' }}
                  required
                  disabled
                />
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', color: '#374151', fontWeight: 500, marginBottom: 8 }}>Role Type</label>
                <input
                  type="text"
                  name="role"
                  value={user.role}
                  style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '12px 14px', fontSize: 17, background: '#f3f4f6', color: '#6b7280' }}
                  disabled
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18, color: '#222' }}>My Preferred Discovery Tags</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                <div>
                  <label style={{ display: 'block', color: '#374151', fontWeight: 500, marginBottom: 8 }}>Department</label>
                  <select
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '12px 14px', fontSize: 17, background: '#fff', color: '#222' }}
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#374151', fontWeight: 500, marginBottom: 8 }}>Usecase</label>
                  <select
                    name="usecase"
                    value={user.usecase}
                    onChange={handleChange}
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '12px 14px', fontSize: 17, background: '#fff', color: '#222' }}
                  >
                    {usecases.map((uc) => (
                      <option key={uc} value={uc}>{uc}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 32 }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{ padding: '12px 32px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f3f4f6', color: '#374151', fontWeight: 600, fontSize: 17 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px 32px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 17 }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
          {tab === 1 && (
            <div style={{ padding: 48, maxWidth: 900, margin: '0 auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#f7f8fa', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: 15 }}>
                    <th style={{ padding: '18px 32px' }}>NAME</th>
                    <th style={{ padding: '18px 32px' }}>EMAIL</th>
                    <th style={{ padding: '18px 32px' }}>ROLE</th>
                  </tr>
                </thead>
                <tbody>
                  {USERS.map((u) => (
                    <tr key={u.email} style={{ borderTop: '1px solid #e5e7eb', fontSize: 17 }}>
                      <td style={{ padding: '18px 32px', fontWeight: 600, color: '#222' }}>{u.name}</td>
                      <td style={{ padding: '18px 32px', color: '#374151' }}>{u.email}</td>
                      <td style={{ padding: '18px 32px', color: '#374151' }}>{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
