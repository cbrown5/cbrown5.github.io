#!/usr/bin/env bash
# Create a new blog post directory with an index.md YAML template.
# The categories field is pre-filled with every category used across the
# site so far -- just delete the ones you don't want.
#
# Usage:
#   scripts/new-post.sh "My Post Title"

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 \"Post Title\"" >&2
  exit 1
fi

title="$1"

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
posts_dir="$repo_root/posts"

date_dir=$(date +%Y-%m-%d)
date_frontmatter=$(date +%m/%d/%Y)

slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')

post_dir="$posts_dir/${date_dir}-${slug}"

if [[ -e "$post_dir" ]]; then
  echo "Error: $post_dir already exists" >&2
  exit 1
fi

mkdir -p "$post_dir"

# All categories seen across existing posts (dedup'd, alphabetical).
# Regenerate with:
#   grep -rhoE '^categories: \[.*\]' posts/*/index.md \
#     | sed -E 's/^categories: \[(.*)\]/\1/' | tr ',;' '\n\n' \
#     | sed -E 's/^ *//; s/ *$//' | sort -u
categories_yaml="[coastal-wetlands, fisheries, genAI, modelling, phd-projects, research, research-skills, rstats]"

cat > "$post_dir/index.md" <<EOF
---
date: '${date_frontmatter}'
title: ${title}
categories: ${categories_yaml}
published: true
---

EOF

echo "Created $post_dir/index.md"
