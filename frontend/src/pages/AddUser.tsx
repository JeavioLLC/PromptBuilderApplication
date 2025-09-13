import React from 'react';

const AddUser: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 40, maxWidth: 800, width: '100%' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#222', marginBottom: 32 }}>Add New User</h1>
        <form>
          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>First Name</div>
              <input style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Last Name</div>
              <input style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }} />
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Email ID</div>
            <input style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Role Type</div>
              <select style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            <div style={{ flex: 1 }}></div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Preferred Discovery Tags</div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Department</div>
              <select style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
                <option>-- No preference --</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Usecase</div>
              <select style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 16 }}>
                <option>-- No preference --</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button type="button" style={{ background: '#f3f4f6', color: '#222', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Save User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
