import { useMemo, useState } from 'react';
import { ConfirmModal } from './components/ConfirmModal';
import { EditTaskModal } from './components/EditTaskModal';
import { Header } from './components/Header';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import type { Task } from './types/task';
import { filterTasks, getTaskCounts, type FilterState } from './utils/filters';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus, reorderTasks } = useTasks();
  const { theme, toggleTheme } = useTheme();

  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    priority: 'all',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters]
  );

  const counts = useMemo(() => getTaskCounts(tasks), [tasks]);

  const deleteTaskTitle = deleteTarget
    ? tasks.find((t) => t.id === deleteTarget)?.title
    : '';

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteTask(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="app">
      <div className="app__container">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <TaskStats total={counts.total} pending={counts.pending} completed={counts.completed} />

        <TaskForm onSubmit={addTask} />

        <TaskFilters filters={filters} onChange={setFilters} />

        <TaskList
          tasks={filteredTasks}
          viewMode={viewMode}
          onToggle={toggleStatus}
          onEdit={setEditingTask}
          onDelete={setDeleteTarget}
          onReorder={reorderTasks}
        />
      </div>

      <EditTaskModal
        task={editingTask}
        onSave={updateTask}
        onClose={() => setEditingTask(null)}
      />

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTaskTitle}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
