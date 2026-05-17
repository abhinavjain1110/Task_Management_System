import type { PriorityFilter, StatusFilter, Task } from '../types/task';

export interface FilterState {
  search: string;
  status: StatusFilter;
  priority: PriorityFilter;
}

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  const query = filters.search.trim().toLowerCase();

  return tasks
    .filter((task) => {
      if (filters.status !== 'all' && task.status !== filters.status) return false;
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      if (!query) return true;
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => a.order - b.order);
}

export function getTaskCounts(tasks: Task[]) {
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  return {
    total: tasks.length,
    pending,
    completed,
  };
}
