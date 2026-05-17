import type { DragEvent } from 'react';
import type { Task } from '../types/task';
import { PRIORITY_LABELS } from '../types/task';
import { IconCheck } from './Icons';

function formatDate(dateStr: string): string {
  if (!dateStr) return 'No due date';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.status === 'completed') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.dueDate + 'T00:00:00') < today;
}

interface TaskItemProps {
  task: Task;
  viewMode: 'list' | 'card';
  isDragging?: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: DragEvent, id: string) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, id: string) => void;
  onDragEnd: () => void;
}

export function TaskItem({
  task,
  viewMode,
  isDragging,
  onToggle,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TaskItemProps) {
  const completed = task.status === 'completed';
  const overdue = isOverdue(task);

  return (
    <article
      className={`task-item task-item--${viewMode} ${completed ? 'task-item--completed' : ''} ${isDragging ? 'task-item--dragging' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, task.id)}
      onDragEnd={onDragEnd}
    >
      <button
        type="button"
        className="task-item__drag"
        aria-label="Drag to reorder"
        tabIndex={-1}
      >
        ⋮⋮
      </button>

      <label className="task-item__checkbox">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(task.id)}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        />
        <span className="task-item__checkmark">
          <IconCheck className="task-item__check-icon" />
        </span>
      </label>

      <div className="task-item__content">
        <div className="task-item__header">
          <h3 className="task-item__title">{task.title}</h3>
          <span className={`badge badge--${task.priority}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
        </div>

        {task.description && (
          <p className="task-item__description">{task.description}</p>
        )}

        <div className="task-item__meta">
          <span className={`task-item__date ${overdue ? 'task-item__date--overdue' : ''}`}>
            📅 {formatDate(task.dueDate)}
            {overdue && ' (Overdue)'}
          </span>
          <span className={`task-item__status task-item__status--${task.status}`}>
            {completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          className="btn btn--icon"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          ✏️
        </button>
        <button
          type="button"
          className="btn btn--icon btn--icon-danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          🗑️
        </button>
      </div>
    </article>
  );
}
