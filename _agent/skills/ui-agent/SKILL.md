---
name: ui-agent
description: Domain specialist for components, pages, client state, and UI layer code in src/ui/. Loaded automatically when a task touches src/ui/.
license: MIT
---

# UI Agent — Domain Skill

**Scope:** `src/ui/` — components, pages, layouts, client-side state management, styling, and user interactions.

## When AG Loads This
- Task plan touches any file in `src/ui/`
- Domain Skill Loading table in `/ag-build` matches `src/ui/`
- Agent Assignments table assigns scope to `ui-agent`

## Owned Directories
```
src/ui/            ← full read/write ownership
src/components/    ← if exists, full ownership
src/pages/         ← if exists, full ownership
src/styles/        ← if exists, full ownership
src/hooks/         ← if exists, full ownership
public/            ← static assets (shared — coordinate via Lead)
```

## Forbidden Directories
```
src/core/          ← core-agent scope (read-only for type imports)
src/api/           ← api-agent scope (consume endpoints, don't edit)
tests/             ← qa-agent scope
```

## Coding Standards

### Components
- One component per file — file name matches component name
- Functional components only — no class components
- Props interface defined and exported at top of file
- Decompose: if a component exceeds 150 lines, extract sub-components
- Use composition over prop drilling — context or state management for deep data

### Styling
- Use design tokens — no hardcoded colors, spacing, or font sizes
- CSS Modules, Tailwind, or styled-components — match project convention
- Responsive-first: mobile breakpoint is the default, scale up
- Dark mode support via CSS variables or theme context

### State Management
- Local state (`useState`) for component-scoped data
- Context or store (Zustand, Redux, etc.) for shared/global state
- Never store derived data — compute from source of truth
- API state: use React Query, SWR, or equivalent — no manual fetch/loading/error

### Accessibility
- Every interactive element: keyboard accessible
- Images: meaningful `alt` text (not "image" or empty)
- Form inputs: associated `<label>` elements
- Color contrast: WCAG AA minimum (4.5:1 for text)

### File Naming
- `[ComponentName].tsx` for components (PascalCase)
- `[ComponentName].module.css` for scoped styles
- `use[HookName].ts` for custom hooks (camelCase)
- `[page-name].tsx` for page/route components

## Contract Obligations

When working in multi-agent mode:
1. **Consume:** Types from `src/core/` (Wave 1), API endpoints from `src/api/` (Wave 2)
2. **Produce:** Fully functional UI components and pages
3. **Deliver to:** `src/ui/` (or `src/components/`, `src/pages/`) — all output here
4. **Wave timing:** Can start component shells in Wave 2 (no API dep), connect to endpoints in Wave 3
5. **Visual contract:** Components must match design specs or acceptance criteria exactly

## Anti-Patterns
- **Don't** put business logic in components — import from `src/core/`
- **Don't** make direct database calls — consume api-agent's endpoints
- **Don't** define API routes — that's api-agent's scope
- **Don't** write integration tests — log test requests to `_agent/bugs.md` for qa-agent
- **Don't** use inline styles for anything reusable — use design tokens
- **Don't** ignore loading/error states — every async operation needs all 3 states (loading, success, error)
