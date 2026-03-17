# UI UX Pro Max Skill

Professional UI/UX design intelligence and automated design system generation.

## 🚀 Core Capabilities
1. **Design System Generation**: Automatically creates a complete design system (Colors, Typography, Patterns) based on industry type.
2. **100+ Reasoning Rules**: Specialized design logic for SaaS, Fintech, Healthcare, E-commerce, and more.
3. **67 UI Styles**: From Glassmorphism to Bento Grids and AI-Native UI.
4. **99 UX Guidelines**: Best practices and accessibility (WCAG AA) enforced.

## 🛠 Usage
When a user requests a UI/UX task:
1. **Identify**: Contextualize the request (e.g., "Build a landing page for a beauty spa").
2. **Generate**: Use the internal reasoning engine to propose a Design System.
3. **Draft**: Create the UI following the recommended Pattern, Style, and Colors.
4. **Verify**: Run the "Pre-delivery Checklist" before outputting code.

## 📋 Pre-delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide).
- [ ] `cursor-pointer` on all clickable elements.
- [ ] Hover states with smooth transitions (150-300ms).
- [ ] Text contrast strictly 4.5:1 minimum (WCAG AA).
- [ ] Focus states visible for keyboard navigation.
- [ ] Responsive layouts for 375px, 768px, 1024px, 1440px.

## 🧩 Scripts
- `python3 src/scripts/search.py`: Query the design database.
- `python3 src/scripts/search.py --design-system`: Generate a full system for a product.
