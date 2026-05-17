import type { Theme } from '../utils/storage';
import { IconLogo, IconMoon, IconSun } from './Icons';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  viewMode: 'list' | 'card';
  onViewModeChange: (mode: 'list' | 'card') => void;
}

export function Header({ theme, onToggleTheme, viewMode, onViewModeChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">
          <IconLogo />
        </span>
        <div>
          <h1 className="header__title">FocusGrid</h1>
          <p className="header__subtitle">Manage tasks efficiently</p>
        </div>
      </div>

      <div className="header__actions">
        <div className="view-toggle" role="group" aria-label="View mode">
          <button
            type="button"
            className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => onViewModeChange('list')}
            aria-pressed={viewMode === 'list'}
          >
            List
          </button>
          <button
            type="button"
            className={`view-toggle__btn ${viewMode === 'card' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => onViewModeChange('card')}
            aria-pressed={viewMode === 'card'}
          >
            Cards
          </button>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <IconMoon /> : <IconSun />}
        </button>
      </div>
    </header>
  );
}
