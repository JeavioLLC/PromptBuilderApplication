import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';

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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    // Optionally reset to original
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-[#f6f7fa]">
        <div className="flex-1 flex flex-col items-center py-12">
          <div className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-left">People</h1>
            <div className="flex border-b mb-8">
              <button
                className={`px-6 py-3 font-semibold text-lg border-b-2 transition-colors ${tab === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                onClick={() => setTab(0)}
              >
                My Profile
              </button>
              <button
                className={`px-6 py-3 font-semibold text-lg border-b-2 transition-colors ${tab === 1 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                onClick={() => setTab(1)}
              >
                All Users
              </button>
            </div>
            {tab === 0 && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Role Type</label>
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
                    disabled
                  />
                </div>
                <div className="mb-2 font-semibold text-lg text-gray-800">My Preferred Discovery Tags</div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 mb-2">Department</label>
                    <select
                      name="department"
                      value={user.department}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Usecase</label>
                    <select
                      name="usecase"
                      value={user.usecase}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {usecases.map((uc) => (
                        <option key={uc} value={uc}>{uc}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
            {tab === 1 && (
              <div className="mt-6">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#f7f8fa] text-left font-semibold text-gray-500 text-base">
                      <th className="py-3 px-6">NAME</th>
                      <th className="py-3 px-6">EMAIL</th>
                      <th className="py-3 px-6">ROLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((u, idx) => (
                      <tr key={u.email} className="border-t text-base" style={{ borderColor: '#e5e7eb' }}>
                        <td className="py-3 px-6 font-semibold text-gray-900">{u.name}</td>
                        <td className="py-3 px-6 text-gray-700">{u.email}</td>
                        <td className="py-3 px-6 text-gray-700">{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
