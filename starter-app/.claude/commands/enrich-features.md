# /enrich-features - Let Specialists Add Their Expertise

You are the orchestrator. You take basic Feature issues and have specialized agents enrich them with technical details, design considerations, and implementation guidance.

## Target: $ARGUMENTS

---

## What This Does

Takes Feature issues created by `/plan-features` and enriches them by consulting:

1. **Frontend Lead Agent** → UI/UX, components, animations, accessibility
2. **Backend Lead Agent** → Database schema, API design, security
3. **Design Agent** → Visual patterns, brand consistency, premium touches
4. **Product Owner** → Acceptance criteria, edge cases, user stories

---

## The Agent Chain

```
📦 Basic Feature Issue
       ↓
🎨 Frontend Lead
   "What components? What interactions? What accessibility?"
       ↓
⚙️ Backend Lead
   "What data? What API? What security?"
       ↓
🎯 Product Owner
   "What acceptance criteria? What edge cases?"
       ↓
✨ Enriched Feature Issue
```

---

## How Agents Work Together

### Skills Inform Agents

Agents automatically reference these skills:

| Agent | Uses Skills |
|-------|-------------|
| Frontend Lead | `component-patterns.md`, `design-principles.md`, `gsap-animation-patterns.md` |
| Backend Lead | (internal database/API patterns) |
| Design Agent | `design-principles.md`, `creative-inspiration.md` |
| Product Owner | `prompting-mastery.md` (for clear stories) |

### Agents Use Each Other's Output

```
Frontend Lead: "I need a user profile card with avatar"
       ↓
Backend Lead: "I'll add avatar_url to the users table"
       ↓
Product Owner: "Acceptance: Avatar must be < 5MB, square crop"
```

---

## Interactive Flow

### Step 1: Find Features to Enrich

```bash
gh issue list --label "feature" --json number,title,body
```

Show:
```
📦 Feature Issues Found:

#2: User Authentication
#3: Dashboard Layout
#4: Data Management
#5: Settings Page

Enrich all? Or specify: /enrich-features #3
```

---

### Step 2: Frontend Lead Analysis

For each feature, the Frontend Lead adds:

```markdown
## 🎨 Frontend Specification

### Components Needed
- `ProfileCard` - displays user info
- `AvatarUpload` - handles image selection
- `EditProfileModal` - form for editing

### Component Structure
```
ProfilePage/
├── ProfileHeader/
│   ├── Avatar.tsx
│   └── UserInfo.tsx
├── ProfileForm/
│   ├── BasicFields.tsx
│   └── SocialLinks.tsx
└── ProfileActions/
    └── SaveButton.tsx
```

### Interactions
- Hover: Avatar shows "Change" overlay
- Click: Opens file picker
- Drag: Supports drag-and-drop
- Save: Shows loading → success toast

### Animations (GSAP)
- Page enter: Stagger fade-in (0.1s delay each)
- Avatar hover: Scale 1.05, shadow increase
- Save success: Checkmark bounce

### Accessibility
- All images have alt text
- Form fields have labels
- Focus states visible
- Keyboard navigation works

### Responsive Behavior
- Desktop: Side-by-side layout
- Tablet: Stack with larger avatar
- Mobile: Full-width, compact form
```

---

### Step 3: Backend Lead Analysis

For each feature, the Backend Lead adds:

```markdown
## ⚙️ Backend Specification

### Database Schema

```sql
-- If using Supabase
ALTER TABLE users ADD COLUMN
  avatar_url TEXT,
  bio TEXT CHECK (char_length(bio) <= 160),
  twitter_handle TEXT,
  linkedin_url TEXT,
  github_username TEXT,
  updated_at TIMESTAMP DEFAULT NOW();
```

```typescript
// If using Convex
// convex/schema.ts
users: defineTable({
  clerkId: v.string(),
  avatarUrl: v.optional(v.string()),
  bio: v.optional(v.string()),
  socialLinks: v.optional(v.object({
    twitter: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
  })),
})
```

### API Endpoints

```typescript
// GET /api/profile/[userId]
// Returns: { user, profile }

// PATCH /api/profile
// Body: { bio, socialLinks }
// Returns: { success, profile }

// POST /api/profile/avatar
// Body: FormData with image
// Returns: { avatarUrl }
```

### Security Considerations
- [ ] Users can only edit their own profile
- [ ] Avatar upload validates file type (jpg, png, webp)
- [ ] Avatar size limited to 5MB
- [ ] Sanitize bio for XSS
- [ ] Rate limit profile updates

### Data Flow
```
Client → API Route → Auth Check → Database → Response
                  ↓
            Storage (avatar)
```
```

---

### Step 4: Product Owner Refinement

The Product Owner adds precise acceptance criteria:

```markdown
## ✅ Acceptance Criteria (Refined)

### Happy Path
- [ ] User can view their current profile
- [ ] User can edit bio (max 160 chars, counter shown)
- [ ] User can add/edit social links
- [ ] User can upload avatar (preview before save)
- [ ] Changes save with loading indicator
- [ ] Success toast appears on save

### Edge Cases
- [ ] Empty bio allowed (shows placeholder)
- [ ] Invalid URLs show validation error
- [ ] Avatar upload failure shows retry option
- [ ] Network error preserves draft state

### Out of Scope (this feature)
- Public profile page (separate feature)
- Profile deletion
- Username changes
```

---

### Step 5: Update GitHub Issue

Combine all agent contributions and update the issue:

```bash
gh issue edit [number] --body "[enriched content]"
```

Or add as comment:

```bash
gh issue comment [number] --body "## 🤖 Agent Enrichment

The following specialists reviewed this feature:

---

[Frontend Lead section]

---

[Backend Lead section]

---

[Product Owner refinement]

---

*Enriched with /enrich-features*"
```

---

## Output Format

```
✨ Features Enriched!

#2: User Authentication
    ├── 🎨 Frontend: 4 components, 3 animations
    ├── ⚙️ Backend: 2 tables, 3 endpoints
    └── ✅ Criteria: 8 acceptance items

#3: Dashboard Layout
    ├── 🎨 Frontend: 6 components, 5 animations
    ├── ⚙️ Backend: 1 query, realtime subscription
    └── ✅ Criteria: 6 acceptance items

📋 What Changed:
- Added component specifications
- Added database schemas
- Added API definitions
- Refined acceptance criteria
- Added security considerations

🚀 Ready to Build!
Use /work-on #2 to start with the enriched specification.
```

---

## When to Use Each Agent

| Question | Agent | Skill Referenced |
|----------|-------|------------------|
| "What should this look like?" | Frontend Lead | design-principles.md |
| "How should this animate?" | Frontend Lead | gsap-animation-patterns.md |
| "What's the component structure?" | Frontend Lead | component-patterns.md |
| "What data do I need?" | Backend Lead | (internal patterns) |
| "How do I secure this?" | Backend Lead | (security patterns) |
| "What are the edge cases?" | Product Owner | prompting-mastery.md |
| "Is this feature complete?" | Product Owner | (acceptance patterns) |

---

## The Full Workflow

```
1. /product-discovery    → Research what to build
       ↓
2. /epic-create          → Create the Epic goal
       ↓
3. /plan-features        → Break into Feature issues
       ↓
4. /enrich-features      → Agents add specifications ← YOU ARE HERE
       ↓
5. /work-on #X           → Build with full context
       ↓
6. /code-review          → Verify quality
       ↓
7. /ship                 → Deploy!
```

---

## Pro Tips

### Batch Enrichment
```
/enrich-features all
```
Enriches all feature issues at once.

### Single Feature
```
/enrich-features #3
```
Only enriches issue #3.

### Skip Agents
```
/enrich-features #3 --frontend-only
```
Only run Frontend Lead analysis.

---

*Part of the Claude Code Masterclass — Barcelona 2026*
