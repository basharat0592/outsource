import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ChevronRight, Home } from 'lucide-react';

const AddClient: React.FC = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [clientType, setClientType] = useState('');
  // I kept email state in case your backend needs it, but it's optional in the UI below
  const [email, setEmail] = useState(''); 
  const [loading, setLoading] = useState(false);

  // The specific dropdown options you asked for
  const clientTypes = [
    "Sole Trader",
    "Limited Liability Partnership",
    "Company",
    "Partnership"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Sending data to backend
      await axios.post('http://127.0.0.1:8000/clients', {
        client_name: clientName,
        type: clientType, 
        email: email, 
        status: "Active"
      }, { headers: { Authorization: `Bearer ${token}` } });

      toast.success('Client added successfully!');
      navigate('/clients');
    } catch (error) {
      toast.error('Failed to add client');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans">
      
      {/* Breadcrumb Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-purple-700"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/clients" className="hover:text-purple-700">Clients</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Add</span>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Client</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-purple-600">*</span></label>
                <input 
                    type="text" 
                    required 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 text-gray-700 transition-colors" 
                />
            </div>

            {/* Type Dropdown */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type <span className="text-purple-600">*</span></label>
                <div className="relative">
                    <select 
                        required 
                        value={clientType} 
                        onChange={(e) => setClientType(e.target.value)} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-500 text-gray-700 bg-white appearance-none"
                    >
                        <option value="" disabled>-</option>
                        {clientTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {/* Simple arrow styling */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
                <button 
                    type="submit" 
                    disabled={loading} 
                    className="px-8 py-3 bg-[#4c1d95] hover:bg-purple-900 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;