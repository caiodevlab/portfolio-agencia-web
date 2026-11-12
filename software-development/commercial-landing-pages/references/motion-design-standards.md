# Motion Design & Glassmorphism Standards for Commercial Landing Pages

## Glassmorphism Design Tokens

**Background Layer:**
- `bg-slate-950/90` - 90% opacity slate-950 background with subtle blur
- `bg-slate-900` - 100% opacity slate-900 for header/footer layers
- `bg-slate-800/50` - 50% opacity slate-800 for content layers

**Glassmorphism Layer:**
- `bg-slate-900/10` - 10% opacity slate-900 for glass containers
- `bg-slate-800/20` - 20% opacity slate-800 for secondary glass layers
- `bg-slate-700/30` - 30% opacity slate-700 for tertiary glass layers

**Border & Shadow:**
- `border-slate-800/50` - 50% opacity slate-800 border
- `shadow-slate-800/30` - 30% opacity slate-800 shadow
- `shadow-slate-800/15` - 15% opacity slate-800 shadow for subtle depth

## Motion Design Patterns

### Scroll Reveal Timing
- Primary hero animations: 0.8s ease-out (delay 0.1s)
- Secondary elements: 0.4s ease-out (delay 0.2s)
- Tertiary elements: 0.2s ease-out (delay 0.3s)
- All animations must use `animation-fill-mode: forwards`

### Glassmorphism Motion
- Subtle parallax effect on glass containers (0.05s delay on scroll)
- Hover effects: 0.2s ease-in-out scale (1.03→1.01) and 0.15s opacity shift
- No abrupt motion - all transitions must be smooth and consistent

## Interactive Calculator Guidelines

### Calculator Structure
1. **Input Validation:** Always validate inputs before calculation
2. **Real-time Updates:** Show results immediately with smooth transitions
3. **Error States:** Display clear error messages with actionable fixes
4. **Mobile Optimization:** Ensure calculator works on all mobile breakpoints

### Calculator Error Handling
- **Validation Errors:** Show inline validation with red borders and clear messages
- **Calculation Errors:** Display "Invalid input" with specific reason (e.g., "Division by zero")
- **Network Errors:** Show fallback message with retry option

## Responsive Design Rules

### Breakpoint Strategy
- `sm` (640px): Single column layout, mobile-first
- `md` (768px): Two-column layout for hero sections
- `lg` (1024px): Three-column layout for portfolio sections
- `xl` (1280px): Four-column layout for complex dashboards

### Layout Guidelines
- **Mobile First:** Start with single-column layouts
- **Column Collapsing:** Use `grid md:grid-cols-2` for two-column layouts
- **Card Structure:** Always use `rounded-2xl`, `shadow-xl`, and `border border-slate-800/50`
- **CTA Placement:** Primary CTA must be visible without scrolling on mobile

## Accessibility Requirements
- All interactive elements must have `aria-label` attributes
- Color contrast must meet WCAG 2.1 AA standards
- Keyboard navigation must be fully functional
- Screen reader friendly text alternatives for all images and icons