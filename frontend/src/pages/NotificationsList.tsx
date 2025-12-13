import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const NotificationsList: React.FC = () => {
  const navigate = useNavigate();

  // Mock data
  const notifications = [
    { id: 1, initial: 'DR', text: 'Duncan Robertshaw commented on Payroll', time: '2 months ago', isReview: false },
    { id: 2, initial: 'DR', text: 'Duncan Robertshaw commented on Management Accounts', time: '2 months ago', isReview: false },
    { id: 3, initial: 'DR', text: 'Duncan Robertshaw needs your review on VAT Returns', time: '4 months ago', isReview: true },
    { id: 4, initial: 'DR', text: 'Duncan Robertshaw needs your review on VAT Returns', time: '4 months ago', isReview: true },
    { id: 5, initial: 'DR', text: 'Duncan Robertshaw needs your review on VAT Returns', time: '4 months ago', isReview: true },
  ];

  const handleNotificationClick = (id: number) => {
    // CHANGE HERE: 'task' ko 'tasks' kar diya taake App.tsx se match kare
    navigate(`/tasks/${id}`); 
  };

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans relative">
      
      {/* Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/"><Home className="w-4 h-4 text-purple-800" /></Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Notifications</span>
      </div>

      <div className="max-w-6xl mx-auto mt-8 px-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {notifications.map((notif, index) => (
            <div 
              key={notif.id}
              onClick={() => handleNotificationClick(notif.id)}
              className={`p-4 flex items-start gap-4 hover:bg-gray-50 cursor-pointer transition-colors ${index !== notifications.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-[#4c1d95] text-white flex items-center justify-center text-sm font-medium shrink-0">
                {notif.initial}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm">
                  <span className="font-medium">Duncan Robertshaw</span>{' '}
                  {notif.isReview ? 'needs your review on' : 'commented on'}{' '}
                  <span className="font-medium">{notif.text.split(' on ').pop()}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;