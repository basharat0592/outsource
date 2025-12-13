import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Home, ChevronRight } from 'lucide-react';
import type { User } from '../../types/index';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/users', { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data);
      } catch (err) { console.error(err); }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/organisation" className="hover:text-purple-700">Organisation</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Users</span>
      </div>
      <div className="max-w-6xl mx-auto mt-8 px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                <Link to="/organisation/users/invite" className="bg-[#4c1d95] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"><Plus className="w-4 h-4 mr-2" /> Invite User</Link>
            </div>
            <table className="w-full text-left">
                <thead className="text-sm font-semibold text-gray-900 border-b border-gray-100"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Email</th></tr></thead>
                <tbody className="divide-y divide-gray-50">
                    {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-700">{u.first_name} {u.last_name}</td>
                            <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{u.role}</span></td>
                            <td className="px-6 py-4 text-gray-600">{u.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
export default UsersList;