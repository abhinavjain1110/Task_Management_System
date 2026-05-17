import type { FilterState } from '../utils/filters';
import type { PriorityFilter, StatusFilter } from '../types/task';
import { PRIORITY_LABELS } from '../types/task';

interface TaskFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const setStatus = (status: StatusFilter) => onChange({ ...filters, status });
  const setPriority = (priority: PriorityFilter) => onChange({ ...filters, priority });

  return (
    <section className="filters">
      <div className="filters__search">
        <label htmlFor="search" className="sr-only">
          Search tasks
        </label>
        <input
          id="search"
          type="search"
          className="input"
          placeholder="Search by title or description…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="filters__groups">
        <div className="filter-group" role="group" aria-label="Filter by status">
          <span className="filter-group__label">Status</span>
          <div className="filter-group__options">
            {(['all', 'pending', 'completed'] as const).map((status) => (
              <button
                key={status}
                type="button"
                className={`chip ${filters.status === status ? 'chip--active' : ''}`}
                onClick={() => setStatus(status)}
                aria-pressed={filters.status === status}
              >
                {status === 'all' ? 'All Tasks' : status === 'pending' ? 'Pending' : 'Completed'}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group" role="group" aria-label="Filter by priority">
          <span className="filter-group__label">Priority</span>
          <div className="filter-group__options">
            <button
              type="button"
              className={`chip ${filters.priority === 'all' ? 'chip--active' : ''}`}
              onClick={() => setPriority('all')}
              aria-pressed={filters.priority === 'all'}
            >
              All
            </button>
            {(['low', 'medium', 'high'] as const).map((p) => (
              <button
                key={p}
                type="button"
                className={`chip chip--${p} ${filters.priority === p ? 'chip--active' : ''}`}
                onClick={() => setPriority(p)}
                aria-pressed={filters.priority === p}
              >
                {PRIORITY_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
