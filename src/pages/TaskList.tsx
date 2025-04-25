import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import { useTaskContext } from '../contexts/TaskContext';

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, toggleTaskCompletion, deleteTask, getHighestPriorityTaskId } = useTaskContext();
  const highestPriorityTaskId = getHighestPriorityTaskId();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Your Tasks" />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Current Tasks</h2>
          
          <button
            onClick={() => navigate('/add')}
            className="bg-[#8B4C8C] hover:bg-[#7A3F7B] text-white px-4 py-2 rounded-full flex items-center transition-colors duration-200"
          >
            <PlusCircle size={18} className="mr-1" />
            <span>Add Task</span>
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center shadow">
            <p className="text-gray-600">No tasks yet! Add your first task to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                isHighestPriority={task.id === highestPriorityTaskId}
                onToggleCompletion={toggleTaskCompletion}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default TaskList;