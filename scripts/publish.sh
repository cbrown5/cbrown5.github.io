#!/usr/bin/env bash
# Render the site, commit the post and its rendered output, and push to GitHub.
#
# GitHub Pages serves the docs/ directory on the main branch, so both the
# source (posts/) and the rendered output (docs/) have to be committed.
#
# By default only the posts you changed are re-rendered, which takes seconds
# instead of the several minutes a full-site render needs. Use -f when you
# change something site-wide (_quarto.yml, styles.css, the navbar) so the
# listing pages and links on every page get rebuilt.
#
# Usage:
#   scripts/publish.sh                    # render changed posts, msg "new post"
#   scripts/publish.sh "fix typo"         # custom commit message
#   scripts/publish.sh -f "new theme"     # full site render
#   scripts/publish.sh -n "new post"      # dry run: render and show what would commit
#   scripts/publish.sh -s "fix typo"      # skip render, just commit and push

set -euo pipefail

dry_run=false
skip_render=false
full_render=false

while getopts ":nsf" opt; do
  case "$opt" in
    n) dry_run=true ;;
    s) skip_render=true ;;
    f) full_render=true ;;
    *) echo "Usage: $0 [-n] [-s] [-f] [\"commit message\"]" >&2; exit 1 ;;
  esac
done
shift $((OPTIND - 1))

message="${1:-new post}"

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "$branch" != "main" ]]; then
  echo "Error: on branch '$branch', expected 'main'." >&2
  echo "GitHub Pages publishes from main -- switch branches first." >&2
  exit 1
fi

if ! $skip_render; then
  if $full_render; then
    echo "==> Rendering whole site with quarto"
    quarto render
  else
    # Render only the source files that git sees as changed. Listing pages and
    # the search index still come from the last full render, so run -f after
    # site-wide edits.
    # bash 3.2 (macOS default) has no mapfile, so read the list the portable way.
    changed=()
    while IFS= read -r file; do
      [[ -n "$file" ]] && changed+=("$file")
    done < <(
      {
        git diff --name-only -- '*.qmd' '*.md' '*.ipynb'
        git diff --cached --name-only -- '*.qmd' '*.md' '*.ipynb'
        git ls-files --others --exclude-standard -- '*.qmd' '*.md' '*.ipynb'
      } | grep -v '^readme\.md$' | sort -u
    )

    # Renders write into docs/, so a missing or empty docs/ means there is no
    # previous build to add to -- fall back to a full render rather than
    # committing a site with 99% of its pages missing.
    if [[ ! -d docs || -z "$(ls -A docs 2>/dev/null)" ]]; then
      echo "==> docs/ is empty, doing a full render to rebuild the site"
      quarto render
    elif [[ ${#changed[@]:-0} -eq 0 ]]; then
      echo "==> No changed .qmd/.md files to render"
    else
      echo "==> Rendering ${#changed[@]} changed file(s):"
      printf '    %s\n' "${changed[@]}"
      quarto render "${changed[@]}"
    fi
  fi
fi

# Guard against publishing a gutted site: docs/ holding almost nothing while
# git has hundreds of deletions staged means the render did not happen.
if [[ ! -d docs || -z "$(ls -A docs 2>/dev/null)" ]]; then
  echo "Error: docs/ is empty -- refusing to publish." >&2
  echo "Run 'quarto render' first, or use -f." >&2
  exit 1
fi

# The custom domain lives in docs/CNAME. "quarto render" cleans docs/, so if
# CNAME is not being copied in (see resources: in _quarto.yml) it silently
# disappears and www.seascapemodels.org starts returning 404 while
# cbrown5.github.io keeps working. Restore it rather than publishing a site
# that is about to go down.
if [[ -f CNAME && ! -f docs/CNAME ]]; then
  echo "==> docs/CNAME missing after render -- restoring from ./CNAME"
  cp CNAME docs/CNAME
fi

if [[ ! -s docs/CNAME ]]; then
  echo "Error: docs/CNAME is missing or empty -- refusing to publish." >&2
  echo "Publishing without it takes www.seascapemodels.org offline (404)." >&2
  echo "Expected contents: www.seascapemodels.org" >&2
  exit 1
fi

# Only stage publishing-related paths. Other edits in the working tree
# (scripts, config, drafts) are left alone so they don't get swept into
# a post commit by accident.
echo "==> Staging posts/ and docs/"
git add -A posts docs images data CNAME

deleted=$(git diff --cached --diff-filter=D --name-only -- docs | wc -l | tr -d ' ')
if [[ "$deleted" -gt 50 ]]; then
  echo "Error: this commit would delete $deleted files from docs/." >&2
  echo "That usually means the render did not produce the full site." >&2
  echo "Check 'git diff --cached --stat -- docs', then run with -f to rebuild." >&2
  git reset --quiet HEAD -- posts docs images data CNAME
  exit 1
fi

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
  git reset --quiet HEAD -- posts docs images data CNAME
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
