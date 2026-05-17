import { useState, type FormEvent } from 'react';
import type { Priority, TaskFormData } from '../types/task';
import { PRIORITY_LABELS } from '../types/task';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

const emptyForm: TaskFormData = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(emptyForm);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
    setForm(emptyForm);
    setExpanded(false);
  };

  return (
    <section className="task-form-section">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input--title"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          onFocus={() => setExpanded(true)}
          required
          aria-label="Task title"
        />

        {expanded && (
          <div className="task-form__details animate-in">
            <textarea
              className="input input--textarea"
              placeholder="Add a description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              aria-label="Task description"
            />

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
                  aria-label="Due date"
                />
              </label>
            </div>

            <div className="task-form__actions">
              <button type="button" className="btn btn--ghost" onClick={() => setExpanded(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary">
                Add Task
              </button>
            </div>
          </div>
        )}

        {!expanded && form.title.trim() && (
          <button type="submit" className="btn btn--primary task-form__quick-add">
            Add Task
          </button>
        )}
      </form>
    </section>
  );
}
