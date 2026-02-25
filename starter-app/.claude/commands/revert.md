# /revert - Undo Recent Changes

You are helping a beginner safely revert their recent changes using git.

## Your Task

1. **First, check the git status:**
   ```bash
   git status
   ```

2. **Show the user what changed recently:**
   ```bash
   git log --oneline -5
   ```

3. **Present options based on the situation:**

### If there are UNCOMMITTED changes:
Ask the user:
> "You have uncommitted changes. What would you like to do?"
>
> **1. Discard all changes** - Go back to last commit (⚠️ Cannot be undone!)
> **2. Stash changes** - Save for later, go back to clean state
> **3. See what changed first** - Show me the differences

If they choose:
- **Option 1:** Run `git checkout -- .` (warn them first!)
- **Option 2:** Run `git stash push -m "Auto-stash: $(date +%Y-%m-%d_%H:%M)"`
- **Option 3:** Run `git diff` and explain in simple terms

### If all changes are COMMITTED:
Ask the user:
> "Your changes are committed. Which commit would you like to go back to?"
>
> Show the last 5 commits with `git log --oneline -5`
>
> **Explain each option:**
> - **Soft revert** - Keep the changes but uncommit them
> - **Hard revert** - Completely delete the changes (⚠️ Cannot be undone!)

If they choose soft: `git reset --soft HEAD~1`
If they choose hard: `git reset --hard HEAD~1` (warn them first!)

## Important Rules

1. **ALWAYS warn before destructive actions** - Anything with `--hard` or that deletes work
2. **Explain in plain English** - "This will delete your last hour of work" not "This resets HEAD"
3. **Offer stash as safe alternative** - Stash lets them recover later if they change their mind
4. **Celebrate small wins** - "Great! You're back to a clean state. Ready to try again?"

## Recovery Tips

If they accidentally deleted something, tell them:
- `git reflog` can sometimes recover lost commits
- `git stash list` shows saved stashes
- This is why we commit often!

## Teaching Moment

After helping them revert, briefly explain:
> "💡 **Pro tip:** Commit often! Think of commits as save points in a video game.
> The more save points you have, the less work you lose if something goes wrong."
