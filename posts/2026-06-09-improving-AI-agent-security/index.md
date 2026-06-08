---
title: "Improved cybersecurity for AI agents"
layout: default
categories: [genAI; research-skills]
published: true
date: '06/09/2026'
---

Agents are most useful if you can set and forget, so they automatically approve their own requests. Automatic approval is variously called ‘dangerously skip permissions’ or YOLO mode (you only live once) for good reason. Allowing an AI agent to automatically run commands on your computer comes with many risks. 

So its great to see some of the major AI Agent providers finally providing sandboxes for their agents.

Sandboxes are programming environments that are isolated from the rest of the computer. They provide a higher level of security against malicious or misaligned actions taken by AI agents. 

For instance, Claude Code has been known to [accidentally wipe all the files on a user's computer](https://www.reddit.com/r/ClaudeAI/comments/1pgxckk/claude_cli_deleted_my_entire_home_directory_wiped/). If your agent is accessing content from the web, it could also be vulnerable to a prompt injection attack, where an attacker provides it with instructions to send private data. 

Sandboxes can limit the blast radius, by putting strict limits on what files/directories the agent can access, what actions it can take and what webpages it can access. 

Unfortunately these sandboxes are in early stages of development. 

I spent some time trying the new [Anthropic Sandbox Runtime](https://github.com/anthropic-experimental/sandbox-runtime), but.... totally failed to get it working. It seems it is still very beta stage and there are many issues open currently on its github page describing the problems I was having. 

Anthropic and Github Copilot also have bash sandboxes (e.g. [Anthropic's docs](https://code.claude.com/docs/en/sandboxing)). Both worked fine for me. 

However, the documentation is difficult to interpret (if you aren't a software developer), and I spent a lot of time trying to ge

The bash sandboxes allow you to put restraints on what bash commands are run. For instance, you can limit the ability of the agent to read files outside of a project's directory. 

This system has its limitations though. For instance, an agent could still access private files through Python code. 

I also looked into the Github Copilot sandbox, which was only released this month (June 2026). It is not very well documented but seems to also be a bash sandbox. 

Sandboxes are a welcome development, but there is still some work to go on making these user friendly, accessible and secure to a range of different issues. 
