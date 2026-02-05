#!/usr/bin/env Rscript

# Script to sub-sample blog posts and compile them into a single document
# for style analysis

library(fs)

# Set seed for reproducibility
set.seed(123)

# Get all index.md files in posts directory
posts_dir <- "posts"
all_posts <- dir_ls(posts_dir, recurse = TRUE, regexp = "index\\.(md|qmd)$")

cat("Found", length(all_posts), "blog posts\n")

# Sample approximately 20% of posts (minimum 10, maximum 20)
n_sample <- min(max(10, ceiling(length(all_posts) * 0.2)), 20)
sampled_posts <- sample(all_posts, n_sample)

cat("Sampling", n_sample, "posts\n")

# Create output file
output_file <- "data/sampled_blog_posts.md"
dir_create("data", recurse = TRUE)

# Write header
writeLines("# Sampled Blog Posts for Style Analysis\n", output_file)

# Read and compile sampled posts
for (post_path in sampled_posts) {
  cat("Processing:", post_path, "\n")
  
  # Extract post title from path
  post_dir <- dirname(post_path)
  post_name <- basename(post_dir)
  
  # Read post content
  content <- readLines(post_path, warn = FALSE)
  
  # Write to output file
  cat("\n\n---\n\n", file = output_file, append = TRUE)
  cat("## POST:", post_name, "\n", file = output_file, append = TRUE)
  cat("Path:", post_path, "\n\n", file = output_file, append = TRUE)
  cat(content, sep = "\n", file = output_file, append = TRUE)
}

cat("\nCompiled", n_sample, "posts to", output_file, "\n")
cat("Done!\n")
