export function EmptyState() {
  return (
    <div className="empty-state animate-in">
      <span className="empty-state__icon" aria-hidden="true">
        📋
      </span>
      <h2 className="empty-state__title">No tasks found</h2>
      <p className="empty-state__text">
        Create a new task above or adjust your search and filters.
      </p>
    </div>
  );
}
