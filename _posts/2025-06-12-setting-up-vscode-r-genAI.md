---
title: Setting up VScode for R and generative AI tools
layout: default
category: rstats
published: TRUE
---

# Setting up VScode for R and generative AI tools

VScode has many extensions that let you create and run entire workflows via using prompts to a large language model. Its not widely used in the R community yet, but I expect it will be soon. You can create your entire R project, interpret the results and write a draft of your findings without writing any R code. 

Most of these tools are not available (as of writing) in RStudio, or have only limited functionality. So you need to use a different IDE (Integrated Development Environment) to run your R code. Here I'll explain how to set-up VSCode (a popular IDE) so you can use Cline. 

## Software requirements

To set up VScode for R and Cline, you'll need:

- R programming language 
- VScode text editor
- R extension for VScode
- Cline AI assistant extension for VScode

Note that if you computer is controlled centrally by an IT department, you may need to request admin access to install software, or email IT and ask for them to come and help you. 

## Install R

1. Go to the official R project website: https://www.r-project.org/
2. Click the "download R" link in the Getting Started section
3. Choose a CRAN mirror close to your location 
4. Download the appropriate R installer for your operating system
5. Run the installer and follow the prompts to complete installation

## R packages

1. Open R or RStudio 
2. Install language server `install.packages("languageserver")`
3. Install httpgd `install.packages("httpgd")` (this helps improve plots in VScode). NOTE that httpgd seems to often be removed from CRAN, then come back again, I'm not sure why... If you are having trouble you can try install from a different repo, see instructions here: https://community.r-multiverse.org/httpgd

## Install VScode

1. Go to the official VScode website: https://code.visualstudio.com/
2. Click the big blue "Download" button
3. Download the appropriate VScode installer for your operating system 
4. Run the installer and follow the prompts
5. Launch VScode once installation is complete

## Install R extension

1. Open VScode 
2. Open the Extensions view in VScode (click the boxes on left hand side)
3. Search for "R" in the extensions marketplace
4. Select the "R" extension published by REditorSupport
5. Click the "Install" button
6. Restart VScode after installation if prompted

[More info on vscode and R here](https://code.visualstudio.com/docs/languages/r)

## Connect R and VScode

1. Open a new terminal in VScode (Terminal > New Terminal)
2. Check that R is installed by running: `R --version`
3. Type `R` to open the R console in the terminal
4. Now open any R script in VS code (File > Open)
5. Run some R code to check that VS code can connect to R in the terminal. Use the shortcut Ctrl+Enter/Cmd+Enter or press the play button in the top right of the script editor.

If R is not found then open extensions (left hand side, boxes icon), filter by 'enabled' then click the R extension.
Now click the cog icon in the R extension and select 'settings' from the dropdown. 
Search for 'rpath'. Check that it has the correct path to R on your computer. 
You can find the path by opening a terminal and typing `which R` (on mac) or in a  windows terminal `where R`.

While you have the extension settings open search for 'httgp' and make sure  `Plot: Use Httpgd` is enabled. 

## Install gen AI extensions 

1. Open the Extensions view in VScode (Ctrl+Shift+X)
2. Search for the genAI assistant of your choice. I'm use Roo Code currently. Cline is another popular choice. 
3. Select the extension
4. Click the "Install" button
5. The extension icon (e.g. a Roo if using Roo Code) should appear in the VScode sidebar

## Set up extension in VScode

1. Click on the extension icon (e.g. a roo for roo code or robot for cline) on the left hand side 
2. Click the cog (if the settings don't open automatically)
3. Select your API provider and cut and paste the API key into the box (see next step if you don't have one).

## Get an API key

An API key is like a password that allows the AI assistant (e.g. roo code) to send your prompt to a large language model. Your key should be kept private. Usually you'll have to buy some credits. These allow  you to send prompts to the LLM. You'll be paying per prompt. 

Now you need to choose your large language model provider. I'm currently using OpenRouter and Anthropic, which have a diversity of models for generating text, code and reading images. Do some web searching to find out the latest info on providers and models.

You choose depends on what you want to do and your budget. Some providers offer a free tier. You'll need to web search for the latest info on this. 

You can get the links to any supported provider from your extension settings, just select the provider and then a link will appear to sign-up for that provider. 

Once you've chosen a provider, create an account and follow their instructions for creating an API key. You will probably also need to buy some credit to use the model. 

Note that if you already have a subscription account, e.g. for chatGPT, you will get need an API key to use Cline. This might be in a different section of your account settings. If you are using a subscription service you are probably paying monthly to use the provider's web app. We need the API key to be able to use the model directly via code. 

## You're all set

Now you're set and ready to start using Cline to code and write text. 

## Issues and tips

This is just a list of issues I've had and how I've solved them. 

*Plotting* If your R plots look weird (like tiny font), make sure httpgp is enabled. Go back to steps above and see how to do that. 

*Viewing data* There are various extensions for viewing csv and excel files. It is worth looking into these so that when you do `View(dat)` in R you get a nice table. Some also allow editing. 

*Getting help to install software* My computer is somewhat locked down by IT, so getting this set-up was a bit fiddly and required a few requests to IT to install software. 

*R markdown* There are options in the R extension settings for how to knit markdown. You may need to configure these if you want to knit markdown docs from VScode. If you are having trouble knitting markdown it may mean that the path to pandoc is not set correctly. [There is some helpful instructions here](https://stackoverflow.com/questions/60766646/need-help-assigning-global-settings-for-rstudios-pandoc-in-vscode-to-knit-pdf-d)

*R terminal crashes* If I run too much R code at once (like selecting a big block then running) the terminal tends to crash. Initially I see a little highlighted box saying 'PTY HOST'. Then I need to close all the terminals (with the bin icon) and start again. Try radian if this is a problem. You can also code run line-by-line or source whole scripts from the terminal (which works fine). I tried debugging this by increasing the buffer but to on avail. 

*Shortcut keys* (on osx) cmd-/ to comment uncomment lines. cmd-shift-p to open the command palette, cmd-b to open the file explorer, cmd-enter to run lines or selection of R code, cmd-shift-c to open terminal in new window, cntrl-shift-` to open a new terminal in vs code. 

## Installing radian (optional)

Radian is a terminal editor that is a bit nicer than the base R one. It does autocomplete in the terminal (like Rstudio does in the console), colours code/brackets etc... and allows multi-line editing in the terminal.

To set this up, install radian (you need python to do this). More [instructions here](https://github.com/randy3k/radian?tab=readme-ov-file).

Then go to the terminal and find the path where radian is installed (e.g. `which radian` on mac or `where radian` on windows). 

Now open your settings in VScode (cmd-,) and search for 'rterm' (stands for 'R Terminal', don't change the rpath which we set just before). Add the path to radian to the rterm setting. Also search for the setting 'R: Bracketed Paste' and make sure it is enabled.