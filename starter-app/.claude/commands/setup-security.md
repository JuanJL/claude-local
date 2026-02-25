# /setup-security - Add Pre-Commit Security Scanning

You are helping a student set up automatic security scanning before every git commit.

## What This Does

Installs **Husky** (git hooks) + **secretlint** (secret scanner) to:
- 🔒 Block commits that contain API keys, passwords, or tokens
- 🚫 Prevent .env files from being committed
- ⚠️ Warn about hardcoded credentials
- 🛡️ Protect against accidentally pushing secrets to GitHub

## Step 1: Install Dependencies

```bash
# Install Husky for git hooks
npm install -D husky

# Install secretlint for secret detection
npm install -D secretlint @secretlint/secretlint-rule-preset-recommend

# Initialize Husky
npx husky init
```

Tell the user:
> "Setting up security scanning... This adds a safety net before every commit!"

---

## Step 2: Create Secretlint Config

Create `.secretlintrc.json` in the project root:

```json
{
  "rules": [
    {
      "id": "@secretlint/secretlint-rule-preset-recommend"
    }
  ]
}
```

---

## Step 3: Create Pre-Commit Hook

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔒 Running security scan..."

# Run secretlint on staged files
npx secretlint --secretlintignore .gitignore $(git diff --cached --name-only --diff-filter=ACMR)

if [ $? -ne 0 ]; then
  echo ""
  echo "🔴 COMMIT BLOCKED — Secrets detected!"
  echo ""
  echo "To fix:"
  echo "  1. Remove the secret from the file"
  echo "  2. Add the secret to .env.local instead"
  echo "  3. Use process.env.YOUR_SECRET in your code"
  echo ""
  echo "If this is a false positive, you can:"
  echo "  - Add to .secretlintignore"
  echo "  - Or run: git commit --no-verify (NOT recommended)"
  echo ""
  exit 1
fi

echo "✅ Security scan passed!"
```

Make it executable:
```bash
chmod +x .husky/pre-commit
```

---

## Step 4: Add npm Script

Add to `package.json`:

```json
{
  "scripts": {
    "security:check": "secretlint '**/*'",
    "prepare": "husky"
  }
}
```

---

## Step 5: Create .secretlintignore

Create `.secretlintignore` to skip certain files:

```
# Dependencies
node_modules/

# Build output
.next/
dist/
build/

# Test fixtures (may contain fake secrets)
**/*.test.ts
**/*.spec.ts
__tests__/

# Lock files
package-lock.json
yarn.lock
pnpm-lock.yaml

# This file itself
.secretlintrc.json
```

---

## Step 6: Test It!

Try committing a file with a fake secret:

```bash
# Create a test file with a fake API key
echo 'const API_KEY = "sk_live_1234567890abcdef"' > test-secret.js

# Try to commit it
git add test-secret.js
git commit -m "test commit"

# Should be BLOCKED! 🔴
```

Then clean up:
```bash
rm test-secret.js
```

---

## What Gets Detected

| Secret Type | Pattern Example |
|-------------|-----------------|
| Stripe Keys | `sk_live_*`, `sk_test_*`, `pk_live_*` |
| AWS Keys | `AKIA*` (20 chars) |
| GitHub Tokens | `ghp_*`, `gho_*`, `github_pat_*` |
| Slack Tokens | `xoxb-*`, `xoxp-*` |
| Private Keys | `-----BEGIN RSA PRIVATE KEY-----` |
| Generic Secrets | `password = "..."`, `secret = "..."` |
| Connection Strings | `mongodb://user:pass@...` |

---

## If a Commit is Blocked

Tell the user:

> "Your commit was blocked because a secret was detected. Here's how to fix it:
>
> 1. **Remove the secret** from the file
> 2. **Create `.env.local`** and add: `YOUR_SECRET=actual_value`
> 3. **In your code**, use: `process.env.YOUR_SECRET`
> 4. **Make sure `.env.local`** is in `.gitignore`
>
> Then try committing again!"

---

## Summary

After setup, every commit will:
1. ✅ Scan all staged files for secrets
2. 🔴 Block if secrets found
3. ✅ Allow if clean

**This runs automatically** — students don't need to remember to check!

---

*Part of the Claude Code Masterclass — Barcelona 2026*
