---
date: '10/02/2026'
title: Major update to VS Code R extension
categories: [rstats]
published: true
---

I was doing some analysis work with R today (don’t get to do that very often anymore) and R wasn’t playing with VS Code nicely. 

Turns out there has recently been a major update to the VS Code R editor extension. 

So if you are having issues, check out the [Extensions page for setup instructions](https://github.com/REditorSupport/vscode-R).

## Key changes: 

- New `jgd` package to improve the plotting experience. This replaces the `httpgd` package that was previously used to improve the plotting experience. 

- The `r.term.path`  setting is now called `r.consolePath` (that’s the setting where you point VS Code to the R program)

- Option to install `afr` to use as the console for R (instead of the base console or Radian). 

- It was easy to fix once I realized what was wrong. See the extension page for instructions.

I’m not yet sure if its better yet, `afr` does seem a bit smoother and faster than `radian` was. 

I have also been trying out Positron lately, Posit's VS Code clone. In general that seems much easier for R based work than VS Code always has been. It plays nicely with R out of the box. Unlike VS Code, which requires lots of additional settings and extension installs. 

I switched from RStudio to VS Code as my primary IDE a few years ago. I also teach my AI data analysis workshops in VS Code. Though there is a fair bit of time spent in each workshop just helping people connect VS Code to R. At the time Posit just weren't keeping up with the AI coding tools at that time. But they seem to be catching up again with Positron. 

I've switched my teaching to recommend Positron. So if this extension update is giving you headaches, give Positron a go. 