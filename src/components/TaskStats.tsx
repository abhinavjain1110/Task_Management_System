interface TaskStatsProps {
  total: number;
  pending: number;
  completed: number;
}

export function TaskStats({ total, pending, completed }: TaskStatsProps) {
  return (
    <section className="stats" aria-label="Task statistics">
      <article className="stats__card">
        <span className="stats__value">{total}</span>
        <span className="stats__label">Total Tasks</span>
      </article>
      <article className="stats__card stats__card--pending">
        <span className="stats__value">{pending}</span>
        <span className="stats__label">Pending</span>
      </article>
      <article className="stats__card stats__card--completed">
        <span className="stats__value">{completed}</span>
        <span className="stats__label">Completed</span>
      </article>
    </section>
  );
}
