import { describe, expect, it } from 'vitest';
import { filterTasks, getTaskCounts } from './filters';
import type { Task } from '../types/task';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Buy groceries',
    description: 'Milk and eggs',
    priority: 'high',
    dueDate: '2026-05-20',
    status: 'pending',
    order: 0,
    createdAt: '2026-05-01',
  },
  {
    id: '2',
    title: 'Read book',
    description: 'Finish chapter 3',
    priority: 'low',
    dueDate: '2026-05-25',
    status: 'completed',
    order: 1,
    createdAt: '2026-05-02',
  },
  {
    id: '3',
    title: 'Team meeting',
    description: 'Weekly sync',
    priority: 'medium',
    dueDate: '2026-05-18',
    status: 'pending',
    order: 2,
    createdAt: '2026-05-03',
  },
];

describe('filterTasks', () => {
  it('returns all tasks when no filters applied', () => {
    const result = filterTasks(mockTasks, { search: '', status: 'all', priority: 'all' });
    expect(result).toHaveLength(3);
  });

  it('filters by status', () => {
    const result = filterTasks(mockTasks, { search: '', status: 'completed', priority: 'all' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Read book');
  });

  it('filters by priority', () => {
    const result = filterTasks(mockTasks, { search: '', status: 'all', priority: 'high' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Buy groceries');
  });

  it('filters by search query on title and description', () => {
    const result = filterTasks(mockTasks, { search: 'chapter', status: 'all', priority: 'all' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Read book');
  });

  it('combines multiple filters', () => {
    const result = filterTasks(mockTasks, {
      search: 'meeting',
      status: 'pending',
      priority: 'medium',
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Team meeting');
  });
});

describe('getTaskCounts', () => {
  it('returns correct counts', () => {
    expect(getTaskCounts(mockTasks)).toEqual({
      total: 3,
      pending: 2,
      completed: 1,
    });
  });

  it('returns zeros for empty array', () => {
    expect(getTaskCounts([])).toEqual({ total: 0, pending: 0, completed: 0 });
  });
});
