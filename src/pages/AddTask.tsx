import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import { useTaskContext } from '../contexts/TaskContext';
import { Task } from '../types';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const { addTask } = useTaskContext();
  
  const [title, setTitle] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [category, setCategory] = useState('');
  const [aiPriority, setAiPriority] = useState(true);

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !scheduledDate || !scheduledTime || !deadlineDate || !deadlineTime || !category) {
      alert('Please fill in all required fields');
      return;
    }

    // Combine date and time strings
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const deadlineDateTime = new Date(`${deadlineDate}T${deadlineTime}`);
    
    // Check if scheduled time is after current time
    if (scheduledDateTime < new Date()) {
      alert('Scheduled time must be in the future');
      return;
    }
    
    // Check if deadline is after scheduled time
    if (deadlineDateTime < scheduledDateTime) {
      alert('Deadline must be after scheduled time');
      return;
    }

    // Create the new task
    const newTask = {
      title,
      scheduledTime: scheduledDateTime,
      deadline: deadlineDateTime,
      priority: aiPriority ? 'medium' : priority, // If AI priority is true, we'll use medium as placeholder
      category,
      aiPriority
    };

    // For the demo, simulate AI prioritization by assigning based on time difference
    if (aiPriority) {
      const timeUntilDeadline = deadlineDateTime.getTime() - new Date().getTime();
      const daysDifference = timeUntilDeadline / (1000 * 60 * 60 * 24);
      
      if (daysDifference < 1) {
        newTask.priority = 'high';
      } else if (daysDifference < 3) {
        newTask.priority = 'medium';
      } else {
        newTask.priority = 'low';
      }
    }

    addTask(newTask);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Add New Task" />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-[#8B4C8C] hover:text-[#7A3F7B] transition-colors duration-200"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Tasks</span>
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Create a New Task</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you need to do?"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B4C8C] focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date *
                </label>
                <input
                  type="date"
                  id="scheduledDate"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={today}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B4C8C] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Time *
                </label>
                <input
                  type="time"
                  id="scheduledTime"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B4C8C] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deadlineDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline Date *
                </label>
                <input
                  type="date"
                  id="deadlineDate"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  min={today}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B4C8C] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="deadlineTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline Time *
                </label>
                <input
                  type="time"
                  id="deadlineTime"
                  value={deadlineTime}
                  onChange={(e) => setDeadlineTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B4C8C] focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Work, Personal, Health"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B4C8C] focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="bg-[#A5C0D0] bg-opacity-10 rounded-lg p-4 border border-[#A5C0D0] border-opacity-20">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="aiPriority"
                  checked={aiPriority}
                  onChange={(e) => setAiPriority(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#8B4C8C] focus:ring-[#8B4C8C]"
                />
                <label htmlFor="aiPriority" className="ml-2 flex items-center text-sm font-medium text-gray-700">
                  <Sparkles size={16} className="mr-1 text-[#8B4C8C]" />
                  Let AI determine priority (recommended)
                </label>
              </div>
              
              {!aiPriority && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manual Priority
                  </label>
                  <div className="flex space-x-4">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={level}
                          checked={priority === level}
                          onChange={() => setPriority(level)}
                          className="h-4 w-4 border-gray-300 text-[#8B4C8C] focus:ring-[#8B4C8C]"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#8B4C8C] hover:bg-[#7A3F7B] text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTask;