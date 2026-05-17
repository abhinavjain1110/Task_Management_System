import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TaskStats } from './TaskStats';

describe('TaskStats', () => {
  it('displays task counts', () => {
    render(<TaskStats total={10} pending={6} completed={4} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
