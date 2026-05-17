import { useEffect, useState, type FormEvent } from 'react';
import type { Priority, Task, TaskFormData } from '../types/task';
import { PRIORITY_LABELS } from '../types/task';

interface EditTaskModalProps {
  task: Task | null;
  onSave: (id: string, data: TaskFormData) => void;
  onClose: () => void;
}

export function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  const [form, setForm] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    }
  }, [task]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && task) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [task, onClose]);

  if (!task) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(task.id, {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal modal--wide animate-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="edit-title" className="modal__title">
          Edit Task
        </h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Title</span>
            <input
              type="text"
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Description</span>
            <textarea
              className="input input--textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
            />
          </label>

          <div className="task-form__row">
            <label className="field">
              <span className="field__label">Priority</span>
              <select
                className="input"
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as Priority })
                }
              >
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <option key={p} value={p}>
                    {PRIORITY_LABELS[p]}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Due Date</span>
              <input
                type="date"
                className="input"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </label>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
