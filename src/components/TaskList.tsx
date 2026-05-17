import { useCallback, useState, type DragEvent } from 'react';
import type { Task } from '../types/task';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  viewMode: 'list' | 'card';
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onReorder: (orderedIds: string[]) => void;
}

export function TaskList({
  tasks,
  viewMode,
  onToggle,
  onEdit,
  onDelete,
  onReorder,
}: TaskListProps) {
  const [dragId, setDragId] = useState<string | null>(null);

  const handleDragStart = useCallback((_e: DragEvent, id: string) => {
    setDragId(id);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent, targetId: string) => {
      e.preventDefault();
      if (!dragId || dragId === targetId) return;

      const ids = tasks.map((t) => t.id);
      const fromIndex = ids.indexOf(dragId);
      const toIndex = ids.indexOf(targetId);
      if (fromIndex === -1 || toIndex === -1) return;

      const next = [...ids];
      next.splice(fromIndex, 1);
      next.splice(toIndex, 0, dragId);
      onReorder(next);
      setDragId(null);
    },
    [dragId, tasks, onReorder]
  );

  const handleDragEnd = useCallback(() => setDragId(null), []);

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      className={`task-list task-list--${viewMode}`}
      aria-label="Tasks"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          viewMode={viewMode}
          isDragging={dragId === task.id}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />
      ))}
    </section>
  );
}
