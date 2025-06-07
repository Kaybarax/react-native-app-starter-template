# Git Workflow Guide

This document outlines the Git workflow for this project, including committing changes, pushing feature branches, creating Pull Requests, and managing branches.

## Using the Git Workflow Script

We've provided a script to guide you through the Git workflow process. To use it:

```bash
# Using pnpm
pnpm git-workflow

# Or directly with Node.js
node scripts/git-workflow.js
```

The script will interactively guide you through:
1. Committing changes
2. Pushing a feature branch to GitHub
3. Opening a Pull Request against the main branch
4. Returning to the main branch

## Manual Git Workflow Steps

If you prefer to run the commands manually, follow these steps:

### 1. Commit the changes

Stage the files you want to commit:
```bash
git add <file1> <file2>
# Or to add all changes:
git add .
```

Commit with a clear, descriptive message that references the task/feature:
```bash
git commit -m "TASK-123: Add feature description"
```

### 2. Push the feature branch to GitHub

Push with upstream tracking for referencing it later:
```bash
git push -u origin feature/<feature-name>
```

### 3. Open a Pull Request (PR) against the main branch

Use the GitHub CLI to create a PR without leaving the terminal:
```bash
gh pr create \
  --base main \
  --head feature/<feature-name> \
  --title "TASK-123: Add feature description" \
  --body "This PR implements xxxxxx.
- Adds `xxxxx.jsx` and related styles.
- Updates unit tests to cover xxxxxx.
- All tests are passing locally."
```

After running this, the PR will be created on GitHub and left open for review.

### 4. Return to the main branch

After opening the PR, switch back to the main branch:
```bash
git checkout main
```

## Best Practices

- **Branch Naming**: Use descriptive branch names with prefixes like `feature/`, `bugfix/`, `hotfix/`, etc.
- **Commit Messages**: Write clear, concise commit messages that explain what changes were made and why.
- **Pull Requests**: Include detailed descriptions in PRs, explaining what was changed, why, and how to test it.
- **Code Reviews**: Request reviews from team members and address feedback promptly.
- **Merge Strategy**: Use squash and merge to keep the main branch history clean.
- **Clean Up**: Delete feature branches after they've been merged.

## GitHub CLI Installation

If you don't have GitHub CLI installed, you can install it following the instructions at:
https://github.com/cli/cli#installation

After installation, authenticate with:
```bash
gh auth login
```
