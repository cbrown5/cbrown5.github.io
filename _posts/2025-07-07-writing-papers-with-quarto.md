---
title: Writing scientific papers with quarto and AI assistants
layout: default
category: rstats
published: TRUE
---

# Writing scientific papers with quarto and AI assistants

Below is my suggested workflow for using quarto to write scientific papers. I'm currently switching to doing as many projects as possible with quarto rather than word for a few reasons:

1. Easier to manage document style 
2. Easier to manage references
3. Workflows that auto-update figures/tables when R code is re-run
4. Generative AI integration that is customizable. 

Point 3 is great, no more cut and pasting figures into word documents! 

Point 4 is the big one. I'm developing my own 'writing mentor' scripts for large language models. Using quarto lets me implement writing advice specific to science direclty into my manuscripts. 

Quarto is 'What You See is What you Make', meaning that you write special syntax for formatting. Once you are used to it, this is way easier way to manage styles than word. 

The downside is getting your (non-coding) collaborators to edit files in quarto. This is the biggest bottleneck to my use of quarto/markdown. Currently I send them word documents then have to manually integrate the feedback. Or I work in quarto until the near final stages, accepting comments only, then get them to edit the final manuscript. 

For instance, [I wrote most of this paper in markdown](https://conbio.onlinelibrary.wiley.com/doi/full/10.1111/cobi.13079?casa_token=zF8vihnFfcMAAAAA%3A9WlbXPCghdwS2WvyRqGjRqYPrng7q4_xPwZvu9K52p6gd_8lWs2qcgrehfg4ehAThC7ni32Ybr02iA) but had to go to word editing towards the end so I could get edits from my collaborator. Once you've progressed it in word, its hard to go back to markdown. 

Instructions below are high level. There are quite a few pieces of software you need to do this, so I've linked to tutorials for each below. 

### 1. Download and install an IDE

Download and install VScode. 

[Instructions online e.g. here](https://www.seascapemodels.org/rstats/2025/06/12/setting-up-vscode-r-genAI.html)

I'm using VScode because of its AI assistant integration. But you could also use positron if you have issues with VScode or want to use a Posit product rather than a Microsoft product. 

### 2. Get git and github

Install git on your computer. Optionally, get a github account and connect to that. Git does version control. Github lets you share that online. If your collaborators are github users then you can also share edits on documents this way. 

Git is also essential if you are using AI assistants. Sometimes they majorly stuff up your documents. So keeping back ups with git is essential. 

### 3. VScode extensions

Install these VScode extentions (or equivalents if you are using positron, note that many vscode extensions are also compatable with Positron)

- Quarto extension.
 
Open VSCode and click the four boxes 'extension' icon on the LHS then search and install the Quarto extension. 

Optional extensions: 
- R language extension ([can be tricky to connect VScode to R, suggest you web search for advice](https://www.seascapemodels.org/rstats/2025/06/12/setting-up-vscode-r-genAI.html))

### 4. Optional steps for AI integration 

This next step is optional. If you are using quarto or markdown its possible to get large-language models to help with many paper writing tasks (including the writing). This is a specialized area though and I've only given basic technical instructions here. Actually getting it to work well is another topic altogether and something I'm still developing... 

Get an API key with an LLM provider (e.g. [OpenRouter](https://openrouter.ai/sign-up), [OpenAI](https://platform.openai.com/api-keys), [Anthropic](https://console.anthropic.com/login?returnTo=%2F%3F)). You'll need a developer account to get an API key, rather than a regular account that you may already have (see links in last sentence). Buy some credits so you can use your API. 

Make sure you save your API key somewhere safe! You can usually only view them once on creation. You’ll need it for the workshop.

Get the Roo Code extension for vscode/positron. 

[Read the documents/watch the tutorials and learn how to use Roo Code](https://docs.roocode.com/)

You can now [create a custom mode](https://docs.roocode.com/features/custom-modes), e.g. a  'scientific writing mode' in Roo code. As of writing this requires clicking the mode selection button at the bottom of the Roo Code Pane, then click the Cog, then the `+` button to make a new mode. Then you need to write a 'Role Definition' and 'Custom instructions'. For tools I just use 'Read Files', 'Edit Files' and unclick the others (will save you money and tokens). 

This is the hard part that needs a lot of thought: 

In the custom instructions you should write detailed instructions on how to help an author with scientific writing. For instance, you might want to put some very strong instructions about not making up references. You might also put instructions about your particular writing style preferences. I'm working on a template, but am not yet ready to share it. 

See [Roo code documentation](https://docs.roocode.com/features/custom-modes) for more advice on custom modes. 

### 5. Using quarto

Take a tutorial and [learn how to use Quarto](https://quarto.org/docs/get-started/hello/rstudio.html). 

For academic paper writing the key things to understand from the Quarto tutorial are: 

- How to knit as word or pdf (pdf requires extra software installations)
- Formatting, headings, bold etc... 
- YAML frontmatter for styles, linking a bibliography and bibliography style
- How to insert images and/or code. 

**Note on AI integration** once you are using quarto and Roo Code you can simply ask Roo Code to do things in your document (like outline a paper template) by referencing the file (e.g. @myfile.qmd) in the prompt box. 

Whether this works well for you is another questions. Prompting well requires a lot of thought and practice. Its not simply going to write a paper for you. You have to give the AI assistant detailed, specific, instructions and lots of context. 

### 6. YAML front matter

The `YAML` controls how your qmd document is rendered. Here's an example of mine:

```
---
title: "The paper's title"
format: docx
editor: visual
bibliography: mybib.bib
csl: myjournal.csl
execute: 
  echo: false
  message: false
  warning: false
---
```

This goes at the top of your document. A few key points. 

`format` controls document type to render this as, here a word doc. 

`editor` controls how it is viewed in vscode. Options are `editor: visual` and `editor: source`. Visual looks more like a word doc, source looks more like markdown. You'll have to save and re-open the document for this to change. 

`bibliography` links to a bibtex file where your references are stored. 

`csl` links to a style guide for the bibliography. 

More on styles and references below. 

`execute` is controlling how R code is run and if the R code appears in the document. 


### 7. Rendering as a document

Use the short-cut key 'cmd-shift-K'/'cntrl-shft-k' (mac/windows) to preview your document. It will also create a rendered version in your current directory. 

Its helpful to set: `format: html` when you are writing the document, then you get a live preview in vscode. Use  `format: docx` when you want a word document. 

Its worth also learning the short-cut `cmd-shft-p'/'cntrl-shft-p', this brings up searchable actions for all extensions in vscode. The one you want is 'Quarto: preview' which does the same as the shortcut above. 

I tend to have minimal R code in my quarto manuscript. Or none at all (just reference .png files for figures). This keeps rendering quick. Also your document can get unweildy if there is a lot of text mixed in with R code. 

### 8. Word counts 

There are various word count extensions for vscode qmd and md documents. 

### 9. Document styles 

Getting a word document to follow a particular style is a bit fiddly. You need to set-up a template word document with styles the include that as a reference in your YAML. 

[See instructions here.](https://quarto.org/docs/output-formats/ms-word-templates.html)

### 10. Reference manager integration 

Quarto integrates with many different reference managers. [There's a good guide here](https://quarto.org/docs/authoring/citations.html). 

In brief you create a `.bib` file that has your references in it. This is then linked in the YAML. The manual way to manage this is just to create a `.bib` file and paste bibtext entries directly into it (available on most journal's pages as a citation format, as well as google scholar). 

e.g. the bibtext for R looks like this:

```
@Manual{Rlanguage,
    title = {R: A Language and Environment for Statistical Computing},
    author = {{R Core Team}},
    organization = {R Foundation for Statistical Computing},
    address = {Vienna, Austria},
    year = {2024},
    url = {https://www.R-project.org/},
  }
```
Then in quarto you just type `@` and a dropdown of all your references will appear. `@Manual{Rlanguage,` the Rlanguage bit is the CiteKey that will appear in the dropdown. So `@Rlanguage` will insert that reference into the bibliography and the citation at that place in the document.

You can streamline the process of gathering and managing references with a reference manager. 

My workflow in Zotero is as follows: 

- Open Zotero on my computer
- Go to journal webpage for paper
- Use zotero plugin to my browser to grab the citation and save it to a library
- Go to my quarto document in VScode 
- type `@` and a drop down of all references in all libraries on zotero appears. Pick the one I want. 
- Click the `OK` button which saves that reference into my local `.bib` file. 

For some reason (that does not seem to be documented in any quarto tutorials anywhere!) it will find any reference I have anywhere in zotero and then save that bibtex entry to my local `.bib` file, so it is now accessible for use in my quarto doc. This only works if I have zotero open and use `editor: visual` in the YAML. 

There are many other options however. 

### 11. Optional AI integration for reference management 

You can get AI assistants to help with referencing if you keep your notes on papers linked to your references. For instance, you could keep your notes on references in the bibtex field for `notes`. Alternatively you could create another quarto/markdown document that has a header for each citation tag along with its notes in a structured way: 

```
## Rlanguage 

### What it is

The R software for scientific computing. 

### Usage

Citation for the R software. Use this at least once in every paper where i've used R for statistics

## edgar2023continent

### What is it

Key paper that shows Australia is losing its marine biodiversity. 

### Usage

Cite this as evidence that Australia is losing coastal marine biodiversity and as evidence that climate change is causing marine biodiversity loss

```

It doesn't matter how you do this, so long as you follow a consistent structure. I've used the CiteKey as the main header for each reference entry. Then I've put in markdown sections about each paper and why I might wnat to cite it. Then you can get Roo Code to help with inserting references. 

Note that if you are using the `.bib` directly just be careful not to plagiarise! Roo Code might insert excerpts from the abstracts/titles directly into your written document, which is a no-no for publishing. 