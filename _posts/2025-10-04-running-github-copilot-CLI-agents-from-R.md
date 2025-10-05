---
title: Automating the Github Copilot Agent from the command line with Copilot CLI
layout: default
category: rstats
published: TRUE
---

# Automating the Github Copilot Agent from the command line with Copilot CLI

[Github Copilot CLI (Command Line Interface)](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) recently became available. It is an AI agent, meaning it can use tools autonomously in a loop. It has two modes: 

1. An interactive mode that is like a terminal version of the Copilot agent that runs in the chat window

2. A programmatic mode that can be run with shell scripts. 

The Copilot CLI is available with paid versions of github copilot. 

The programmatic mode interested me, because it allows you to write scripts that call github copilot agents. This means you could run replicate agents on the same problem, then gather there results for analysis. 

I, of course, want to do everything from the R program, because I'm not great with unix code or Python. [Once you've setup the copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli), its very easy to run it from R: 

```

copilot_cmd <- "copilot -p 'Set-up this project directory with a readme.md file, and directories for outputs, scripts, plots.' --allow-all-tools"

system(copilot_cmd)

```


This will run the agent autonomously in the current working directory of your R session. 

Now I wouldn't recommend using `--allow-all-tools` like this however. [There are important security considerations](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli#security-considerations). Like prompt injection attacks where an Agent goes on the web and gets tricked into doing something bad to your computer when it reads some malicious content. Likewise, agents can just stuff up and just delete or overwrite a bunch of files you wanted to keep. 

You do need to allow some tools however, otherwise you might as well run the agent in interactive mode (because you'll have to manually approve every tool use). This defeats the time-saving goal of running agents in a loop. 

Here's my current set-up: 

`copilot -p 'A prompt here' --allow-all-tools --deny-tool 'shell(cd)' --deny-tool 'shell(git)' --deny-tool 'shell(pwd)' --deny-tool 'fetch' --deny-tool 'extensions' --deny-tool 'websearch' --deny-tool 'githubRepo'"`

I allow all tools, then prevent tools related to changing working directory, accessing the web or viewing directory context. 

There is still some risk here. e.g., if you want it to run Rscripts you might want to include in your prompt something like 'Use `Rscript my-script.R` to run R scripts from the terminal.' The R scripts could include anything (including connecting to the web). 

Here's an example in action. I use sprintf to format the terminal command with the prompt, tools and sub-directory path. 

```
copilot_prompt <- "Set-up this project directory with a readme.md file, and directories for outputs, scripts, plots. Then create example data to illustrate a poisson GLM. Make prediction plots. Use `Rscript 'my-script.R'` to run R files. "

copilot_tools <- "--allow-all-tools --deny-tool 'shell(cd)' --deny-tool 'shell(git)' --deny-tool 'shell(pwd)' --deny-tool 'fetch' --deny-tool 'extensions' --deny-tool 'websearch' --deny-tool 'githubRepo'"

subdir_path <- "dir1"

 copilot_cmd <- sprintf(
    "cd '%s' && copilot -p '%s' %s",
    subdir_path,
    copilot_prompt,
    copilot_tools
  )

system(copilot_cmd)

```

From here it would be easy to create a loop over different subdirectory paths, and run a separate agent in each one. The advantage of `cd`ing into each path before the agent opens is that the agent can't then see context from other sub-directories. So you get independent agent runs.

You could use this to see how different prompts perform, or do complex prompt strategies like 'tree of thought'. In tree of thought you ask an agent to create the same thing many times, it will do it slightly differently each time. Then you aggregate the results and pick the most common or most accurate one. 

My one gripe is that Github have provided us with woeful documentation of what the tool names are. I'm guessing the tools are what you can see if you open the chat window, click 'Agent' mode, then click the tool symbol. 

I'd love to have some default tool sets that simplify the tool permissions. For instance a tool set that locks down all web access. 