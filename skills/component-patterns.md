---
name: component-patterns
description: React component architecture patterns, composition, and best practices for building reusable components.
---

# React Component Patterns

## Atomic Design Levels

```
Atoms (Button, Input, Badge, Icon)
    ↓ compose into
Molecules (FormField, CardHeader, NavItem)
    ↓ compose into
Organisms (LoginForm, ProductGrid, Header)
    ↓ compose into
Templates (DashboardLayout, AuthLayout)
```

## Component Composition Pattern

```typescript
// Compound component pattern
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Implementation
const Card = ({ children, className }) => (
  <div className={cn('card-base', className)}>{children}</div>
);

Card.Header = ({ children }) => (
  <div className="card-header">{children}</div>
);

Card.Body = ({ children }) => (
  <div className="card-body">{children}</div>
);

Card.Footer = ({ children }) => (
  <div className="card-footer">{children}</div>
);
```

## Props Interface Design

```typescript
// Good: Clear, composable, extensible
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string; // Allow style extension
  asChild?: boolean;  // Composition with Radix
}
```

## Controlled vs Uncontrolled

```typescript
// Uncontrolled (internal state)
<Input defaultValue="initial" />

// Controlled (external state)
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

## Render Props / Children as Function

```typescript
// When children need access to internal state
<Disclosure>
  {({ open }) => (
    <>
      <Disclosure.Button>
        {open ? 'Close' : 'Open'}
      </Disclosure.Button>
      <Disclosure.Panel>Content</Disclosure.Panel>
    </>
  )}
</Disclosure>
```

## Forwarding Refs

```typescript
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn('btn', className)} {...props} />
  )
);
Button.displayName = 'Button';
```

## Component Size Guidelines

| Metric | Guideline |
|--------|-----------|
| Lines | < 300 lines |
| Props | < 10 props |
| State variables | < 5 |
| useEffect hooks | < 3 |
| Nested depth | < 4 levels |

## When to Split

- File exceeds 300 lines
- Multiple unrelated state variables
- Prop drilling through 3+ levels
- Mixed concerns (data fetching + display)
- Multiple `useEffect` with different purposes

## When NOT to Abstract

- Only 2 occurrences (wait for third)
- Highly context-specific logic
- Simple one-liners
- Patterns still evolving

## Server vs Client Components

```typescript
// Server Component (default in App Router)
// - No 'use client'
// - Can use async/await directly
// - No hooks, no browser APIs

// Client Component
'use client';
// - Required for: useState, useEffect, event handlers, browser APIs
// - Keep as small as possible
// - Leaf nodes of component tree
```

## Performance Patterns

```typescript
// Memoization
const MemoizedChild = memo(ExpensiveChild);

// Callback memoization
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Value memoization
const computed = useMemo(() => expensiveCalc(data), [data]);
```
