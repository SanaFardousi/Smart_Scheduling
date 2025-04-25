import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task, TaskContextType } from '../types';

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
    completed: false,
    priority: 'high',
    category: 'Work',
    aiPriority: true
  },
  {
    id: '2',
    title: 'Grocery shopping',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 4), // 4 hours from now
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 8), // 8 hours from now
    completed: false,
    priority: 'medium',
    category: 'Personal',
    aiPriority: true
  },
  {
    id: '3',
    title: 'Call doctor for appointment',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 48), // 2 days from now
    completed: false,
    priority: 'low',
    category: 'Health',
    aiPriority: true
  }
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load from localStorage if available
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks, (key, value) => {
      if (key === 'scheduledTime' || key === 'deadline') {
        return new Date(value);
      }
      return value;
    }) : initialTasks;
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const getHighestPriorityTaskId = (): string | null => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    
    if (incompleteTasks.length === 0) return null;
    
    // Sort by deadline (ascending) and then by priority (high > medium > low)
    const sortedTasks = [...incompleteTasks].sort((a, b) => {
      // First compare deadlines
      if (a.deadline.getTime() !== b.deadline.getTime()) {
        return a.deadline.getTime() - b.deadline.getTime();
      }
      
      // If deadlines are the same, compare priorities
      const priorityValues = { high: 3, medium: 2, low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    });
    
    return sortedTasks[0]?.id || null;
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask, getHighestPriorityTaskId }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};