import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales'];
const usecases = ['-- No preference --', 'Prompt Creation', 'Prompt Review', 'Prompt Usage'];
const roles = ['Admin', 'User', 'Manager'];

const defaultUser = {
  firstName: 'Hiren',
  lastName: 'Jivani',
  email: 'hiren.jivani@jeavio.com',
  role: 'Admin',
  department: 'Engineering',
  usecase: '-- No preference --',
};

export default function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  // If user data is passed via state, use it; otherwise use default
  const userFromState = location.state && location.state.user ? location.state.user : defaultUser;
  // Split name if needed
  const [user, setUser] = useState(() => {
    if (userFromState.name && (!userFromState.firstName || !userFromState.lastName)) {
      const [firstName, ...rest] = userFromState.name.split(' ');
      return {
        ...userFromState,
        firstName,
        lastName: rest.join(' '),
      };
    }
    return userFromState;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user logic here
    navigate(-1);
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-[#f6f7fa]">
        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <form
            className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-xl"
            onSubmit={handleSubmit}
            style={{ minWidth: 400 }}
          >
            <h1 className="text-3xl font-bold mb-8 text-left">Edit User</h1>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName || ''}
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
                  value={user.lastName || ''}
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
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Role Type</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="mb-2 font-semibold text-lg text-gray-800">Preferred Discovery Tags</div>
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
                Save User
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
