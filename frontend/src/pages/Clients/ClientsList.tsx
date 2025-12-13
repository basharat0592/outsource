import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Plus, Folder } from 'lucide-react'; // Added necessary icons
import type { Client } from '../../types/index';

// Ensure your type definition includes 'type'
// interface Client {
//   client_id: number;
//   client_name: string;
//   email: string;
//   type?: string; 
// }

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/clients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClients(response.data);
      } catch (error) {
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">

      {/* Breadcrumb Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-purple-700"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Clients</span>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-6">

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">

          {/* Header Section */}
          <div className="flex justify-between items-center p-6 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
            <Link
              to="/clients/add"
              className="bg-[#4c1d95] hover:bg-purple-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Client
            </Link>
          </div>

          {/* Table Section */}
          <div className="w-full px-6">

            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-gray-100 pb-2 mb-2 text-sm font-semibold text-gray-900">
              <div className="col-span-6 pl-2">Name</div>
              <div className="col-span-4">Type</div>
              <div className="col-span-2 text-right pr-4">Action</div>
            </div>

            {/* Table Body */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading clients...</div>
            ) : (
              <div className="space-y-1">
                {clients.map((client) => (
                  <div key={client.client_id} className="grid grid-cols-12 items-center py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors group">

                    {/* Name Column with Folder Icon */}
                    <div className="col-span-6 flex items-center gap-3 pl-2">
                      <Folder className="w-5 h-5 text-[#4c1d95]" strokeWidth={1.5} />
                      <span className="text-gray-700 text-sm font-medium">{client.client_name}</span>
                    </div>

                    {/* Type Column */}
                    <div className="col-span-4 text-sm text-gray-600">
                      {/* Agar backend se 'type' aa raha hai to wo show karega, nahi to default 'Company' */}
                      {client.type || 'Company'}
                    </div>

                    {/* Action Column (View Link) */}
                    <div className="col-span-2 text-right pr-4">
                      <Link
                        to={`/clients/${client.client_id}`}
                        className="text-[#4c1d95] text-sm hover:underline font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && clients.length === 0 && (
              <div className="text-center py-20 text-gray-400 text-sm">
                No clients found. Click "Add Client" to create one.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsList;