import { useCallback, useEffect, useState } from 'react';
import type { Task, TaskFormData } from '../types/task';
import { generateId } from '../utils/id';
import { loadTasks, saveTasks } from '../utils/storage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((data: TaskFormData) => {
    const task: Task = {
      id: generateId(),
      ...data,
      status: 'pending',
      order: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, data: TaskFormData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleStatus = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
  }, []);

  const reorderTasks = useCallback((orderedIds: string[]) => {
    setTasks((prev) => {
      const map = new Map(prev.map((t) => [t.id, t]));
      return orderedIds
        .map((id, index) => {
          const task = map.get(id);
          return task ? { ...task, order: index } : null;
        })
        .filter((t): t is Task => t !== null);
    });
  }, []);

  return { tasks, addTask, updateTask, deleteTask, toggleStatus, reorderTasks };
}
