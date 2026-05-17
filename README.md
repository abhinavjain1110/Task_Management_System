# FocusGrid — Task Management Dashboard

A polished, feature-rich task management application built with **React**, **TypeScript**, and **Vite**. Create, edit, delete, filter, and track tasks with persistent storage, responsive design, and bonus features including card view, dark/light mode, and drag-and-drop reordering.

## Live Demo

**Live**: https://abhinavjain1110.github.io/Task_Management_System/

![FocusGrid Demo](./public/Project%20Demo.png)

## Features

### Core Requirements
- **Task creation** — Title, description, priority (Low/Medium/High), due date
- **List & card views** — Toggle between display modes
- **Edit tasks** — Modal-based editing
- **Delete tasks** — With confirmation dialog
- **Status management** — Mark complete/incomplete with strikethrough, opacity, and color cues
- **Search & filter** — By title/description, status (All/Pending/Completed), priority
- **Task counts** — Total, pending, and completed
- **localStorage persistence** — Data survives page refresh
- **Responsive design** — Desktop, tablet, and mobile

### Bonus Features
- Card view toggle
- Dark / light mode toggle (persisted)
- Drag-and-drop task reordering
- Smooth animations and micro-interactions
- TypeScript throughout
- Unit tests (Vitest + React Testing Library)

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19 |
| Language | TypeScript |
| Build | Vite 8 |
| Testing | Vitest, React Testing Library |
| Storage | localStorage |

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone <your-repo-url>
cd Task_Management
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview
```

### Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/     # UI components (Header, TaskForm, TaskList, modals, etc.)
├── hooks/          # useTasks, useTheme
├── types/          # TypeScript interfaces
├── utils/          # Storage, filters, helpers
├── test/           # Test setup
└── App.tsx         # Root component
```

## Design Decisions

1. **Modal editing** — Keeps the task list uncluttered and works well on mobile compared to inline editing.
2. **Custom hooks** — `useTasks` centralizes CRUD + persistence; `useTheme` handles dark mode with `data-theme` CSS variables.
3. **CSS variables** — Single stylesheet with theme tokens for maintainable light/dark switching without a UI library.
4. **Drag-and-drop** — Native HTML5 DnD API for reordering without extra dependencies.
5. **Filter logic** — Pure functions in `utils/filters.ts` for easy unit testing.

## Deployment

### GitHub Pages

Add to `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

Then use GitHub Actions or `gh-pages` to deploy the `dist` folder.


## License

MIT
