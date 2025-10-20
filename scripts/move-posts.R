# Instructions for moving posts to new blog format
# old posts are in the _posts folder
# We need an R script that does this: 
# Lists all .md and html files in _posts
##
# For each file:
# Make a folder in the new posts directory ('posts/') that has the same name as the post name
# Copy the contents of each post file to the new directory, renaming the file index.md in the process
# Goes into each file and modifies the yaml header:
# Delete the 'layout:' line
# change 'category:' to 'categories:'
# Delete the first heading that occurs after the yaml header e.g. '# My post title'
# Then parse the rest of the file to find image references
# images in _posts will be in sub-folder for each post like this: 
# '![](/images/2021-10-01-lapply-karate/lapply-karate_files/figure-markdown_strict/unnamed-chunk-1-1.png)'
# or just loose images like this:
# '![](images/bigeye-tuna.jpg)' 
# we need to: 
# Remove the start '/images/' in each .md file
# copy the images from the images/ directory to each posts/post-name folder

# Script to move posts from _posts into posts/<slug>/index.md and copy images

# Dependencies: base R only
move_posts <- function(posts_dir = "_posts", images_dir = "images", out_dir = "posts") {
  files <- list.files(posts_dir, pattern = "\\.(md)$", full.names = TRUE)
  
  for (f in files) {
    bname <- basename(f)
    sans_ext <- tools::file_path_sans_ext(bname)
    # remove leading date if present: YYYY-MM-DD-
    newdir <- file.path(out_dir, sans_ext)
    dir.create(newdir, recursive = TRUE, showWarnings = FALSE)

    lines <- readLines(f, warn = FALSE)
    # locate YAML front matter (---)
    dashes <- which(trimws(lines) == "---")
    if (length(dashes) >= 2) {
      ystart <- dashes[1]; yend <- dashes[2]
      header_lines <- lines[(ystart + 1):(yend - 1)]
      # remove layout: line and rename category: -> categories:
      header_lines <- header_lines[!grepl("^\\s*layout\\s*:", header_lines, ignore.case = TRUE)]
      header_lines <- sub("^\\s*category\\s*:", "categories:", header_lines, ignore.case = TRUE)

      # add date if missing
      if (!any(grepl("^\\s*date\\s*:", header_lines, ignore.case = TRUE))) {
        # try to extract date from filename (YYYY-MM-DD at start); otherwise use file mtime
        fn_date <- sub("^(\\d{4}-\\d{2}-\\d{2}).*$", "\\1", sans_ext)
        if (grepl("^\\d{4}-\\d{2}-\\d{2}$", fn_date)) {
          dval <- as.Date(fn_date)
        } else {
          dval <- as.Date(file.info(f)$mtime)
        }
        lt <- as.POSIXlt(dval)
        date_formatted <- paste0(lt$mon + 1, "/", lt$mday, "/", lt$year + 1900)
        header_lines <- c(paste0("date: '", date_formatted, "'"), header_lines)
      }

      body_lines <- if (yend < length(lines)) lines[(yend + 1):length(lines)] else character(0)
      new_header <- c("---", header_lines, "---")
    } else {
      # no YAML -> create minimal YAML with date
      dval <- as.Date(file.info(f)$mtime)
      lt <- as.POSIXlt(dval)
      date_formatted <- paste0(lt$mon + 1, "/", lt$mday, "/", lt$year + 1900)
      header_lines <- c(paste0("date: '", date_formatted, "'"))
      new_header <- c("---", header_lines, "---")
      body_lines <- lines
    }

    # remove first heading that occurs after YAML (e.g. '# My post title')
    first_heading_idx <- which(grepl("^\\s*#\\s+", body_lines))
    if (length(first_heading_idx) > 0) {
      # drop the first heading line
      body_lines <- body_lines[-first_heading_idx[1]]
      # also drop a single following blank line if present
      if (length(body_lines) > 0 && body_lines[1] == "") body_lines <- body_lines[-1]
    }

    # work on image references: find any occurrences like /images/... or images/...
    body_text <- paste(body_lines, collapse = "\n")
    img_matches <- gregexpr("(/?images/[^)\\s'\"\\>]+)", body_text, perl = TRUE)
    found <- if (length(img_matches) && img_matches[[1]][1] != -1) {
      regmatches(body_text, img_matches)[[1]]
    } else character(0)

    if (length(found) > 0) {
      found_unique <- unique(found)
      for (orig in found_unique) {
        # rest = path after images/
        rest <- sub("^/?images/", "", orig)
        # replace occurrences in the body by the relative path (remove leading images/)
        # escape orig for literal replacement
        esc_orig <- gsub("([\\^$.|?*+(){}\\[\\]\\\\])", "\\\\\\1", orig)
        body_text <- gsub(esc_orig, rest, body_text, perl = TRUE)

        # copy file from images/<rest> to posts/<slug>/<rest> (preserve subdirs under post folder)
        src <- file.path(images_dir, rest)
        dest <- file.path(newdir, rest)
        dest_dir <- dirname(dest)
        if (!dir.exists(dest_dir)) dir.create(dest_dir, recursive = TRUE, showWarnings = FALSE)
        if (file.exists(src)) {
          file.copy(src, dest, overwrite = TRUE)
        } else {
          warning("Image not found, skipping copy: ", src, " (referenced in ", f, ")")
        }
      }
    }

    # assemble final content and write to index.md in newdir
    final_lines <- c(new_header, if (nchar(body_text) > 0) strsplit(body_text, "\n", fixed = TRUE)[[1]] else character(0))
    out_file <- file.path(newdir, "index.md")
    writeLines(final_lines, out_file)
    message("Wrote: ", out_file)
  }

  invisible(NULL)
}

move_posts()
