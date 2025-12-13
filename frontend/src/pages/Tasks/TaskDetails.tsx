import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Paperclip, Download } from 'lucide-react';

const TaskDetail: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans relative">
      
      {/* Breadcrumbs */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/"><Home className="w-4 h-4 text-purple-800" /></Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-purple-800 font-medium cursor-pointer">Notifications</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">abc</span>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-6 pb-20">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">abc</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Description, Attachments, Activity */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Main Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                        <p className="text-gray-600 text-sm">vat return</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Attachments</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <Paperclip className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">Example_Tax_Return_v1.xlsx</span>
                                </div>
                                <button className="text-purple-700 text-sm font-medium hover:underline">Download</button>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <Paperclip className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">image_9.png</span>
                                </div>
                                <button className="text-purple-700 text-sm font-medium hover:underline">Download</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity</h3>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium shrink-0">
                            R
                        </div>
                        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                             <textarea 
                                placeholder="Add a comment..." 
                                className="w-full text-sm border-none focus:ring-0 resize-none h-20 placeholder-gray-400"
                             ></textarea>
                             <div className="flex justify-end mt-2">
                                <button className="bg-[#4c1d95] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#3b1676]">
                                    Comment
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Info Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-6">
                    
                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Type</h4>
                        <p className="text-sm text-gray-800">VAT Returns</p>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Client</h4>
                        <p className="text-sm text-gray-800">ABC Ltd</p>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Due date</h4>
                        <p className="text-sm text-gray-800">3/28/2025</p>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Time estimate</h4>
                        <p className="text-sm text-gray-800">5 hours, 30 minutes</p>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Billable time</h4>
                        <p className="text-sm text-gray-800">2 hours, 2 minutes</p>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Completed
                        </span>
                    </div>

                </div>
            </div>
        </div>
      </div>

      {/* Corner Ribbon */}
      <div className="fixed bottom-0 right-0 pointer-events-none z-10">
         <div className="w-0 h-0 border-b-[100px] border-b-[#4c1d95] border-l-[100px] border-l-transparent relative">
            <span className="absolute bottom-6 right-2 text-white font-bold transform -rotate-45 text-sm leading-none">
                Customer
            </span>
         </div>
      </div>

    </div>
  );
};

export default TaskDetail;