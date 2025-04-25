export interface Task {
  id: string;
  title: string;
  scheduledTime: Date;
  deadline: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  aiPriority: boolean;
}

export type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  getHighestPriorityTaskId: () => string | null;
};