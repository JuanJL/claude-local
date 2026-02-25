---
name: form-patterns
description: React Hook Form + Zod validation patterns, Server Actions integration, multi-step wizards, and form best practices.
---

# Form Patterns with React Hook Form + Zod

## Standard Pattern

### 1. Define Shared Schema

```typescript
// lib/schemas/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10).max(1000),
});

// Single source of truth - infer type from schema
export type ContactFormData = z.infer<typeof contactSchema>;
```

### 2. Client Form Component

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} aria-invalid={!!errors.name} />
      {errors.name && <p role="alert">{errors.name.message}</p>}
    </form>
  );
}
```

### 3. Server Action

```typescript
'use server';

import { contactSchema } from '@/lib/schemas/contact';

export async function submitContact(data: ContactFormData) {
  // ALWAYS validate on server (never trust client)
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  // Process validated data...
  return { success: true };
}
```

## Common Zod Patterns

```typescript
// Optional with default
z.string().optional().default('')

// Transform input
z.string().transform((val) => val.trim().toLowerCase())

// Coerce types (form inputs are always strings)
z.coerce.number().min(0).max(100)

// Password confirmation
z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})
```

## Performance Optimization

```typescript
// BAD - Causes re-render on every change
const allValues = watch(); // Subscribes to everything

// GOOD - Only subscribe to what you need
const email = watch('email');

// BETTER - Use useWatch for isolated subscriptions
import { useWatch } from 'react-hook-form';
function EmailPreview({ control }) {
  const email = useWatch({ control, name: 'email' });
  return <p>Preview: {email}</p>;
}
```

## Multi-Step Wizard

```typescript
const [step, setStep] = useState(1);
const schemas = [step1Schema, step2Schema, step3Schema];

const methods = useForm({
  resolver: zodResolver(schemas[step - 1]),
  mode: 'onChange',
});

const nextStep = async () => {
  const valid = await methods.trigger();
  if (valid) setStep((s) => Math.min(s + 1, 3));
};
```

## Field Arrays

```typescript
import { useFieldArray } from 'react-hook-form';

const { fields, append, remove } = useFieldArray({
  control,
  name: 'members',
});

{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register(`members.${index}.name`)} />
    <button type="button" onClick={() => remove(index)}>Remove</button>
  </div>
))}
```

## Server Error Handling

```typescript
const onSubmit = async (data) => {
  const result = await serverAction(data);
  if (!result.success && result.errors) {
    Object.entries(result.errors).forEach(([field, messages]) => {
      setError(field as keyof FormData, {
        type: 'server',
        message: messages[0],
      });
    });
  }
};
```

## Best Practices

1. **Type Safety** - Zod schemas infer TypeScript types
2. **Performance** - Uncontrolled inputs by default
3. **Share Validation** - Same schema for client AND server
4. **Accessibility** - Proper labels, aria-invalid, role="alert"
