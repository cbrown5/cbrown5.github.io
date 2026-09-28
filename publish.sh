#!/usr/bin/env bash
# Render the site, commit the post and its rendered output, and push to GitHub.
#
# GitHub Pages serves the docs/ directory on the main branch, so both the
# source (posts/) and the rendered output (docs/) have to be committed.
#
# Usage:
#   ./publish.sh                    # commit message defaults to "new post"
#   ./publish.sh "fix typo"         # custom commit message
#   ./publish.sh -n "new post"      # dry run: render and show what would commit
#   ./publish.sh -s "fix typo"      # skip render, just commit and push

set -euo pipefail

dry_run=false
skip_render=false

while getopts ":ns" opt; do
  case "$opt" in
    n) dry_run=true ;;
    s) skip_render=true ;;
    *) echo "Usage: $0 [-n] [-s] [\"commit message\"]" >&2; exit 1 ;;
  esac
done
shift $((OPTIND - 1))

message="${1:-new post}"

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$repo_root"

branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "$branch" != "main" ]]; then
  echo "Error: on branch '$branch', expected 'main'." >&2
  echo "GitHub Pages publishes from main -- switch branches first." >&2
  exit 1
fi

if ! $skip_render; then
  echo "==> Rendering site with quarto"
  quarto render
fi

# Only stage publishing-related paths. Other edits in the working tree
# (scripts, config, drafts) are left alone so they don't get swept into
# a post commit by accident.
echo "==> Staging posts/ and docs/"
git add -A posts docs images data

if git diff --cached --quiet; then
  echo "Nothing to publish -- posts/ and docs/ are unchanged."
  exit 0
fi

echo
echo "Files to be committed:"
git diff --cached --name-status
echo

if $dry_run; then
  echo "Dry run: unstaging and stopping before commit."
  git reset --quiet HEAD -- posts docs images data
  exit 0
fi

# Warn about unrelated changes rather than silently committing or dropping them.
if ! git diff --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
  echo "Note: other uncommitted changes exist outside posts/ and docs/;"
  echo "      they are NOT part of this commit."
  echo
fi

echo "==> Committing: $message"
git commit -m "$message"

echo "==> Pushing to origin/$branch"
git push origin "$branch"

echo
echo "Published. GitHub Pages usually updates within a minute or two:"
echo "  https://www.seascapemodels.org"
