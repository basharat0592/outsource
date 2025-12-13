import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, Home, Paperclip, Download, Upload, Clock, User as UserIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Types define kiye
interface Task {
  task_id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
  time_estimate: number;
  billable_time: number;
  client_id: number;
  attachments: string[]; // List of filenames
}

interface Comment {
  comment_id: number;
  content: string;
  created_at: string;
  user_id: number;
}

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL se ID lena
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Data Fetching
  const fetchTaskData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Task Details fetch karein
      const taskRes = await axios.get(`http://127.0.0.1:8000/tasks?search=${id}`, { headers });
      // Search returns array, find exact match by ID (Backend can be optimized later)
      const foundTask = taskRes.data.find((t: Task) => t.task_id === Number(id));
      setTask(foundTask);

      // Comments fetch karein
      const commentsRes = await axios.get(`http://127.0.0.1:8000/tasks/${id}/comments`, { headers });
      setComments(commentsRes.data);
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching task details", err);
      toast.error("Failed to load task details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [id]);

  // 2. File Upload Logic
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !task) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const token = localStorage.getItem('token');
        
        // Step A: Upload File
        const uploadRes = await axios.post('http://127.0.0.1:8000/upload', formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        });

        // Step B: Update Task with new attachment
        const newAttachmentName = uploadRes.data.filename;
        const currentAttachments = task.attachments || [];
        const updatedAttachments = [...currentAttachments, newAttachmentName];

        await axios.put(`http://127.0.0.1:8000/tasks/${task.task_id}`, {
            attachments: updatedAttachments
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        toast.success("File uploaded successfully");
        fetchTaskData(); // Refresh data

    } catch (err) {
        console.error("Upload failed", err);
        toast.error("File upload failed");
    }
  };

  // 3. Comment Submit Logic
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
        const token = localStorage.getItem('token');
        await axios.post('http://127.0.0.1:8000/comments', {
            content: newComment,
            task_id: Number(id)
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        setNewComment('');
        fetchTaskData(); // Refresh comments
        toast.success("Comment added");
    } catch (err) {
        toast.error("Failed to add comment");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading task details...</div>;
  if (!task) return <div className="p-10 text-center">Task not found</div>;

  return (
    <div className="w-full bg-[#F8F9FB] min-h-screen font-sans relative">
      
      {/* Breadcrumbs */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/"><Home className="w-4 h-4 text-purple-800" /></Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/tasks" className="text-purple-800 font-medium cursor-pointer">Tasks</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{task.title}</span>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-6 pb-20">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{task.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Description, Attachments, Activity */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Main Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                        <p className="text-gray-600 text-sm whitespace-pre-wrap">
                            {task.description || "No description provided."}
                        </p>
                    </div>

                    {/* Attachments & Upload */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Attachments</h3>
                        
                        {/* List Existing Files */}
                        <div className="space-y-3 mb-4">
                            {task.attachments && task.attachments.length > 0 ? (
                                task.attachments.map((fileName, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <Paperclip className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{fileName}</span>
                                        </div>
                                        <a 
                                            href={`http://127.0.0.1:8000/uploads/${fileName}`} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-purple-700 text-sm font-medium hover:underline flex items-center gap-1"
                                        >
                                            <Download className="w-3 h-3" /> Download
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 italic">No attachments yet.</p>
                            )}
                        </div>

                        {/* Upload Box */}
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors"
                        >
                            <input 
                                type="file" 
                                hidden 
                                ref={fileInputRef} 
                                onChange={handleFileUpload}
                            />
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                        </div>
                    </div>
                </div>

                {/* Activity / Comments Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity</h3>
                    
                    {/* Comment Input */}
                    <div className="flex gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium shrink-0">
                            Me
                        </div>
                        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                             <textarea 
                                placeholder="Add a comment..." 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full text-sm border-none focus:ring-0 resize-none h-20 placeholder-gray-400"
                             ></textarea>
                             <div className="flex justify-end mt-2">
                                <button 
                                    onClick={handleCommentSubmit}
                                    className="bg-[#4c1d95] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#3b1676]"
                                >
                                    Comment
                                </button>
                             </div>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.comment_id} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium shrink-0">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-bold text-gray-900">User {comment.user_id}</span>
                                        <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm">
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Info Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-6">
                    
                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Type</h4>
                        <p className="text-sm text-gray-800 font-medium">Task ID: {task.task_id}</p> 
                        {/* Note: Task Type Name backend se layein ge agle step mein */}
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Client ID</h4>
                        <p className="text-sm text-gray-800">{task.client_id}</p>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Due date</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-800">
                             <Clock className="w-4 h-4 text-gray-400" />
                             {new Date(task.due_date).toLocaleDateString()}
                        </div>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Time estimate</h4>
                        <p className="text-sm text-gray-800">{task.time_estimate} hours</p>
                    </div>
                    <hr className="border-gray-100"/>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                            ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                        `}>
                            {task.status.toUpperCase()}
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