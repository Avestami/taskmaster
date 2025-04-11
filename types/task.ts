export interface Task {
  id: string;
  createdAt: number;
  name: string;
  avatar: string;
  title: string;
  description: string;
  dueDate: number;
  priority: string;
  category: any[];
  status: string;
} 