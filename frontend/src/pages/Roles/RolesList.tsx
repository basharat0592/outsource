import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Shield, Plus, ChevronRight } from 'lucide-react';
import type { Role } from '../../types/index';

const RolesList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/roles', { headers: { Authorization: `Bearer ${token}` } });
        setRoles(res.data);
      } catch (err) { setRoles([]); }
    };
    fetchRoles();
  }, []);

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/organisation">Organisation</Link><ChevronRight className="w-4 h-4" /><span className="text-gray-900 font-medium">Roles</span>
      </div>
      <div className="max-w-6xl mx-auto mt-8 px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">Roles</h1>
                <Link to="/roles/new" className="bg-[#4c1d95] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"><Plus className="w-4 h-4 mr-2" /> Add Role</Link>
            </div>
            <table className="w-full text-left">
                <thead className="text-sm font-semibold text-gray-900 border-b border-gray-100"><tr><th className="px-6 py-4">Role Name</th><th className="px-6 py-4">Description</th></tr></thead>
                <tbody className="divide-y divide-gray-50">
                    {roles.length === 0 ? <tr><td colSpan={2} className="px-6 py-4 text-center">No roles found</td></tr> : roles.map((r) => (
                        <tr key={r.role_id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-purple-700 flex items-center gap-2"><Shield className="w-4 h-4" /> {r.role_name}</td>
                            <td className="px-6 py-4 text-gray-600">{r.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
export default RolesList;