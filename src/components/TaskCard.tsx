import React from 'react';
import { Task } from '../types';
import { Clock, Calendar, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isHighestPriority: boolean;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isHighestPriority, onToggleCompletion, onDelete }) => {
  // Format dates for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Format "Today" or "Tomorrow" for dates
  const getRelativeDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return formatDate(date);
  };

  return (
    <div 
      className="bg-[#F7F4A3] rounded-lg p-4 shadow-md mb-3 transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex items-start">
        <div className="mr-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
            className="h-5 w-5 rounded border-gray-300 text-[#8B4C8C] focus:ring-[#8B4C8C] transition-all duration-200"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="mt-2 flex items-center text-gray-600">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">{getRelativeDate(task.scheduledTime)} at {formatTime(task.scheduledTime)}</span>
          </div>
          
          <div className="mt-1 flex items-center">
            <Calendar size={16} className="mr-1" />
            <span className={`text-sm ${isHighestPriority ? 'font-semibold text-red-500' : 'text-gray-600'}`}>
              Due: {getRelativeDate(task.deadline)} at {formatTime(task.deadline)}
            </span>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' : 
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-green-100 text-green-800'
            }`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            
            <span className="text-xs px-2 py-1 rounded-full bg-[#8B4C8C] text-white">
              {task.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;