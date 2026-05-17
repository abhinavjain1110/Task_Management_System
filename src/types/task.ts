export type Priority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
  order: number;
  createdAt: string;
}

export type StatusFilter = 'all' | 'pending' | 'completed';

export type PriorityFilter = 'all' | Priority;

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
