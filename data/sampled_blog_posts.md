# Sampled Blog Posts for Style Analysis



---

## POST: 2022-09-04-insights-NGO-science-symposium 
Path: posts/2022-09-04-insights-NGO-science-symposium/index.md 

---
date: '9/4/2022'
title: How to work with non-governmental organisations
categories: research-skills
published: TRUE
---

I attended a symposium for scientists and non-governmental organisations at the Centre for Biodiversity and Conservation Science at the University of Queensland recently.

The aim of the symposium was to promote more collaboration between NGOs and conservation scientists. Here are some of the key lessons I took home.

One researcher told me she wish she'd had such a symposium when she started her PhD. It would have given her the know-how needed to reach out to NGOs and start collaborating as part of her PhD.

So here are the key lessons.

1. **Look up NGOs in your area and read about their science priorities.** Many, like [Birdlife Australia](https://birdlife.org.au/) (who presented at there) publish their science priorities.

2. **Get in touch with NGO staff.** If you know someone who knows someone at an NGO that is great. Start by asking your supervisor. If not, try just emailing the contact on the NGOs webpage and say you are a scientist looking to align your research for more impact.

3. **Ask what their science needs are.** If you can get a meeting with  the NGO staff, great. But don't waste your meeting pitching your ideas to them. Listen first. Find out what their problems and issues are. They probably have science needs outlined already. For instance, the presenter from The Wilderness Society pitched several ideas they'd love to have science on for their advocacy work. These included analyses of national threats to Australian fauna and attribution of extinction risk to specific industries.

4. **Align your science with their priorities.** The next step would be to come up with a research plan. Make sure it aligns with their priorities. If you can get time with the NGO, pitch the plan back to them (its ok to pitch now that you've listened to what their needs are). If you can't, you may still like to go ahead and do the research in the hope they pick it up later. For instance, Birdlife Aus has aligned their science awards to their priorities.

4. **Be mindful of timelines.** NGO timelines are often fast moving. Their priorities can shift rapidly as funding or politics change. This can be a challenge for research projects.

For PhD students I wouldn't recommend projects that have strict deliverables to a deadline. For instance, they may need to deliver results in a timely manner to be able to influence major new government policies. Or they may be looking to contract someone to prepare a report. PhDs need time to learn and this often takes longer than NGO timelines.

That being said, NGOs often have many research ideas they'd like to do, but which their work isn't directly dependent on. These kinds of projects can be great for students. Just be mindful that if the research drags on too long (like years) the NGO may shift their priorities and you'll lose engagement.  

So aim for projects that need 6 months to a year to complete. Talk to your supervisor about projecting time needed, as we all tend to underestimate that.

5. **NGOs are often under-resourced.** Which means they probably won't have bucket loads of funding for your project, but they do love help where they can get it. If you are a PhD student with time and capacity to share, then they'll probably love that. So don't be shy about reaching out.

Just be sure to plan your engagement with NGOs with a mentor or supervisor. You want to make sure you align the project with your skillset and feasible timelines for providing results.

Working with NGOs has been one of the most rewarding parts of my career. As an academic (and as a student) I have the luxury of getting to spend some of my time on passion projects. Sometimes the 'work for free' has then lead onto funded work.

The research I've done with NGOs has often lead to real world impact. These stories have become a core part of my career story that has built my reputation, and which I also look back on as the most rewarding experiences of my career.


---

## POST: 2025-10-04-running-github-copilot-CLI-agents-from-R 
Path: posts/2025-10-04-running-github-copilot-CLI-agents-from-R/index.md 

---
date: '10/4/2025'
title: Automating the Github Copilot Agent from the command line with Copilot CLI
categories: [rstats, genAI]
published: TRUE
---

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


---

## POST: 2024-02-08-secret-recipe-to-writing-papers 
Path: posts/2024-02-08-secret-recipe-to-writing-papers/index.md 

---
date: '2/8/2024'
title: Chris' secret recipe to writing papers quickly 
categories: research-skills
published: TRUE
---

1. Work with good collaborators that you know well and who you can rely on. 

2. Have clearly defined roles for yourself and collaborators. 

3. Don't have too many collaborators (three or less or have none). There's lots of time in coordinating with many people.

3. (b) Sub-point - non-research collaborators (e.g. industry/NGOs) can also take a lot of time, but see points 1 and 2. 

4. Have a clearly defined plan. 

5. Have a relatively simple question to address, one that can be clearly defined as 1-3 aims/hypotheses and the methods need to be clear and well established (and things you or your collaborotors can easily do)

6. Don't get too hung on how much work it takes to write 'The Paper'. The amount of time it takes is hugely variable and there is no minimum time. 

7. 80/20 rule - 20% of the effort for 80% of the results. 

8. Have some skills. Be decent at writing. Have some methodology skills (e.g. modelling or field work skills) that are well known to you and you will rely on for this study. Flip side is don't expect to write a paper if you are still learning to write scientifically (e.g. early in your PhD). 

9. Work with a system you know well, e.g. a study system, lab system or type of modelling/data for analysis. 

10. In general reviews and perspectives take 10x times longer than you think they will. A lot of thought goes into word crafting (though sometimes they can be really quick). 

11. Don't get too hung up on what journal it 'HAS' to go to. Sometimes you start a paper thinking it has Nature potential, but if it turns out it doesn't then just get it done (see steps 6 and 7!) and submit it to a disiplinary journal. 





---

## POST: 2016-03-06-how-long-to-write-grant 
Path: posts/2016-03-06-how-long-to-write-grant/index.md 

---
date: '3/6/2016'
categories: research
title: "How long does it take to write major national grant?"
published: true  
---

### How long does it take to write for major national grants?

During "grant season" (~Dec - March in Aus) you might find your colleagues bemoan all the work they have to do writing grants, or turning down meetings because they are too busy. I certainly felt that way writing for a major [Australian Research Council grant](http://www.arc.gov.au) this year.

But, I wondered how much time does it take to write for a national grant scheme. Since October I have been logging the hours I spend on different projects, like a consultant, in an effort to gain data on project time and improve my time-management. I added up the time I spent writing for an ARC grant, where I was lead author, and the answer surprised me:

#### *69 hours and 30 minutes or nearly 12 full working days (at least^1^)*  

<div class = "image_caption">
<img src ="ARC_DP2017.png" alt="timebarchart" class="image_float"/>
<p>
Time spent by days writing for a grant </a>
</p>
</div>

A few caveats on my estimate, which is certainly an under-estimate. It counts writing, formal (organised) meetings with co-authors, budgeting, some reading and all the administrative stuff. The time doesn't count emails, reading papers, or time thinking while bike-riding, walking the pram, trying to go to sleep etc...

The time also doesn't count time from my colleagues. The grant includes significant input from 3 collaborators and numerous reviews from non-collaborators and research office staff. Also, I started records in November, so prep work before hand (including an internal pre-review) isn't counted here.  

Some further context for this grant. There is likely to be considerable variability for different people and projects. I am an early career researcher, so maybe my time is slower than more experience researchers, or better writers. However, I did put in for an [ARC grant](/research/2015/11/03/decra.html) last year so I had a head start on some of the sections about your CV and research contributions. I am also familiar with the ARC format, something I spent a considerable amount of time figuring out the first time I put in for a grant.  

My grant is also modelling focussed, so that probably saved me some time in the budgeting step, as that could get very tricky if there was lots of field work to budget for.

<div class = "image_caption">
<img src ="ARC-submitted.png" alt="timebarchart" class="image_float"/>
<p>
The screen you see on completion of 12 days solid work </a>
</p>
</div>

### Maybe 12 days underestimates the mental effort?

12 days doesn't sound like as much as I was expecting. However, maybe the raw numbers under-estimate the mental effort that goes into grant writing. I probably have at most 3-4 hours maximal mental effort per day, which makes the grant look more like a month's solid work, using the best hours of the day.

I will be interested to hear how much time other people ([tweet me](http://www.twitter.com/bluecology)) spend on grants and whether my numbers sound reasonable.  

As a footnote, the message you get when you finally hit submit is rather disappointing (see image). Consider that it takes [~33 hours of climbing to ascend Everest from base camp](http://www.mounteverest.net/expguide/route.htm) and you will be rewarded with a view from the top of the world.  Or for a computing analogy, if you complete a computer game you are usually rewarded with a video and the solution to the game's story. It takes only about [13 hours](http://howlongtobeat.com/game.php?id=10025) to complete some of the best selling computer games. Obviously the final rewarded is receiving the grant and successfully investigating your ideas, but that is a highly uncertain outcome (~15% success rate for ARCs) that is years down the track. It would be nice if online grant submissions unlocked some kind congratulations page.  


1. Note added 8/03/2016. I have discussed this post with several colleagues all of whom suggests it takes much longer than 70 hours to write a major grant. As I have not included time for reading and thinking in my estimate, it is likely that time would add considerably to the time taken to complete the grant.  


---

## POST: 2025-07-07-writing-papers-with-quarto 
Path: posts/2025-07-07-writing-papers-with-quarto/index.md 

---
date: '7/7/2025'
title: Writing scientific papers with quarto and AI assistants
categories: [rstats, research-skills]
published: TRUE
---

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


---

## POST: 2023-06-15-bayesian-sem-tute 
Path: posts/2023-06-15-bayesian-sem-tute/index.md 

---
date: '6/15/2023'
title: Bayesian structural equation model tutorial
categories: rstats
published: TRUE
---

Structural equation modelling (SEM) is a tool for exploring
relationships among multiple variables. `lavaan` and `piecewiseSEM` are
two of the most widely used and accessible packages for latent variable
modelling in R. Both use frequentist methods.

It is also possible to develop SEMs in a Bayesian framework. There are advantages
to using the Bayesian framework. So here I provide a brief tutorial on creating
a simple Bayesian SEM with the stan program.

The [blavaan](https://ecmerkle.github.io/blavaan/) package creates and fits SEMs in a Bayesian framework, but using similar syntax to lavaan. But it can help your understanding to code your own models and give you greater flexibility (though blavaan can do a lot!). 

The tutorial is based on our [recent
study](https://www.sciencedirect.com/science/article/pii/S0048969723002851)
that sought to understand relationships among indicators of catchment
and fishery condition. If you find the SEM methods described here
useful, please cite the paper.

Code for that study, including a more complicated SEM, is available [on
the study’s github
repo](https://github.com/cbrown5/ecological-condition-latent-model).

I won’t cover much SEM theory or background on Bayesian modelling. For
more info on those topics:

-   A introduction to SEM theory, check out [Jon Lefcheck’s online
    book](https://jslefche.github.io/sem_book/)

-   [rstan documentation and
    tutorials](https://mc-stan.org/users/documentation/tutorials)

-   Learn Bayesian stats with the The Statistical Rethinking
    [book](https://xcelab.net/rm/statistical-rethinking/) and [Youtube
    series](https://www.youtube.com/watch?v=cclUd_HoRlo)

## Advantages of Bayesian SEM

The key advantage is the flexibility Bayesian methods give you. We used
Bayesian methods because we wanted to combine a state-space model and a
SEM. The state-space model was a timeseries model of fish population
change through time.

The population model was linked to a latent (unobserved) variable that
represented cathcment condition. Other observed indicators of catchment
condition were pasture biomass and vegetation greenness.

Other applications of Bayesian SEM could be to model non-gaussian data,
incorporating spatial and temporal models into a SEM, or modelling
missing data.

Now we’ll step through a broad overview of how to get started with
Bayesian SEM. We’ll use the data from my paper as an example.

[Download the data](https://github.com/cbrown5/ecological-condition-latent-model/blob/main/Data%20for%20Barramundi%20model.csv)

## Define your DAG (directed acyclical graph)

SEMs need to be directed acyclical graphs. The DAG defines the proposed
relationships among variables. It is the starting point for writing the
math that describes the model.

We’ll define a simple DAG that aligns to a factor analysis. We’ll model
relationships between streamflow, fish (barramundi) catch per unit
effort (CPUE) and vegetation greenness (NDVI) for a catchment in
Northern Australia:

    library(dagitty)
    library(ggdag)
    dag1 <- dagify(CPUE ~ LV, 
                   NDVI ~ LV,
                   SF ~ LV)
    ggdag(dag1)

![](2023-06-15-bayesian-sem-tute/unnamed-chunk-1-1.png)

Our observed indicators are SF (streamflow), NDVI (veg greeness) and
CPUE (catch per unit effort). LV is a latent variable that represents
correlations among the observed variables.

This system is strongly driven by rainfall and river flow, so we expect
positive correlations among flow, fish and vegetation.

## Define the stan model

Now we have a DAG, we need to write equations to represent the proposed
relationships. We also need to specify the priors.

Here I’m assuming normal distributions for each variable (logging for
CPUE). Priors are weakly informative to encourage convergence.

I won’t include the full stan model definition below, just the model
component. [Click here to download the full model file you’ll need to
run this](https://github.com/cbrown5/ecological-condition-latent-model/blob/main/simple-model.stan).

Here’s the core of the model:

    cfa_mod <- "model{ 

      //
      //Ecological condition 
      //
      nu ~ std_normal(); 
      //Note variance fixed to 1 by using standard normal here
      
      //Priors for indiator params 
      a_NDVI ~ normal(0,10);
      a_CPUE~ normal(0,10);
      a_SF ~ normal(0,10);
      
      beta_NDVI ~ normal(0,1);
      beta_CPUE ~ normal(0,1);
      beta_SF ~ exponential(1.8);
      //Note use of exponential() for streamflow to ensure positive
      // only values. Helps convergence. 
      
      //Observation errors
      sigma_CPUE ~  exponential(0.1);
      sigma_NDVI ~  exponential(0.1);
      sigma_SF ~  exponential(0.1);
      
      // Observations
      lnCPUE ~ normal(lnCPUE_hat, sigma_CPUE);
      NDVI ~ normal(NDVI_hat, sigma_NDVI);
      SF ~ normal(SF_hat, sigma_SF);
    }"

Read in the full model file and compile it for stan:

    library(rstan)

    mod <- stan_model(file = "simple-model.stan", verbose = FALSE)


At this point there is usually a fair bit of debugging and fixing of
typos until the model parses correctly.

## Consider identifiability

Identifiability is a common issue in SEM. Roughly it means that some of
the free parameters you are trying to estimate are interchangeable.
Therefore, even with an infinite amount of data you would be unable to
identify their values precisely (e.g. one could be high the other low or
vice-versa).

A basic example would be the model:

`y = a*x + b*x + c`

parameters `a` and `b` are interchangeable.

Identifiability is a bit different in Bayesian models, because we have
priors. For instance, in the model above, if we set a very strong priors
on `a` and/or `b` (based on theory for instance) we may still be able to
estimate their values precisely.

In a complex SEM issues of identifiability can be much harder to
distinguish than the example above, as we will see.

Identifiability issues in a Bayesian will manifest as poor convergence
of MCMC chains. You will see high Rhats. Digger deeper you may find some
parameters have bimodal posterior distributions (e.g. if you do a
histogram of all samples for a parameter). You will also find strong
correlations in parameter estimates. For instance in the model above
parameters `a` and `b` would be strongly correlated (near 1).

You may be able to get convergence if you run your model for really long
chains, however, it will be more efficient to try and fix the model. It
will also mean your parameters are easier to interpret.

If you have identifiability issues, parameters that have the property
above are a good place to start to try to fix issues in your SEM
formulation.

In the stsan code above I’ve made two key decisions to facilitate
convergence.

First, I’ve fixed the latent standard deviation to 1 to ensure
identifiability. You could also have the latent’s SD free, but then fix
one of the regression slopes to 1.

Second, I’ve set the prior for the streamflow beta (regression slope on
the latent variable) to be an exponential. This ensures it has only
positive values.

For example, imagine that streamflow, NDVI and CPUE are all positively
correlated with each other. Then their beta’s all need to be the same
sign. However, they could equally well be all positive, or all negative.
The meaning is the same, since the latent variable has not units.

If we run the model where all betas are sampled from normal priors, then
we would hit issues with parameter switching. We see strong bimodality
in the posteriors for the betas, because they can equally well be all
positive or all negative. This slows converngence significantly.

So instead I’ve used an `exponential(1.8)` prior for the streamflow
beta. This peg the sign to whatever streamflow is doing. So if
streamflow is positive and the other covariates are positively
associated with it, they will all have positive betas.

I chose `1.8` so that my prior has similar 90th percentile as a normal
distribution. e.g. compare `qnorm(0.9, 0,1)` to `qexp(0.9, 1.8)` both
have 90th percentiles at about 1.28.

## Do some data cleaning

Now let’s get the data and just clean it up a bit.

    dat <- read.csv("Data for Barramundi model.csv")

First calculate the log of the CPUE:

    dat$lnCPUE <- log(dat$Barramundicatch/dat$Effort)

Some variables are missing data. In our paper I modelled missing data,
but here we will just use years with complete data for simplicity:

    dat2 <- subset(dat, Year %in% 1995:2015)

Now we will standardize and centre each variable, makes it easier to set
priors and interpret the regression coefficients (AKA loadings). We’ll
also define a list to use in the stan model

    datstan <- with(dat2, {
      x = list(N = nrow(dat2),
           SF = (Streamflow - mean(Streamflow))/sd(Streamflow), 
           NDVI = (NDVI - mean(NDVI))/sd(NDVI), 
           lnCPUE = (lnCPUE - mean(lnCPUE))/sd(lnCPUE)
      )})

## Fit the model

Now we are ready to fit the stan model:

    # options(mc.cores = 1) #parallel::detectCores())

    fitm1 <- sampling(mod, data = datstan,
                   iter=8000, chains=3, thin = 10)

## Investigate convergence

For this task I recommend launching the shiny tool for exploring stan
fits. Can be done like this:

    shinystan::launch_shinystan(fitm1)

If convergence is poor (e.g. higher Rhat values or strong
autocorrelation in the chains) a good place to start in a SEM is to
check for parameter non-identifiability, as described above. This means
some parameters are interchangeable (or nearly so).

A handy way to explore for the above issues is to click the “Explore”
tab in the shiny, then do bivariate plots of parameters against each
other.

The histograms for this model fit look like they’ve converged on a
unimodal distribution:

    samps <- extract(fitm1)

    par(mfrow = c(1,3))
    hist(samps$beta_NDVI)
    hist(samps$beta_CPUE)
    hist(samps$beta_SF)

![](2023-06-15-bayesian-sem-tute/unnamed-chunk-11-1.png)

## Explore model results

For this model the regression slopes (AKA factor loadings) are of
primary interest. They tell us how the different indicators are related
to each other.

Make a dataframe of the samples of interest:

    fit_dat <- with(samps, data.frame(beta_SF, beta_NDVI, beta_CPUE))

Now use tidyr to reshape for easy plotting:

    library(tidyr)
    library(dplyr)
    fittidy <- fit_dat %>% 
      mutate(sample = 1:nrow(fit_dat)) %>%
      pivot_longer(-sample, names_to = "Parameter", values_to = "value")

Now use ggplot to plot posterior distributions

    library(ggplot2)
    theme_set(theme_classic())
    ggplot(fittidy) + 
      aes(x = value, y = Parameter, fill = Parameter) + 
      geom_vline(xintercept = 0) + 
      geom_violin()

![](2023-06-15-bayesian-sem-tute/unnamed-chunk-14-1.png)

All have positive values, indicating all indicators are positively
associated with each other.

## Check model assumptions

We need to check assumptions like any regular model. This means checking
distributions are appropriate to model the data, same as you would for
any GLM.

In a SEM we also have to think about d-separation. In short, this means
checking for residual correlations between a our variables that aren’t
explicitly part of the model.

[There’s formal tests of d-separation for Bayesian
models](https://esajournals.onlinelibrary.wiley.com/doi/full/10.1890/11-1899.1),
but [many authors have just used visual checks of residual
correlations](https://esajournals.onlinelibrary.wiley.com/doi/abs/10.1890/15-0833.1).

There are many resources on d-separation, [here’s one
paper](https://esajournals.onlinelibrary.wiley.com/doi/full/10.1890/08-1034.1).
Books by Judea Pearl and Bill Shipley are also good ways to learn.

Our data here also has the additional complexity of being time-series.
Our model above assumes d-separation of a variable from itself through
time, so this is also something we could check (by testing for
autocorrelation in the residuals).

I won’t show all these tests in this brief tute, but here’s a start on
getting residuals. Just subtract the predictions from the observations,
e.g. for NDVI:

    med <- apply(samps$NDVI_pred, 2, median)
    resids <- datstan$NDVI - med

One way to check the normal distribution is appropriate for the NDVI
data is to do a quantile-quantile plot of the residuals:

    qqnorm(resids)
    qqline(resids)

![](2023-06-15-bayesian-sem-tute/unnamed-chunk-16-1.png)

We want to see the points fall close to straight on the line, which in
general they do.

We can also check for non-linearities by plotting observations vs
predictions:

    plot(med, datstan$NDVI)

![](2023-06-15-bayesian-sem-tute/unnamed-chunk-17-1.png)

Of course this is Bayesian analysis, so we could also create credible
intervals for the residuals.

If you do the above for CPUE you’ll see there is clearly strong
autocorrelation. This is one reason I used a [state-space model in the
paper](https://www.sciencedirect.com/science/article/pii/S0048969723002851).

## Graph model results

Let’s make a plot of the result. First we’ll get median effect sizes
(just the median of the chains for each parameter)

    meds <- round(apply(fit_dat, 2, median),2)

Now we can make the plot with labels on the arrows. Most of this code is
just setting up the position of things:

    dag1 <- dagify(CPUE ~ LV, 
                   NDVI ~ LV,
                   SF ~ LV)
    coords <- list(x = c(CPUE = -1, NDVI = 0, SF = 1, LV = 0),
                   y = c(CPUE = 1, NDVI = 1, SF = 1, LV = 0))
    coordinates(dag1) <- coords
    ggdag(dag1) +
      annotate("text", x = c(-0.6, 0.1, 0.6), y = c(0.5, 0.5, 0.5),
               label = meds) +
      lims(y = c(-0.5, 1.5))

![](2023-06-15-bayesian-sem-tute/unnamed-chunk-19-1.png) As its a
Bayesian analysis we could also add CIs or probability that an effect is
>0. They could be calculated like this.

e.g. upper 95th quantile:

    round(apply(fit_dat, 2, quantile, 0.975),2)

    ##   beta_SF beta_NDVI beta_CPUE 
    ##      1.27      1.21      1.13

Or probability effect is greater than zero:

    nsamps <- nrow(fit_dat)
    round(apply(fit_dat, 2, function(x){sum(x>0)/nsamps}),2)

    ##   beta_SF beta_NDVI beta_CPUE 
    ##      1.00      1.00      0.98

## Model predictions

Our model also predicts the mean for each variable. Let’s just look at
CPUE. In this matrix rows are samples are columns are years. So we can
summarize each column to get the prediction with intervals for that
year.

Here is the median with 90th credible intervals and data shown as
points:

    ndvi_pred <- data.frame(year = dat2$Year, 
                            ndvi_obs = datstan$NDVI, 
                            med = apply(samps$NDVI_pred, 2, median),
                            lwr = apply(samps$NDVI_pred, 2, quantile, 0.05),
                            upr = apply(samps$NDVI_pred, 2, quantile, 0.95))

    ggplot(ndvi_pred) + 
      aes(x = year, y = med) +
      geom_line() + 
      geom_ribbon(aes(ymin = lwr, ymax =upr), color = NA, 
                     fill = "black", alpha = 0.5) +
      geom_point(aes(y = ndvi_obs)) +
      labs(x = "Year", y = "NDVI (normalized)")

![](2023-06-15-bayesian-sem-tute/unnamed-chunk-22-1.png)

## Conclusion

Bayesian modelling is a powerful framework for building SEMs. It gives
you greater flexibility in developing models than the standard SEM R
packages.

You can use all types of non-gaussian distributions to model data, as
well as build in other model types like non-linear or state-space
models.

The cost is an extra overhead to learn the theory of SEM and the methods
for Bayesian modelling. But if you have a background in one or the
other, and some programming ability, then it won’t be too hard.

I learned Bayesian modelling well before I started on SEMs. When I came
to SEM (through the lavaan package) I was overwhelmed and confused by
jargon and interpretation of greek letters that have a special meaning
to SEM specialists. I found it much easier to gain a high level
understanding of SEM issues (like d-seperation) then work in the
Bayesian framework to build models.


---

## POST: 2017-06-21-bayesian-smoothing 
Path: posts/2017-06-21-bayesian-smoothing/index.md 

---
date: '6/21/2017'
title: Smoothing a time-series with a Bayesian model
categories: rstats
published: TRUE
---

Recently I looked at [fitting a smoother to a
time-series](/rstats/2017/06/18/estimating-popn-decline.html) using
Bayesian modelling.
Now I will look at how you can control the smoothness by using more or
less informative priors on the precision (1/variance) of the random
effect.

We will use the [same dataset as the last
post](/rstats/2017/06/18/estimating-popn-decline.html).

To control the priors for an [R-INLA](http://www.r-inla.org/) model, we
use the `hyper` argument (not hyperactive, but hyper-parameters):

    library(INLA)
    f3 <- y ~ 1 + f(z, model = "rw1", scale.model = TRUE,
    hyper = list(theta = list(prior="pc.prec", param=c(1,0.01))))

We can control the level of smoothing through `param=c(theta1,0.01)`. A
value of 1 (theta1) is a reasonable starting point ([based on the INLA
documentation](http://www.math.ntnu.no/inla/r-inla.org/doc/latent/rw1.pdf)).
Lower values will result in a smoother fit.

The `pc.param` stands for Penalized complexity parameters (you could
also use a `loggamma` prior here). My understanding of [penalized
complexity priors](https://arxiv.org/abs/1403.4630) is that they shrink
the parameter estimate towards a 'base-model' that is less flexible. In
this case, we are shrinking the standard deviation (AKA the flexibility)
of the random walk (ie how much sequential data points deviate from each
other) towards zero. Ultimately if we set theta1 near zero the smoother
will be a straight line.

So let's fit three models with theta1 varying and see how it affects the
smoothness of the fit:

    f1 <- y ~ 1 + f(z, model = "rw1", scale.model = TRUE,
    hyper = list(theta = list(prior="pc.prec", param=c(0.01,0.01))))

    f2 <- y ~ 1 + f(z, model = "rw1", scale.model = TRUE,
    hyper = list(theta = list(prior="pc.prec", param=c(0.05,0.01))))

    f3 <- y ~ 1 + f(z, model = "rw1", scale.model = TRUE,
    hyper = list(theta = list(prior="pc.prec", param=c(1,0.01))))

    m1 <- inla(f1,family = "nbinomial", data  =  dat,
        control.predictor = list(compute = TRUE, link = 1)
    )

    m2 <- inla(f2,family = "nbinomial", data  =  dat,
        control.predictor = list(compute = TRUE, link = 1)
    )

    m3 <- inla(f3,family = "nbinomial", data  =  dat,
        control.predictor = list(compute = TRUE, link = 1)
    )

Here are the resulting fits:

    plot(dat$z, dat$y, col = 'grey80', type = 'l', lwd = 1, xlab = "years", ylab = "Abundance", las = 1)

    lines(dat$z, m1$summary.fitted.values$mean, col = "skyblue", lwd = 2)
    lines(dat$z, m2$summary.fitted.values$mean, col = "steelblue", lwd = 2)
    lines(dat$z, m3$summary.fitted.values$mean, col = "darkblue", lwd = 2)

    legend('topright', legend = c("data", "theta1 = 0.01", "theta1 = 0.05", "theta1 = 1"),
          lty = 1, col = c("grey80", "skyblue", "steelblue", "darkblue"), lwd = 2)

![](bayesian-smoothing_files/fitted-models-vary-theta-1.png)

The exact value to use for theta1 will vary depending on our data. If
the data are more informative (e.g. a longer time-series) we will have
to use a smaller value to create a smoother fit.

    dat2 <- list(y = dat$y[1:40], z = 1:40)
    m4 <- inla(f2,family = "nbinomial", data  =  dat2,
        control.predictor = list(compute = TRUE, link = 1)
    )
    plot(dat$z, dat$y, col = 'grey80', type = 'l', lwd = 1, xlab = "years", ylab = "Abundance", las = 1)

    lines(dat$z, m2$summary.fitted.values$mean, col = "skyblue", lwd = 2)
    lines(dat2$z, m4$summary.fitted.values$mean, col = "steelblue", lwd = 2)

    legend('topright', legend = c("data", "theta1 = 0.05, 50 data points", "theta1 = 0.05, 40 data points"),
          lty = 1, col = c("grey80", "skyblue", "steelblue"), lwd = 2)

![](bayesian-smoothing_files/fitted-models-vary-n-1.png)

And that is pretty much it. I haven't read how to choose the 'optimal'
value of theta. Pragmatically, one could do it with cross validation or
perhaps a model selection measure. However, that seems philosophically incorrect, because it is a 'prior'. There doesn't seem to be much guidance in the literature about how to choose priors for smoothing. Message me on
[Twitter](https://twitter.com/bluecology/) if you have seen an example
of doing this.

It is amazing to see how the use of priors in statistics has changed
since I first learned about Bayesian statistics. It used to be that you
would use informative priors only if you had strong prior beliefs about
a parameter estimate, such as from expert elicitation, or repeat
experiments. If you didn't have strong prior beleifs, then the view (at
least amongst many ecologists) was that it was most cautious to use a
highly uninformative prior like the good old Winbugs gamma(0.01, 0.01)
prior that was used for precision parameters.

Now the experts are encouraging us to use weakly informative priors,
even when little prior evidence is available. The case being that too
broad a prior can slow computations and result in ridiculous results.
Consider the broad gamma(0.01, 0.01) prior: it amounts to giving equal
weight to a standard deviation of 1 as it does to an SD of 10000. The
end result is that this 'uninformative prior' can bias your estimates of
the SD to be too high.

As demonstrated here, another nice feature of informative priors is they
can be used to control 'shrinkage'. Here by varying theta1 we could
shrink our model fit towards a base case model (e.g. a null hypothesis)
that had no temporal variation.

If you are interested to learn more, it is worth reading at least the
Introduction of [Simpson et al. Penalized Complexity Priors
pub](https://arxiv.org/abs/1403.4630). Other good general guidance can
be found on the [STAN
wiki](https://github.com/stan-dev/stan/wiki/Prior-Choice-Recommendations).

There is clearly a lot more fun we can have by playing around with
priors. I anticipate that applied scientists, like my ecological
colleagues, will soon start paying much more attention to prior choice.


---

## POST: 2020-04-21-a-case-against-pipes 
Path: posts/2020-04-21-a-case-against-pipes/index.md 

---
date: '4/21/2020'
title: A case against pipes in R and what to do instead
categories: rstats
published: TRUE
---

A case against pipes in R and what to do instead
================================================

Pipes (`%>%`) are great for improving readibility of lengthy data
processing scripts, but I'm beggining to learn they have some weaknesses
when it comes to large and complex data processing.

We are running a number of projects at the moment that require managing
and wrangling large and complex datasets. We have numerous scripts we
use to document our workflow and the data wrangling steps. This has
turned out to be very helpful, because when we identify bugs in the end
product, we can go back and fix them.

But I'm starting to see a pattern. Most of the really insidious bugs
occur in sections of code that use `dplyr` tools and pipes. These are
always the types of bugs that don't throw an error, so you get a result,
it just turns out to be wrong. They are the worst kind of bugs. And hard
to detect and fix.

So we are now moving away from using pipes in complex scripts. For
simple scripts I intend to keep using them, they are so fast and easy.
Here's what we're trying instead.

The problem with pipes
----------------------

So here's some made up data that mimics the kind of fish survey data we
often have:

    sites <- data.frame(site = letters[1:5],
                        temp = rnorm(5, 25, 2), stringsAsFactors = FALSE)
    dat <- expand.grid(site = letters[1:5],
                       transect = 1:4)
    dat$abundance <- rpois(20, 11)

So we have site level data with a covariate, `temp` and transect level
data with fish counts.

Now say we have an error and one of our sites has capitals, instead of
lower case, so lets introduce that bug:

    sites$site[1] <- "A"

Now if I join and summarize them, I will lose one of the sites

    library(dplyr)

    ## Warning: package 'dplyr' was built under R version 3.6.3

    ##
    ## Attaching package: 'dplyr'

    ## The following objects are masked from 'package:stats':
    ##
    ##     filter, lag

    ## The following objects are masked from 'package:base':
    ##
    ##     intersect, setdiff, setequal, union

    dat %>%
      inner_join(sites) %>%
      group_by(site) %>%
      summarize(mean(abundance))

    ## Joining, by = "site"

    ## Warning: Column `site` joining factor and character vector, coercing into
    ## character vector

    ## # A tibble: 4 x 2
    ##   site  `mean(abundance)`
    ##   <chr>             <dbl>
    ## 1 b                   9  
    ## 2 c                  12  
    ## 3 d                  12.5
    ## 4 e                  12.8

Obvious enough here, but issues like that are much harder to detect in
very large datasets.

Unit testing
------------

The solution of course is to code in 'unit tests' to make sure each
operations are doing what you expect. For small data you can just look,
but for big datasets its not so easy.

For long pipes with multiple steps we'd usually do this debugging and
testing interactively. So I'd write the first line (the join) save the
output to a new variable, check it worked ok, then move on to write the
next step of the pipe.

Now here's the catch. In complex project its common to change the data
that goes into your pipe (in this case `dat` or `sites` dataframes). For
instance, in our current project new data comes in all the time.

New data presents new issues. So a pipe that worked the first time may
no longer work the second time.

This is why it is crucial to have unit tests **built into your code**.

There are lots of sophisticated R packages for unit testing, including
ones that work with pipes. But given many of us are just learning tools
like `dplyr` its not wise to add extra tools. So here I'll show some
simple unit tests with base R.

Unit testing an example
-----------------------

Joins often case problems, due to mis-matching (e.g. if site names are
spelt differently in different datasets, which is a very common human
data entry error!).

So its wise to check the join has worked. Here's some examples:

    dat2 <- inner_join(dat, sites)

    ## Joining, by = "site"

    ## Warning: Column `site` joining factor and character vector, coercing into
    ## character vector

Now compare number of rows:

    nrow(dat2)

    ## [1] 16

    nrow(dat)

    ## [1] 20

Obviously the join has lost data in this case.

We can do better though with a complex script. We'd like to have an
error if the data length changes. We can do this:

    nrow(dat2) == nrow(dat)

    ## [1] FALSE

Which tells us TRUE/FALSE if the condition is met. To get an error use
`stopifnot`

    stopifnot(nrow(dat2) == nrow(dat))

Common unit tests for data wrangling
------------------------------------

Let's start with the basics. No special packages, just simple logical queries.

Of the top of my head here are a few of my most commonly used unit tests
To check the number of sites has stayed the same, use
`length(unique(`... to get the number of unique cases:

    length(unique(dat$site))

    ## [1] 5

    length(unique(dat2$site))

    ## [1] 4

    length(unique(dat$site)) == length(unique(dat2$site))

    ## [1] FALSE

Or if we wanted to compare the `site` and `dat` dataframes:

    unique(sites$site) %in% unique(dat$site)

    ## [1] FALSE  TRUE  TRUE  TRUE  TRUE

The `%in%` just means are the sites names in `sites` matching the site
names in `dat`? (We can use `stopifnot` here too, with multiple
TRUE/FALSE values).

How many don't match?

    sum(!(unique(sites$site) %in% unique(dat$site)))

    ## [1] 1

The `!` is a logical 'not' (not FALSE = TRUE, so we are counting
non-matches).

Which one doesn't match?

    sites$site[!unique(sites$site) %in% unique(dat$site)]

    ## [1] "A"

Here's another insidious bug caused by joins, when our covariate
dataframe has duplicate site entries:

    sites <- data.frame(site = c(letters[1:5], "a"),
                        temp = c(rnorm(5, 25, 2), 11), stringsAsFactors = FALSE)
    sites

    ##   site     temp
    ## 1    a 19.30061
    ## 2    b 23.76530
    ## 3    c 24.89018
    ## 4    d 25.16386
    ## 5    e 23.83092
    ## 6    a 11.00000

Now we have two sites called `a` with different values of `temp`. Check
out the join:

    dat2 <- inner_join(dat, sites)

    ## Joining, by = "site"

    ## Warning: Column `site` joining factor and character vector, coercing into
    ## character vector

    nrow(dat)

    ## [1] 20

    nrow(dat2)

    ## [1] 24

So its added rows, ie made up data we didn't have. Why? Well the join
duplicated all the site `a` values for both values of temp:

    filter(dat2, site == "a")

    ##   site transect abundance     temp
    ## 1    a        1        10 19.30061
    ## 2    a        1        10 11.00000
    ## 3    a        2        11 19.30061
    ## 4    a        2        11 11.00000
    ## 5    a        3        12 19.30061
    ## 6    a        3        12 11.00000
    ## 7    a        4         9 19.30061
    ## 8    a        4         9 11.00000

No watch this, we can really go wrong when we summarize:

    dat2 %>%
      group_by(site) %>%
      summarize(sum(abundance))

    ## # A tibble: 5 x 2
    ##   site  `sum(abundance)`
    ##   <chr>            <int>
    ## 1 a                   84
    ## 2 b                   36
    ## 3 c                   48
    ## 4 d                   50
    ## 5 e                   51

It looks like site `a` has twice as many fish as it really does (78,
when it should have 39). So imagine you had a `site` dataframe you were
happy worked, then your collaborator sent you a new one to use, but it
had duplicate rows. If you didn't have the unit test to check your join
in place, you may never know about this doubling of data error.

We could check for this by checking for the number of transects e.g.

    dat_ntrans <- dat2 %>% group_by(site) %>% summarize(n = n())
    dat_ntrans

    ## # A tibble: 5 x 2
    ##   site      n
    ##   <chr> <int>
    ## 1 a         8
    ## 2 b         4
    ## 3 c         4
    ## 4 d         4
    ## 5 e         4

    dat_ntrans$n != 4

    ## [1]  TRUE FALSE FALSE FALSE FALSE

(Yes I used a pipe this time, but a simple one).

More sophisticated method for unit testing
-------------------------------------------      

(This part is new as of 2020-04-22)

So once this post got shared I got a lot of feedback. A lot of lovely people wrote me with the timeless rstats cliche "there's a package for that" (I say that being an abuser of that cliche myself).

So if you really want to get into unit testing and take it to the next level here's a few of the tips I received.

Roger Bivand wrote to tell me about [validate package](https://cran.r-project.org/web/packages/validate/vignettes/introduction.html), which comes with a [whole book in pdf format](https://cran.r-project.org/doc/contrib/de_Jonge+van_der_Loo-Introduction_to_data_cleaning_with_R.pdf) on data cleaning (that is now on my 'lockdown' reading list).

Another popular one is [testthat](https://cran.r-project.org/web/packages/testthat/index.html), which I received many recommendations for (haven't used it myself).

Ed Hagen shared [tidylog](https://github.com/elbersb/tidylog/) that conveniently prints messages telling you what join and so on have done did (pretty low overhead on learning this one!). Might be good package to install if you are just learning dplyr too, as it reveals more about what is going on.  

David Aja and others messaged me about [point blank](https://github.com/rich-iannone/pointblank), which integrates unit testing into pipes.

These are all great solutions for the advanced R user. My challenge with them is that students get worn down by hearing "there's another R package for that". So best solution is take it step-by-step, get some simple unit testing going first. If that's not enough to get the job done, then start using these tools, once you're comfortable with the basics.

Going forward
-------------

So I plan on keeping up pipes, but just for simple things. For complex
scripts we'll break the pipes with more intermediate tests and do more
unit testing. It'll save a lot of pain down the road.


---

## POST: 2017-03-29-locator-to-clipboard 
Path: posts/2017-03-29-locator-to-clipboard/index.md 

---
date: '3/29/2017'
categories: rstats
title: "A fast method to add annotations to a plot"
published: true
---

A fast method to add annotations to a plot
---------------------------------------------

Making professional looking plots in R can be fiddly. One task that I often spend ages doing is manually finding coordinates to add labels.
Wouldn't it be nice if you could just send the coordinates directly to your text editor?

I did some searching and found on [stackoverflow](http://stackoverflow.com/questions/14547069/how-to-write-from-r-to-the-clipboard-on-a-mac) that you can send R objects to the clipboard. So here is my solution using that trick.

<div class = "image_caption">
<img src ="locator-plot.png" alt="" class="image_float"/>
<p> Adding text to the right position on a plot can be a real hassle. Here I show how to use a simple function to click on a figurea and put coordinates onto your clipboard. </p>
</div>


You can get R to send data directly to the clipboard using the `pipe` command. Below is a little function I wrote that takes coordinates from `locator()` and sends them to your clipboard. Then you can just hit cmd-v to paste them into your text editor (nb I understand this may need some slight modifications to work on linux or windows, I use OSX):



    loccopy <- function(n, digits = 2){
        data <- locator(n)
        data <- round(cbind(data$x, data$y), digits)
        clip <- pipe("pbcopy", "w")
        write.table(data, file = clip, col.names = F, row.names = F)
        close(clip)
    }

Let's test it out:

    set.seed(42)
    plot(runif(100))
    loccopy(1)

Now hit cmd-v (or equivalent on your OS).

    69.23 0.84

Let's add a label using our fast method for coordinates:

    text(69.23, 0.84, "Unusual data point", pos =4, offset = 0)

The `pos=4` and `offset=0` ensures that the text goes directly to the right of our coordinates.

That's it. Hope it helps speed up your workflow.


---

## POST: 2026-01-04-marine-seascape-restoration 
Path: posts/2026-01-04-marine-seascape-restoration/index.md 

---
date: '01/04/2026'
title: Saving ocean animals means restoring multiple habitats at the same time
categories: [research]
published: true
---

The sub-tidal (underwater) habitats of our coasts are rarely uniform. They are often mosiacs of many different types of habitats, and that's the way animals like it. 

For instance, the Great Barrier Reef is famous for being a living organism you can see from space. But there is a lot more to the reef than coral reefs. The reef ecosystem is an enormous mosaic of corals, sand, seagrass, sponges, mangroves and many other habitat habitats. 

In fact, the area of seagrass meadows - which is just what it sounds like, underwater grass - in the Great Barrier Reef is greater than its area of coral reefs. 

Many other coastal habitats are similarly patchy. Kelp forests are bordered by sand and seagrass, mangroves are interconnected with saltmarshes and coral reefs and seagrass is often patchy meadows interspersed by sand, rather than a continuous block. 

Mosaics of habitats are like shops around a village town square. A village with just lolly shops would suit my children, but not many others. A village with cafes, flower shops, gift stores, stationary stores and others would draw in lots of different customers. 

Similarly, diverse coastal habitat arrangements tend to support a greater diversity of animals than uniform blocks. 

As animals move around these networks of habitats they also help make connections among them. 

![](seagrass-giantkelp1.jpeg)

**Image:** Boundaries of different habitats, here a giant kelp grows next to a seagrass meadow near my home in Tasmania, are often popular with ocean animals. Photo by Chris Brown. 

There are numerous examples. For example, one species of fish that rests on coral reefs during the day, swims to nearby areas to feed at night. In doing so, they transport nutrients (in the form of fish wee and poo) to areas nearby the reefs, benefiting other organisms. 

## Denmark's coastal habitat mosaics

We are getting much better at successfully restoring some coastal habitats and seeing some great wins for ocean animals. But for this to really work for animals we need to restore mosaics of habitats, not just one habitat at time. 

That's why what they've done with habitat restoration in Denmark is really unique. 

In Vejle Fjord government and scientists have been working together to restore seagrass, boulder reefs and mussel beds since 2019. Historically these habitats were abundant. But agricultural run-off and extraction of boulders has converted the system to one dominated by muddy sand (soft sediments). 

To date, the restoration of the three habitats is extensive, about 22 football (soccer) fields worth of habitat. 

This is a large area compared to your typical coastal restoration project. But, what is unique here is the restoration of multiple habitats in the same area. 

![](vejle-ford-restoration.jpeg)

**Image** Map of the restoration site showing the different habitats that have been restored from [Sievers et al. 2025](https://doi.org/10.1002/eap.70163). 

## Studying the how restoration of seascapes benefits animals 

The mosiac of restoration sites created the opportunity to study how animals would respond to the new seascape. 

My colleague, Michael Sievers, worked with the Danish restoration science tea to count fish, prawns and sea snails in the seagrass and nearby bare sediment. Their surveys of animals included areas of remaining natural seagrass, as well as seagrass that had been planted in the restoration efforts. 

When Michael invited me to help with the data analysis I jumped at the chance. I specialize in statistics and data analysis, and the way the surveys were done here meant there was potential to ask some really interesting questions about restoration ecology. 

Michael wanted to know how if the animals did better when seagrass restoration was near to the mussel and boulder reefs that had also been restored. 

The surveys were done in restored seagrass at different distances from the boulder and mussel reefs. This meant we could use the statistics to see if seagrass restored close to boulder or mussel reefs was better for the animals that might move among those habitats. 

So I built a models of how animal numbers in a single location changed with the amount of seagrass and the distance to the other habitats. The model is a mathematical equation that describes a relationship like 'as seagrass area increase we see more baltic prawns'. 

The equation is built using statistics and the data, so it represents the real trends in the data. That's why the survey design with different distances to different habitats was key. The model only works if it can find trends in the data. 

The seagrass meadows were also patchy, some were larger than others. So we could also use the data to ask if larger areas of seagrass were better for animals when compared to mosaics of seagrass and soft sediment. 

We found seagrass specialist species, like periwinkles, preferred larger areas of seagrass close to mussel reefs. Other species, like juvenile flatfish, preferred soft sediment that was near to mussel reefs, so there were fewer of them at the seagrass restoration sites. 

Finally, some species preferred mosaics. Pipefish, which are a like a long thin seahorse, preferred patchy mosiacs of seagrass and soft sediment. 

## 'What if' we did restoration differently 

The models let us ask 'what if' questions about different ways to arrange the restoration of coastal habitats. 

We calculated how many animals there would be with different seagrass plantings. For instance, what if the seagrass was planted only near to boulder reefs? What if it was planted far away from boulder reefs? What if it was planted in a mosaic of patches? 

We found the best arrangements were different for each type of animal. The seagrass specialists liked a lot of seagrass planted in patches with small areas of soft sediment between it, like a checkerboard. 

The species caught by fisheries (brown shrimp and flatfish) did best with large patches of seagrass and large patches of soft sediment. 

Our study shows there are benefits to restoring whole seascapes of habitats together. Going forward I hope it can provide a pathway and motivation for other places to tackle the challenge of restoring seascapes. 

## Further reading

Michael's study on animals at the Denmark restoration site https://doi.org/10.1002/eap.70163

Great Barrier Reef habitats https://www2.gbrmpa.gov.au/learn/fascinating-facts-about-great-barrier-reef

Seagrass on the reef https://www.sciencedirect.com/science/article/abs/pii/S0272771414002078

Linkages among coastal habitats https://www.nature.com/articles/s44183-024-00095-1

Example of connections: Benefits of fish poo for nearby ecosystems https://esajournals.onlinelibrary.wiley.com/doi/full/10.1002/ecs2.2225


---

## POST: 2025-12-08-kelp-restoration-fisheries 
Path: posts/2025-12-08-kelp-restoration-fisheries/index.md 

---
date: '12/08/2025'
title: Giant kelp restoration could boost fisheries productivity in Tasmania
categories: [research]
published: true
---

Kelp restoration is gaining [global momentum](https://kelpforestalliance.com/) with recognition that we are losing kelp forests and the values they provide as habitat for biodiversity and supporting fisheries. 

But questions remain. We wanted to know if restoring giant kelp forests boost productivity for commercially important species like abalone and rock lobster. We [explore this question in our new study](https://doi.org/10.1002/aqc.70242). (Free access version [here](https://www.biorxiv.org/content/biorxiv/early/2024/12/20/2024.12.16.628810.full.pdf) or [email me](mailto:c.j.brown@utas.edu.au) for a copy)

We took measurements of kelp growth from Tasmania's East Coast and used them in models of ecosystems to study how gain kelp restoration could impact fisheries. 

We found the productivity gains could be substantial.

![](kelp-productvity-foodwebs.jpg)
**Images** Key findings

## Why giant kelp matters

Giant kelp *Macrocystis pyrifera* has largely disappeared from Tasmania's east coast, replaced by the less productive *Ecklonia radiata*. The productivity difference between these two species is striking - giant kelp is approximately 40 times more productive than Ecklonia. 

That extra productivity has to go somewhere. While we still need more research to fully understand the fate of giant kelp biomass, the evidence suggests it flows through the food web to support a wide range of species, including those important for fisheries.

## Modelling food web effects

We used ecosystem models to trace how increased macroalgae productivity from giant kelp restoration moves through the food web. The model shows productivity flowing from the restored kelp to herbivores like abalone, then up through different predator-prey interactions to boost productivity across many species in the ecosystem.

The most confident results come from the productivity measurements themselves - based on extensive, long-term datasets comparing giant kelp and Ecklonia across different areas and seasons. 

Then we use those data in the model to predict the effects of meeting Australia's restoration targets for giant kelp (restore 30% of degraded habitats). 

The model predicted improvements of fishery catch of 1-7%, depending on the species. This is a substantial improvement given the scale of the model is the entirety of Tasmania and the area of kelp restoration is relatively small compared to that total area. 

![](2023-11-13_kelp-forest.jpg)     

**Image** Giant kelp breaking up in later summer - its death and decomposition provides food to microbes that feeds energy into the local foodweb. 

## What the models don't capture

Our model looked across all of Tasmania's waters. Future improvements could study local changes in fishery productivity near to kelp forests. These are likely to be more substantial and could benefit fishers the most in those areas. 

The models focused on overall ecosystem productivity gains, but giant kelp provides additional benefits not captured in these predictions. Restoring dense surface canopies creates more habitat and refuge for juvenile fish, which could lead to even higher increases in fish productivity than the models predict.

## From global goals to local action

Our study demonstrates how global restoration targets can be translated into specific, outcome-based goals relevant to local communities. In Tasmania, the positive impacts of giant kelp restoration on kelp forest health and fisheries productivity align well with local values and needs.

Models are particularly valuable at this stage of kelp restoration because we're still in the early phases of upscaling. In the absence of previous large-scale examples to learn from, models help set realistic expectations and make the case for restoration investments. Models like this help show how restoration has relevance to communities. Community groups are more likely to support restoration when expected outcomes are clear and relevant to their specific needs.

Giant kelp is worth restoring not just because it's something we've lost, but because of the ecosystem-wide benefits it provides.


---

## POST: 2022-02-25-ambitious-targets 
Path: posts/2022-02-25-ambitious-targets/index.md 

---
date: '2/25/2022'
title: Ambitious conservation action sees a brighter future for mangroves and seagrass
categories: [research, coastal-wetlands]
published: TRUE
---

Ambitious restoration of mangroves and seagrasses could lead to substantial recovery of these ecosystems [new research has found](https://www.cell.com/current-biology/fulltext/S0960-9822(22)00235-4).

Published in [Current Biology](https://www.cell.com/current-biology/fulltext/S0960-9822(22)00235-4), the study estimated potential recovery of mangroves and seagrass under a range of protection and restoration strategies for 2030, 2050 and 2070, milestone years for international biodiversity commitments, and beyond.

“Protection alone is unlikely to drive sufficient recovery,” said Dr Christina Buelow from the Global Wetlands Project and the Griffith University Coastal and Marine Research Centre.

“Our research suggests that if ambitious action is taken to both protect and restore, gains of up to 5% for mangroves and 35% for seagrasses could be achieved by 2050.

“There is an urgent need to halt and reverse loss of mangroves and seagrass to continue to benefit from the services these ecosystems provide to coastal communities, such as enhancing coastal resilience and contributing to climate stability.”

Conservation action is needed to maintain and recover mangrove and seagrass ecosystems world-wide, but until now the expected outcomes of different protection and restoration strategies has remained unclear.

“Pairing global observations of mangrove and seagrass coverage change through time with modelled changes we demonstrated that only protection and restoration combined can support substantial gains in coverage of these ecosystems into the future,” said Professor Rod Connolly, Director of the Coastal and Marine Research Centre and the Global Wetlands Project.

“Our research can be used to set global conservation targets for coastal ecosystem recovery that are not only scientifically-sound, but are also have the necessary ambition required to inspire coordinated international action,” he said.

Associate Professor Chris Brown, also from The Global Wetlands Project and the Coastal and Marine Research Centre, added that “we need to be really ambitious if we are going to fight climate change and save coastal ecosystems.”

“Imagine if we put the kind of effort we are putting into space programs into protecting the Earth’s ecosystems – that’s what I mean by being ambitious.

“We need to save Earth’s ecosystems from the unprecedented scale of human pressures they face and help secure the stable climate that humanity needs to thrive.

“Our research provides the scientific basis to predict the outcomes we can expect for these ecosystems if they are ambitious. We hope this helps motivate action towards international targets for ecosystem protection, such as the UN Sustainable Development Goals and the Post-2020 Global Biodiversity Framework, which envisions a future where humans live in harmony with nature.”


---

## POST: 2018-09-29-R-courses-February-2019 
Path: posts/2018-09-29-R-courses-February-2019/index.md 

---
date: '9/29/2018'
title: Beginner Intermediate and Advanced R courses February 2019
categories: rstats
published: TRUE
---

This is an announcement of our next set of R courses. There are 4 separate courses taught over 5th-8th February 2019.  

You can [register with the Centre for Applications in Resource Management site at the University of Queensland](https://smp.uq.edu.au/event/session/5650).  

These R workshops are especially tailored for biology/ecology, but will be useful for anyone working in sciences. We often have people from other sciences, like medicine attend.

Location is at the Centre for Applications in Natural Resource Management, The University of Queensland in Brisbane Australia.
Student discounts on course fees are available.

Presenters:  Prof Anthony Richardson (UQ Centre for Applications in Natural Resource Mathematics), Associate Prof David Schoeman (University of the Sunshine Coast), Dr Chris Brown (Griffith University).  

The Advanced R course is taught by Dr Bill Venables (CSIRO) and long-time R developer.

We provide comprehensive workshop notes, including basic theory, applied worked examples in biology/ecology, and solution code.
Here is the course schedule for 2019.
In 2019 we have added a whole day for graphics, especially the use of the 'ggplot2' R package for plotting complex datasets.

## INTRODUCTION to R (1 day)  

Getting data into R;
Summary Statistics;
Simple Graphics;
Manipulating Data;
Simple statistics

## INTERMEDIATE R (2 days)

ANOVA;
Regression;
Model selection;
GLMs for binary and count data;
GAMS;
TREEs;
Clustering;
Ordination

## ggplot and spatial analysis in R  (1 day)
Data wrangling;
ggplot;
Mapping;
Spatial analysis

This workshop is for you if you have been using R and want to improve your skills.

## ADVANCED R  (3 days)   

Advanced data manipulation and visualisation;
Advanced graphics;
Statistical model building based on traditional and machine learning techniques;
Programming and software development in the R language.

If you have used R extensively, then the Advanced R Workshop is for you.

## Testimonials  

June 2017: “I truly enjoyed the whole workshop. Great teachers, really nice real data examples and good notes and background. Everything was very well thought out and explained.”  

June 2017: “I was really impressed with everything covered and how it was presented. I am feeling a lot better about using stats now than I was previously. I think it should be a compulsory course for all PhDs.”

Contact: carm@maths.uq.edu.au for more information or visit [Centre for Applications in Resource Management site at UQ to register](https://smp.uq.edu.au/event/session/5650).  


---

## POST: 2018-10-01-how-I-became-a-scicomm 
Path: posts/2018-10-01-how-I-became-a-scicomm/index.md 

---
date: '10/1/2018'
title: How I became a science communicator without realizing it  
categories: research-skills
published: TRUE
---

Would you consider yourself to be a science communicator, that is not just writing papers but doing other activities like doing interviews on radio?  

<div style="float:left;">
<img src="CB-scicomm-pres.jpg">
<p><em>Photo: Tom Rayner</em></p>
</div>

This story is about how I became a science communicator, without ever intending too.  

This blog is based on a talk I gave for the launch of the Australian Rivers Institute's [new science magazine](https://catchmenttocoast.org/2018/09/29/launch-of-our-magazine/).

I used to think scicomm was doing interviews for print, radio and TV to try and reach general public. I definitely didn’t want to do interviews growing up. I wanted to be a marine biologist and help ocean ecosystems.
Looking back though, it turns out I was always a keen science communicator.  

In high school I took a creative writing course, as a kind of break from all the science and maths I was doing. My peers in the course were writing beautiful poems about love, drinking and drugs (we were 16!). I was the nerdy kid imagining I was a journalist for Scientific American, writing non-fiction magazine articles about cool science.  

I never got very good marks in writing, but my creative writing teacher (Karen Clark) said something that has stuck in my head all these years. “keep practicising writing Chris, you will get good at it” (or something like that, it was a few years ago).  

When I went on to do my PhD at UQ, writing become about papers and very technical.  

During my PhD I was invited by Ben Halpern to attend training on science communications at the University of California, Santa Barbara.  
It was there I learned about Nancy Baron’s work “[Escape from the Ivory Tower](https://islandpress.org/books/escape-ivory-tower)”. I became convinced that it was crucial for us to escape the ivory tower if science was to inform better policies and decisions about the environment. I thought I should try to do more scicomm.  

The course was a lot about media interviews. I did a mock interview with an actual journalist from Scientific American, and failed badly. I felt that if this was what scicomm was about, it definitely wasn’t for me.
At the course they also taught us about Twitter and I became interested in how we could connect with other people through social media.  

I started tweeting in my first postdoc. But more importantly, I started seeing a lot of blogs on twitter.
Now as a young postdoc at UQ I felt my emerging identity as an independent thinker and scientist was lost in UQ's academic machine.  

I realised that starting my own blog was a way I could present the identity I wanted to present to the world with full control. And share my own thoughts. So I started blogging.  

At the same time I was still trying to escape from the ivory tower and the opportunity arose to do an interview for some North Queensland papers on my new study. When I arrived at the office next data the Uni’s media person had posted the article on the message board. Turns out the newspaper had also asked some local fisherman what they thought of my study. They had printed a quote in large font:  

> “These guys have no brains”  

Yep, interviews and scicomm weren’t for me.  

But I kept blogging.  

And my blogs were being read. I would meet people overseas at workshops and they would say ‘hey I read your blog’. That was exciting. But I was really only reaching other scientists.  

By the time I came to ARI I was becoming addicted to blogging. So much so that now I write about a PhD thesis worth of words in blogs every 18 months.  

I hope one day I bump into my creative writing teacher on the street so I can tell her “hey, I practiced and I became a Writer!”  

Things changed when I came to the Australian Rivers Institute and I started to identify as a science communicator. I think it is indicative of the wonderful supportive culture we have at ARI. The institute is great at supporting the career development of its ECRs.  

At ARI I set up the institute's blog and twitter feed (where I also do 10s of blogs per year and edit many more). I would help my colleagues write blogs about their science papers in a more accessible form. And I found I really enjoyed it.  

I also learned there never was an ivory tower at ARI. Everyone was doing such great applied work, such as that the work Stuart Bunn and Michele Burford do with the National Environmental Science Program. Under this funding they are working directly with stakeholders to set science priorities and do the research that was needed.  

That really changed my perspective on scicomm, it wasn’t just about interviews with journalists, it could be more targeted, directly speaking to the people that needed the research the most.  

Then [Liz O'Brien](https://twitter.com/drlizob?lang=en) from Griffith's Research Office encouraged me to apply for a Tall Young Poppy Award in science media and communication and I won one. The recognition really helped me to start to identify as a communicator.  

So then we went further and set up the [ARI Scicomm cadets](https://catchmenttocoast.org/2018/08/31/scicomm-cadets/) program. So we are currently training four of our ECRs in science communications skills, everything from tweeting to engaging with stakeholders. And they are running some amazing activities like Man’s international Cyanobacteria Twitter conference that is coming up next month.  

Then Prof Rod Connolly invited me to join an application for funding that has become the [Global Wetlands Project](https://globalwetlandsproject.org/). We hired a full-time science communicator. He’s here today – Tom Rayner – and is doing some amazing things that more strategic than I ever dreamed scicomm could be. We have integrated scicomm into our research from day 1, and have a strategy for everything from training ECRs to how to facilitate a two-way dialogue between researchers and stakeholders.  

Tom and I are currently working on how we will monitor the project's impact with stakeholders, so we can map the project's pathways to impact over its 4 year duration.

With all of this interest in scicomm, I am very pleased to be at ARI as a researcher and science communicator for the launch of ARI’s magazine.  

The magazine for me represents much of what ARI is about. It is showing to the world that not all scientists are stuck in the ivory tower.  

It gives our early career researchers a voice so they can start to create their own research identity.  

It is about reaching out to stakeholders and starting a conversation that will hopefully lead to better more useful science and more effective decision about our environment. People are less likely to raise comments like ‘they have no brains’ if they’ve had the chance to contribute to the science from day one.  

So now you've heard my story, I'll ask you again, are you a science communicator?


---

## POST: 2025-08-21-points-framing-regional-study-international-literature 
Path: posts/2025-08-21-points-framing-regional-study-international-literature/index.md 

---
date: '8/21/2025'
title: Points to consider when framing a regional study for the international literature
categories: research-skills
published: TRUE
---

At lab meeting today we discussed how to take your regional study and frame it for the global literature. This framing is essential for engaging international audiences and navigating editors and reviewers when publishing in international journals.

Thanks to the Seascapemodels and Conservation Action Team labs at Utas and Griffith Uni for their contributions. 

## Foundational Principles

**1. Consider your audience**

If you're targeting an international journal, your readers will be international scientists. They will be less interested in hearing about the specific organisms in your part of the ocean and more interested in understanding what your results mean for their own research contexts. Frame your findings in terms of broader ecological patterns, processes, or principles that transcend geographic boundaries.

**2. Establish global context through strategic citations**

Cite global studies and literature from multiple regions, not just your local area. Global studies are often well-cited because they provide the comparative framework that regional studies need. When citing studies from other regions, be strategic about which ones you include:

- **Choose contrasting systems**: Select studies from regions with different environmental conditions (temperate vs. tropical, shallow vs. deep, pristine vs. degraded) to highlight what makes your system unique or generalizable.
- **Include similar systems for comparison**: Find studies from ecologically similar regions to show whether your findings represent broader patterns or regional anomalies.
- **Reference methodological precedents**: Cite studies that used similar approaches in other regions, even if the ecological focus differs, to establish the credibility of your methods.
- **Draw from different disciplines**: Include studies from related fields (e.g., terrestrial ecology, freshwater systems) when they provide relevant theoretical context or methodological insights.

Position your region within this broader context by explicitly comparing and contrasting your findings with patterns observed elsewhere. For example: "While coral bleaching in the Caribbean typically occurs at 29°C, our Pacific sites showed bleaching at 31°C, suggesting regional adaptation to higher baseline temperatures." This demonstrates that you understand the global state of knowledge and can articulate where your work fits.

## Specific Framing Strategies

**3. Connect to established theories and frameworks**

Relate your case-study to general ecological theories or established analytical frameworks. For example, your work could be an application of the DPSIR (Drivers-Pressures-State-Impact-Response) framework to your region, or a test of the recruitment limitation hypothesis in a new system. This approach transforms your regional study from a descriptive account into a contribution to broader scientific understanding.

**4. Demonstrate novelty without claiming "firsts"**

State your contributions by explaining why your approach or findings matter, rather than simply claiming precedence. Avoid phrases like "this is the first time." Instead, draw parallels to successful applications in other fields or regions. For example, rather than "This is the first time we've used machine learning for fisheries," try "Machine learning has proven highly effective for predictions in agriculture and could provide similar benefits for fisheries management."

**5. Highlight unique perspectives and unexpected findings**

Show how your case-study reveals new patterns or challenges existing assumptions compared to other regional studies. Focus on findings that offer fresh insights into well-studied processes. For example: "While marine heatwaves are known to cause widespread mortality, our study reveals that toxic plankton blooms can flourish during these events, creating compound ecological impacts."

**6. Present methodological innovations**

Frame your work as developing or refining methodological approaches, with your regional study serving as a proof-of-concept. This strategy is particularly powerful when you've adapted techniques from other disciplines or combined existing methods in novel ways. Emphasize how the method could be applied in other regions or systems, making your local study a stepping stone to broader applications.

## Practical Applications and Impact

**7. Demonstrate real-world applications**

When conducting applied research, explicitly show how your science has been used for conservation or management decisions. One excellent example is Rick Hamilton's [turtle tracking paper](https://www.sciencedirect.com/science/article/pii/S0006320721002925). While countless studies track turtles, Hamilton got his work published in an international conservation journal by demonstrating how the tracking data directly informed conservation actions. He also capitalized on a review highlighting that most tracking studies fail to influence conservation practice, establishing his work's unique value.

**8. Connect to global goals and initiatives**

Link your research to internationally recognized objectives and frameworks. This connection is increasingly common and effective. For example: "SDG 14.4 aims to make fisheries sustainable by 2020. Achieving this goal requires better models of climate impacts on fish populations—precisely what our study provides." Other relevant frameworks include the Convention on Biological Diversity targets, national biodiversity strategies, and organizational goals like those of the Global Mangrove Alliance. These connections help editors and reviewers understand your work's broader significance.


---

## POST: 2025-11-15-should-i-do-a-pre-print 
Path: posts/2025-11-15-should-i-do-a-pre-print/index.md 

---
date: '11/15/2025'
title: Should I post my manuscript to a pre-print server? 
categories: research-skills
published: TRUE
---

In our recent lab meeting we [revisited the topic of pre-prints and pre-print servers](https://www.seascapemodels.org/posts/2018-08-20-biorxiv-pre-print-posting-guide/index.html) to answer the question - should I post a pre-print of my manuscript?

Thanks to Jordan Holdorf for helping me write this post and Matt Holden for contributions via linkedin. 

In a recent lab meeting, we revisited the question: Should I post a preprint of my manuscript? A few years ago, [I wrote about this topic after posting my fourth preprint to bioRxiv](https://www.seascapemodels.org/posts/2018-08-20-biorxiv-pre-print-posting-guide/index.html). Since then, the landscape has shifted, and our discussion—thanks to Jordan Holdorf for the notes—highlighted new considerations worth sharing.

![](/posts/2025-11-15-should-i-do-a-pre-print/pre-print-illustration.jpg)

*Generated by Google Gemini. 

## What Are Preprints?

Preprints are manuscripts shared publicly before formal peer review. They’re free to post, free to read, and usually come with a DOI, making them citable. Popular servers include arXiv, bioRxiv, EcoEvoRxiv, medRxiv, and SSRN. 

The concept isn’t new, arXiv launched in physics back in 1991, but preprints surged during COVID-19 as scientists raced to share findings quickly. Conservation science and ecology have increasingly embraced preprints as well. 

## Why Bother? Pros and Cons

### Pros

- Visibility and speed: Your work is accessible immediately, not months later.
- Feedback: Pre-review comments can strengthen your paper.
- Citations: Preprints can be cited, even if the journal version is paywalled.
- Priority: Posting establishes your claim to an idea.
- Flexibility: You can build on work that’s still under review.

### Cons

- Quality concerns: Preprints aren’t peer-reviewed, so errors can spread.
- Misinformation risk: Especially if high-profile topics get picked up by the press. 
- Version confusion: If titles change, citations may split across versions.
- Journal policies: Most journals now allow preprints, but check first.
- Double-blind issues: Reviewers can find your preprint and identify authors.
- Time cost: Uploading and revising adds extra steps.
- Google Scholar may not list your published article for up to 6 months after publication (rather than the normal few days delay after publishing). This is a known issue with pre-prints on SSRN and bioRxiv, apparently fixed for arxiv pre-prints. 

Overall, the benefits usually outweigh the drawbacks—if you manage the process carefully. 


## Key considerations

Some lab members expressed concern that their work could get stolen from a pre-print and published by an other author. I would think this is rare, however, with AI making it increasingly easy to paraphrase other people's work, the risk is probably higher than it used to be. 

We decided that if you are concerned about plagiarism, it is best not to link your open code repository in the preprint. That could make it too easy for a bad actor to create a new version of your work. 

Media is another factor. Journalists generally prefer to cover peer-reviewed work, though during COVID, preprints made headlines. For most fields, you can expect little media attention until formal publication. This is good, as peer review is crucial for credibility. 

Finally, think strategically. Preprints make sense for urgent topics, methods papers, or when you want community feedback. They’re less practical if you’re under time pressure or working on a niche topic. 

## How to Post a Preprint

Here’s a streamlined guide based on experience and Jordan’s notes:

- Finish the manuscript and get coauthor approval. Check your target journal’s preprint policy.
- Format carefully. Upload a polished PDF with clear figures, tables, and your contact info.
- Sign up for a server and ORCID. ORCID helps link your work across platforms.
- Choose a license. Think about reuse—Creative Commons options vary.
- Upload and wait. Most servers take ~24 hours to post.
- Share strategically. Share on social media (to other scientists, not for general public), email colleagues, or post on Google Scholar if you want feedback.
- Revise before acceptance. Once your paper is accepted, most servers block updates.
Link the final version. Matching titles help merge citations; otherwise, see the server's instructions for how to fix the connection. 


## My Experience

I’ve had mixed results. One preprint was redundant because the journal review was lightning-fast. Another has been cited multiple times while stuck in review purgatory—proof that preprints can keep your work alive. The biggest headache? Title changes. If your published title differs, make sure the preprint links correctly.

## Final Thoughts

Preprints aren’t a magic bullet, but they’re a powerful tool when used thoughtfully. They accelerate science, increase visibility, and invite collaboration—but they also demand care around version control, anonymity, and journal policies.

On the balance of it I use them selectively. For work that is time-sensitive, methodologically important, or where I want feedback, then I do a pre-print. If I'm busy or there is little to gain, then I skip it. 



---

## POST: 2025-02-12-LLMs-for-literature-reviews 
Path: posts/2025-02-12-LLMs-for-literature-reviews/index.md 

---
date: '2/12/2025'
title: How to use large language models to assist in systematic literature reviews
categories: [rstats, genAI, research-skills]
published: TRUE
---


In the near future, we will all be doing systematic lit reviews by
getting LLMs to gather data from papers. Below is an example of how to
extract text data from a study. Once you can interact with LLM from R,
you can then batch process many documents to turn text into structured
data.

TLDR; Developing a data extraction workflow is hard work. The
development of prompts, data extraction and data cleaning is time
consuming and requires thought. So it will still take work to do a
systematic review. I’d also recommend you manually check results so that
you still learn something yourself and to correct errors.

I’ll also mention that papers are coming out now testing this idea,
e.g. this one shows the [AI’s results can be accurate, but only for some
types of requests](https://www.nature.com/articles/s44185-024-00043-9).
The supplemental code for that paper also has helpful guidance.

We’ll need a few R skills to extract data from papers for lit reviews:

1.  How to interact with LLMs through APIs from R
2.  How to handle pdf docments and extract text from them
3.  How to clean up semi-structured text data and turn it into
    structured data.
4.  How to batch process.

I’ll mainly focus on step 1 here. Step 2 is possible, by can be finniky
and depend on how the pdf is formated. Step 3 is pretty straightforward
with a package like `stringr`. Step 4 is just looping with whatever
framework you prefer for that (e.g. for loops or purrr).

This blog deals with only one type of application of LLMs to lit
reviews, that is maybe the most straightforward and cheapest. There are
other ways to use them to write syntheses or discover research trends,
such as finetuning models on a large corpus of papers.

### Setting up your API access

API = application programming interface. This is a way to interact with
a service (the LLM provider) via R.

First you will need to go to your LLM provider of choice (here I’m using
anthropic) and get an API key. This will require you to register and
then buy some credits. You will per charged per token (fragment of a
word) that you use.

I’ve started out with 25USD which seems to be sufficient for testing.
I’ve got no idea yet how much it will cost to do a full systematic lit
review with 100s of papers.

Now get your API key. Keep this secret its like a password. Also you can
only view it once, so you’ll need to save it, e.g. in a password
manager.

### Using the API key in R

I’m using the `dotenv` package to help manage API. First, make sure
`.env` is in your `.gitignore` file. This way you can’t inadvertently
share your key with the world.

Now create a file in a text editor (e.g. Rstudio or VSCode) called
`.env`. Put this is your project folder.

The file will look like this:

    ANTHROPIC_KEY="your_api_key_here"

Be sure to hit enter after the last line.

Now you can use the `dotenv` package to load the key into your R
session. [This blog has good advice on managing
secrets](https://www.r-bloggers.com/2018/08/structuring-r-projects/)

    dotenv::load_dot_env('.env')

Check it worked to load the key:

    Sys.getenv("ANTHROPIC_KEY")

This should print your key.

## Interacting with the API from R

Now you are ready to use the API. There are quite a few packages that
can help you do this. I’m going to use the new `tidychatmodels` package,
because I like its syntax (its like tidymodels).

[Install instructions are
here](https://albert-rapp.de/posts/20_tidychatmodels/20_tidychatmodels)
(its not on cran as of writing) and [here is a nice example of how to
use LLMs with
pdfs](https://albert-rapp.de/posts/21_pdf_extraction/21_pdf_extraction),
which helped me greatly with writing this blog.

    library(tidyverse)
    library(tidychatmodels)

Now start building the instructions to send to the API. tidychatmodels
does this step by step with pipes. So we are going to build up a
sequence of commands. In the final step we’ll send it to the API.

    newchat <- create_chat("anthropic", 
        api_key = Sys.getenv("ANTHROPIC_KEY"),
        api_version = '2023-06-01')

Here I’m using ‘anthropic’, but there are others e.g. openai and
mistral.

Now add a model. I got the model name on the [APIs
webpage](https://docs.anthropic.com/en/docs/about-claude/models)

Model choice is dictated by speed, cost and the type of task you want to
do. Do some research to optimise this.

I’m also setting the temperature to control the level of creativitiy in
the output, lower values = less creative. max\_tokens controls the
length of the output.

    newchat <- add_model(newchat, "claude-3-5-haiku-20241022") |>
          add_params('temperature' = 0.2, max_tokens = 800) 

## Prompting through the API

Let’s do a test run. I’ll create some text

    newchat <- newchat |>
      add_message(
        role = 'user',
        message = 'You are a funky dude who loves writing online R lessons.
        Write a paragraph about loading dataframes in R. '
      ) 

Now we’re ready to hit the dance floor. This is the bit where we
actually ask the LLM to do something. It is also the bit that costs
money….

    newchat <- newchat |>
        perform_chat()
    responses <- newchat |> extract_chat()

So the first time I ran this I got a ‘400’ error. Turns out the
‘max\_tokens’ parameter was essential to set. This parameter controls
the length of output. Longer outputs cost more (you’re charged per
token).

Error in `httr2::req_perform()`: ! HTTP 400 Bad Request. Backtrace: 1.
tidychatmodels::perform\_chat(newchat) 5.
httr2::req\_perform(prepared\_engine)

## Roles

Most LLMs have different roles, often a ‘user’ and a ‘system’ role.
These give you more precise control over the LLM’s output. There is
great advice from vendors on how to use these roles, e.g.  with
(anthropic)\[<https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts#legal-contract-analysis-with-role-prompting>\]

Setting a system role controls how the LLM behaves. People use these to
make the AI act like a certain character, such as a research assistant.
Let’s see it in action.

Prompting is like programming, but less precise (annoyingly for me, who
likes programming and things to be exact!). Good prompts will tend to
get you better results. But of course, as with all deep learning,
outcomes have an element of randomness, so can be inconsistent.

    base_settings <- create_chat("anthropic", 
        api_key = Sys.getenv("ANTHROPIC_KEY"),
        api_version = '2023-06-01') |> 
        add_model("claude-3-5-haiku-20241022") |>
        add_params('temperature' = 0.8, max_tokens = 100) 

    newchat <- base_settings |>
      add_message(
        role = 'system',
        message = 'You are a funky dude who loves writing online R lessons.'
      ) |> 
      add_message(
        #defaults to 'user' role
        message = 'Write a paragraph about loading dataframes in R. ') |>
        perform_chat() 

    extract_chat(newchat)

Ok, so the system role didn’t work very well in this case. To get the
‘funky dude’ output you need to put that into the user role.

Now let’s look at doing this for a real paper.

## Extracting text from a pdf

I’m going to use my [recent paper on turtle mortality as an example,
becuase I know it well](https://doi.org/10.1111/conl.13056) and the file
size isn’t too large.

Now we can use the pdftools package to read in the text from file. You
could also try reading this directly from the web as HTML, which might
allow you to identify particular sections, or data in tables, more
effectively (by using html tags).

Just note that making repeat requests for html pages might get you
temporarily blocked from the publisher’s server.

    library(pdftools)
    text <- pdf_text("data/Brown_etal2024 national scale turtle mortality.pdf")

Now doing the above failed to work, I got that darn 400 error again when
I sent it to the API. The issue seemed to be in the formatting of the
text. So I can get on with the next step, I’ve just cut and paste the
text into a text file. Clearly the cleaning up of pdfs/html for use will
be a big part of this process. (like all modelling, data cleaning
usually takes up most of the time).

    methods_text <- readLines("data/example-text.txt") |>
        paste(collapse = " ")

## Sending text to the LLM

Now we have our text we can send it to the LLM.

    newchat <- base_settings |>
        add_params('temperature' = 0.2, max_tokens = 600) |> 
        add_message(
        role = 'system',
        message = "You are a research assistant who has been asked to summarise the methods section of a paper on turtle mortality.
        You will extract key statistics on:
        Sample size: << Insert sample size here>>
        Year of the study: << Insert year here>>
        DONT EXTRACT ANY MORE INFORMATION BEYOND THIS POINT.
        "
      ) |> 
         add_message(
             message = methods_text
        ) |>
      perform_chat()

    extract_chat(newchat)

The prompt is key here. In the system role we’ve told it to extract the
data in a structured way. I also included ‘DONT EXTRACT ANY MORE
INFORMATION BEYOND THIS POINT.’ to prevent it from continuing to talk.
Using caps emphasises the point to the AI.

Here’s the output:

> Based on the methods section, here are the key statistics: Sample
> size: 357 sets (electronic monitoring) for large-scale longline
> fishery (LLF) Year of the study: 2018

Here’s the output without the final part in caps:

> Assistant: Based on the methods section, here are the key statistics:
> Sample size: - For Small-Scale Fisheries (SSF): Monitored catches from
> 10 communities across 8 of 9 provinces - For Large-Longline Fisheries
> (LLF): 357 sets reviewed, spanning from 2018-01-24 to 2019-08-17 -
> Total catch events for LLF: 25,403 catch events - Electronic
> monitoring deployed on 7 vessels Year of the study: 2018 (primary year
> of data collection) Additional notable details: - Used non-parametric
> bootstrapping for scaling up and estimating confidence intervals -
> Monitoring methods involved trained community members and electronic
> monitoring systems - Video review of LLF data took 0.5 to 2 days per
> set - Used three different methods to scale up turtle catch for LLF to
> account for variability

This is all very accurate, but includes too much ‘additional details’.
However, it does get more of the methods details with regards to the
various sample sizes for different parts of the study.

Let’s get the output text:

    chatout <- extract_chat(newchat)
    output <- chatout[chatout$role == 'assistant', 'message']

For repeatability just for the blog I’m hard coding that

    output <- data.frame(message = "Based on the methods section, here are the key statistics:\n\nSample size: 357 sets (electronic monitoring) for large-scale longline fishery (LLF)\nYear of the study: 2018")

## Turn text into structured data

Our data is semi structured by the way we did the prompt. Now we want to
put the sample size and year into data fields.

I’m using `separate_wider_delim` to first seperate out the first
paragraph that had two breaks ‘’, then again to split the sample size
and year into columns (they were seperated by ‘’).

Finally, str\_remove\_all gets rid of the ‘Sample size:’ and ‘Year of
the study:’ text.

    library(stringr)

    cleaned_output <- output |> 
      separate_wider_delim(
        cols = message, 
        delim = '\n\n',
        names = c('response', 'stats')
      ) |> 
    separate_wider_delim(
        cols = stats, 
        delim = '\n',
        names = c('sample_size', 'year')
    ) |> 
      mutate(
        across(
          sample_size:year,
          \(x) str_remove_all(
            x, 
            'Sample size: |Year of the study: '
          )
        ))

So now we can easily get our variables (sort of)

    cleaned_output$sample_size
    cleaned_output$year

## Reflections on challenges and next steps for automating data extraction

### Cost uncertainty

This should be cheap. It cost &lt;1c to make this post with all the
testing. So in theory you could do 100s of methods sections for
&lt;100USD. However, if you are testing back and forwards a lot or using
full papers the cost could add up. It will be hard to estimate this
until people get more experience.

### Obtaining the papers and dealing with unstructued text in PDFs or HTML

A big challenge will be getting the text into a format that the LLM can
use. Then there are issues like obtaining the text. Downloading pdfs is
time consuming and data intensive. Trying to read text data from
webpages can also be hard, due to paywalls and rate limits (you might
get blocked for making reqeat requests).

For instance, [in a past study we did where we did simple ‘bag of words
analysis’](https://onlinelibrary.wiley.com/doi/full/10.1111/brv.12344?casa_token=LVnFzoFBBU8AAAAA%3AcsyopYDWDBRZN7y2JL7eHYxzqayxu2GvKB-7gdEYkdeZSi5p5o1oXTwj49FqwBJz-IpPS6wxJ_SX0h2f)
we either downloaded the pdfs manually, or set timers to delay web hits
and avoid getting blocked.

HTML format would be ideal, because the tags mean the sections of the
paper, and the figures already semi-structured.

### Prompting

Need to experiment with this to get it right. It might also be good to
repeat prompt the same text to triangulate accurate results.

### LLM text output cleaning

In my simple example this was easy. However, with a large number of
prompts and papers the LLM responses might have more variability that
needs to be dealt with, e.g. will it always use one line break between
my data questions? You can help control this issue by asking it to
structure output in xml or JSON format, which is easier to then parse
into data sheets.

### The data still isn’t data and requires interpretation

You can see from my simple examples above that the output can’t be
plotted direclty. In fact, it requires more interpretation. The sample
size was given as ‘357 sets (electronic monitoring) for large-scale
longline fishery (LLF)’. So is it 357? Are there other sample sizes that
might be relevant?

### Validation

You’ll definitely want to manually check the output and report accuracy
statistics in your study. So maybe your review has 1000 papers, you’ll
want to manually check 100 of them to see how accurate the LLM was.

### You’ll still need to read a lot of papers to write a good lit review

A lit review is more than the systematic data. I still believe you need
to read a lot of papers in order to understand the literature and make a
useful synthesis. If you just use AI you’re vulnerable to the [‘illusion
of understanding’](https://www.nature.com/articles/s41586-024-07146-0).

### Conclusion

This tool will be best for well defined tasks and consistently written
papers. For instance, an ideal use case would be reviewing 500 ocean
acidification papers that all used similar experimental designs and
terminology. You’ll then be able to get consistent answers to prompts
about sample size etc…

Another good use case would be to extract model types from species
distribution model papers.

Harder tasks will be where the papers are from diverse disciplines, or
use inconsistent terminology, or methods. My study was a good example of
that, there were about 5 different sample sizes reported. So in this
example we’d need first to think clearly about what sample size you
wanted to extract before writing the prompt.


---

## POST: 2018-10-16-understanding-the-glm-link 
Path: posts/2018-10-16-understanding-the-glm-link/index.md 

---
date: '10/16/2018'
title: Generalized Linear Models understanding the link function
categories: rstats
published: TRUE
---

Generalized Linear Models: understanding the link function
=================================================

Generalized Linear Models ('GLMs') are one of the most useful modern
statistical tools, because they can be applied to many different types
of data. Count, binary 'yes/no', and waiting time data are just some of
the types of data that can be handled with GLMs.

We often call such data 'non-normal' because its distribution doesn't
follow a normal distribution (also known as the bell curve or Gaussian
Distribution).

In this post I will look at how GLMs use a 'link function' to model
non-normal data. I think there is a sort of beautiful elegance in the
maths of how the link function works. Understanding this theory will
also help you build better models for your data and interpret them in
more nuanced ways.

We will step through the math behind the GLM and build it up from
scratch.

GLMs extend 'General Linear Models' (confusing names I know), read [this
post first if you are not yet familiar with General Linear
Models](http://www.seascapemodels.org/rstats/2018/01/19/intro-to-glms.html).

Thanks is due to Brad Biggerstaff for emailing some errors in terminology in my original post (which I've updated and hopefully fixed 19/10/2018). 

Choosing the right distribution for your data
---------------------------------------------

I learned about the Normal distribution in primary school. The normal
distribution is central to much of statistics (no pun intended), but
there are many types of data that don't meet the basic assumptions of
the normal.

The normal distribution has 'infinite support', which means values
modelled by the normal can take any negative or positive number. Often
the normal is a pretty reasonable approximation of data that doesn't
meet these assumptions, but there are many cases when using a normal for
data that isn't will lead us to make errors in our inferences.

Statisticians have invented whole families of distributions to describe
any type of data you can imagine, from the morbid (the Exponential
distribution for deaths or decay), to wealth inequality (the Pareto
distribution) and even days of the year (the Von Mises distribution).

More specifically, we should think of the distribution as a description
of the process that generates the data.

Let's start with something simple. Let's assume you have been counting
fish on coral reefs. So your data are count data.

If the counts are large they may well look pretty normal. But there are
some important differences.

Counts are integers, whereas the normal distribution is for continuous
data that can include any fraction.

Counts also can't be less than zero, but the Normal distribution model's
stochastic processes that draw zeros and negative numbers.

Statisticians have invented many distributions for counts, one of the
simplest is the Poisson distribution. It is a model of positive
integers. It has one parameter *λ*, which is both its mean and variance.

Let's see what that looks like with some simple R code to draw random
numbers from two Poisson distributions:

    n <- 1000
    set.seed(42)
    x1 <- rpois(n, lambda = 1)
    x10 <- rpois(n, lambda = 10)
    mean(x1)

    ## [1] 0.976

    var(x1)

    ## [1] 0.9663904

    mean(x10)

    ## [1] 10.083

    var(x10)

    ## [1] 10.75086

We just sampled random numbers from two Poisson distributions with means
of 1 and 10. Notice that the means and variances of each are
approximately equal (not exactly equal because of we drew a small random
sample).

You can think of this sampling from the Poisson as a model of count
data. Let's see what that looks like:

    par(mfrow=c(1,2))
    hist(x1, xlim = c(0, 25), seq(0, 25, by = 1))
    hist(x10, xlim = c(0, 25), seq(0, 25, by = 1))

![](beauty-of-the-glm-link_files/figure-markdown_strict/unnamed-chunk-2-1.png)  


So the data drawn from the poisson with `lambda = 1` are concentrated
near zero and strongly skewed (not very Normal). The data with
`lambda = 10` are approximately normally distribution and have a much
larger variance than the former data.

Linear models
-------------

So far our Poisson model only has one parameter, a mean (and variance).
But what if we wanted the mean to change?

For instance, we might have counted fish on different types of coral
reefs and we want to test whether there are difference abundances on
each type of reef.

Or we might have counted fish across a gradient of pollution and we want
to know how their numbers change from low to high pollution.

I will call these hypothesized causes of changes in fish counts
'covariates'. Others might call them explanatory variables, treatments
(if experiments) or predictor variables.

We are using **Generalized Linear Models**, so we could include the
covariates as variables in a simple linear equation, after all that is
what we do with linear regression (and [general linear
models](http://www.seascapemodels.org/rstats/2018/01/19/intro-to-glms.html)):

![img](http://latex.codecogs.com/svg.latex?y_%7Bi%7D%3D%5Calpha%2B%5Cbeta%2Ax_%7Bi%7D)

Let's generate some such data ourselves. We will assume pollution is
measured on a zero to one (low to high) scale, that the mean number of
fish with no pollution =4 and that on average there are no fish anymore
when pollution levels = 0.5 (half their maximum).

The plot below illustrates our model for the mean expected number of
fish across the pollution gradient. In this case we are building a model
to simulate some data to practice with:

    n <- 50
    beta <- -8 #effect of polluted reefs
    alpha <- 4 #intercept = mean at 'zero' pollution
    x <-  seq(0, 1, length.out = n) #pollution levels
    ymean <- alpha + beta*x
    plot(x, ymean, type = 'l', xlab = "Pollution level", ylab = "Number of fish counted")
    abline(h = 0, lty = 2, lwd = 2)  


![](beauty-of-the-glm-link_files/figure-markdown_strict/unnamed-chunk-3-1.png)  

There is something odd about this model: we are predicting negative fish
(on average) for pollution levels over 0.5.

It gets even worse if we model sampling with a normal distribution:

    set.seed(55)
    yobs_normal <- ymean + rnorm(n)
    plot(x, ymean, type = 'l', xlab = "Pollution level", ylab = "Number of fish counted")
    points(x, yobs_normal)
    abline(h = 0, lty = 2, lwd = 2)

![](beauty-of-the-glm-link_files/figure-markdown_strict/unnamed-chunk-4-1.png)

Clearly if we went in the real world to sample data, we wouldn't ever
get any negative counts.

So we are going to have to redesign our model, which is the basis of our
statistical tests, so that negative values don't happen.

But we still want to use a linear model, because they are convenient to
work with mathematically and convenient when it comes to estimating the
unknown effects.

Simulating Poisson data from a linear model
-------------------------------------------

So now we come to link functions. Link functions elegantly solve the
problem of using linear models with with non-normal data. There are many
types of link functions, but we will look at one that is popular for use
with count data.

If you wanted to stop a linear function from taking negative values what
is one simple transformation you could make?

Well, you could take the function's exponent. We will redo the above
linear equation as log-linear. I will change the parameter names to
reflect that they are now logs:

    gamma <- -3.2 #effect of polluted reefs
    alpha <- 4 #intercept = mean at 'zero' pollution
    yexp <- alpha*exp(gamma*x)
    plot(x, yexp, type = 'l', xlab = "Pollution level", ylab = "Number of fish counted")
    abline(h = 0, lty = 2, lwd = 2)

![](beauty-of-the-glm-link_files/figure-markdown_strict/unnamed-chunk-5-1.png)

Here we have the equation `y = alpha *exp(gamma*x)` which is the same as
the linear equation for `log(y)`: `log(y) = log(alpha) +gamma*x`. Note I
have retained `alpha=4` in both, because for both equations `alpha` is
the expected value at pollution of zero.

I changed the slope parameter in the log-linear equation to `gamma`
because it is not a direct analogue of our slope parameter `beta` above.

One of the nice things about the log-linear equation is that the slope
parameter now represents multiples of change. For instance,
`gamma = -3.2` means the abundance declines about 25 times decline
(=`1/exp(-3.2)`) when going from a pollution level of `0` to `1`.

Abundance declines about a five times decline if we go from a pollution
of `0` to `0.5` (= `1/exp(-3.2*0.5)`). Noting this will be important
when we come to interpreting fitted models below.

We could now use this exponential curve as the mean (and variance!) of a
Poisson:

    yobs_pois <- rpois(n, yexp)
    plot(x, yexp, type = 'l', xlab = "Pollution level",
         ylab = "Number of fish counted",
         ylim = c(0, 8))
    points(x, yobs_pois)

![](beauty-of-the-glm-link_files/figure-markdown_strict/unnamed-chunk-6-1.png)

Notice that no data fall below zero now. Also, notice how the variance
of the samples gets smaller as the mean gets smaller.

The beauty of the link: combining linear models with bespoke distributions
--------------------------------------------------------------------------

In the real world, you will have the sample points, but not the
'true' mean. In the example above we just made up the true mean
ourselves. In the real world Nature provides the 'truth' about how
pollution impacts fish abundance and the best we can do is take as many
measurements as we can and hope to get near the truth.

To estimate the effect of the pollution covariate you can use R's
`glm()` function:

    m1 <- glm(yobs_pois ~ x, family = poisson(link = "log"))
    coef(m1)

    ## (Intercept)           x
    ##    1.409704   -3.345646

The values we printed give the estimates for the intercept and slope
coeffcients (alpha and gamma). You can check that these are similar to
the true estimates we provided by comparing them to `log(alpha)` and
`gamma`.

I have specified above the type of distribution to use
(`family = poission()`) and which link to use. `"log"` is in fact the
default choice, but I put it there so you know you can change it.

For instance, you can use `"identity"` link for data that is far from
zero. If you use the identity link, which is basically no link function,
your model will be linear, not log-linear, so your slope estimate will
once again be additive.

Technically we would say we fitted a *Poisson Generalized Linear Model with a log link function*. So the model's predictions for the data will be Poisson distributed about its estimate for the mean. Note
that the data can contain zeros, but the mean of the Poisson is always &gt;0.

So what do the coefficients mean? Remember the coefficients are on the
log scale. So the mean abundance at a pollution level of zero =
`{r} exp(coef(m1)[1])` and a change in pollution from 0 to 1 causes an
estimated `{r} 1/exp(coef(m1)[2])` times decline in fish abundance.

Let's also plot the fitted model with standard errors.

    ypredict <- predict(m1, type = "response", se = TRUE)
    plot(x, yexp, type = 'l', xlab = "Pollution level",
         ylab = "Number of fish counted",
         ylim = c(0, 8))
    lines(x, ypredict$fit, lwd = 2, col = "red", lty = 2)
    #Add lines for standard errors
    lines(x, ypredict$fit + ypredict$se.fit, lty = 3, col = "red")
    lines(x, ypredict$fit - ypredict$se.fit, lty = 3, col = "red")
    #plot observations
    points(x, yobs_pois)
    legend('topright', legend = c("True mean", "Estimated mean"),
           lwd = 2, lty = c(1,2), col = c("black", "red"))

![](beauty-of-the-glm-link_files/figure-markdown_strict/unnamed-chunk-8-1.png)

You can see the fitted line falls close to the 'true' line, and the
standard errors are pretty tight around our best estimate.

The fitting algorithm itself is attempting the maximise the
log-likelihood of the observations given the mean (in technical
speak). You can read [more about likelihoods
here](http://www.seascapemodels.org/rstats/2018/04/13/how-to-use-the-AIC.html).

It is also worth noting that we still need to do assumption checks, like
we would for a regression with normal errors. For instance, we can check the model's residuals
(the difference between the data and the model's predicted values) to see that the residual
variance approximately equals the mean. A cool way to check assumptions of the Poisson model is to use
'rootograms', look it up.

The beauty of the link: combining linear models with bespoke distributions to describe natural processes
--------------------------------------------------------------------------------------------------------

So in my introduction I claimed that maths of GLMs is beautiful. I think
that because the maths is nicely coherent with the way nature often
works.

We wanted to fit a linear function to data that can't be less than zero,
because linear functions are convenient to work with. So we used a log
link function to describe the mean and to ensure that the mean is always
greater than zero.

We ended up with a model where the slope describes multiples of change
in fish abundance over the pollution gradient. So the model itself is
actually multiplicative, not additive.

If you think about it, natural processes that generate counts often are
multiplicative, not additive. For instance, we may talk about 'fish
multiplying' when they breed, because population growth can be
exponential.

So our mathematically convenient link function actually ended up being a
better description of the natural process.

The effort to use a non-negative model also forced us to think about
using a more appropriate distribution for the data: the
Poisson rather than the Normal. The Poisson has the variance increasing
with the mean.

Once again, natural processes that generate counts often lead to
increases in the variance in situations where we count more. Counts near
zero will naturally have low variance, because they are constrained by
zero, whereas higher counts will naturally have a greater variabilty.

You can also relax the assumption of mean = variance with other GLM distributions like the negative binomial.

It turns out that proper models of variance are crucial for [getting the
standard-errors right, and so crucial for detecting real effects over
spurious
ones](https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/2041-210X.12552).

Imagine if you used a Normal distribution and assumed equal variances.
You might spuriously attribute differences between groups from high
counts to some covariate, but the difference is actually just natural
variation. Conversely, you might miss differences between groups with
low counts, because a smaller difference at low counts should actually
be statistically significant.

The increased power we get to detect differences at low counts with a
GLM over a regression happens because it is the multiple of the
difference that matters with the log link, not the absolute (additive)
difference.

My final point is to remember that coefficients from a model with a log
link (and some other links too, like the logit) are multiplicative. This
can be very useful when it comes to making sense of your results and may
change the way you present your findings.

For instance, we used this key insight from a GLM to make a case that
[pollution from logging causes a 24 times decline in the abundance of a
threatened fish
species](https://www.sciencedirect.com/science/article/pii/S0006320716310461).

Before we considered using the GLM, we had actually presented the
results in terms of a % change in fish abundance. But % are not as easy
to generalize, because they depend on your baseline. Multiples do not.

Hope you found this post helpful, and as always you can get me on
[Twitter](https://twitter.com/bluecology) if you have comments or
questions.

### Homework for the keen: What's the difference between a log link and log transforming your data?

I wanted to add a brief appendix to address this question, because the
answer is insightful as to how link functions work.

Try take the data we generated above and fit two GLMs (you will have to
add a small number so you can log the zeros, not ideal but a common
practice)

    yobsplus <- yobs_pois+0.1
    model1 <- glm(yobsplus ~ x, family = gaussian(link = "log"))
    model2 <- glm(log(yobsplus) ~ x, family = gaussian(link = "identity"))

In the first model we fitted a Gaussian (=Normal distributed errors)
with a log link. In the second we fitted a Gaussian to log(y) with the
identity link (which is no link).

Now compare the results. Notice that the estimate of the slope is quite
different. Why is this?

The model with the log link is fitting the mean on the log scale, the
Gaussian errors will be on the natural scale. So the residual (or error)
variance will be constant for all mean values of y.

The model with the log of the data and identity link is fitting the mean
and variance on the log scale. So if we retransform log(y) back to y,
the variance will change with the mean.

So a log link isn't the same as a log transformation. The transformation
changes the raw data. The link function doesn't touch the raw data,
instead you can think of it as a transformation of the **model for the
mean of the raw data**.


---

## POST: 2021-05-28-terra-raster-comparison 
Path: posts/2021-05-28-terra-raster-comparison/index.md 

---
date: '5/28/2021'
title: A comparison of terra and raster packages
categories: rstats
published: TRUE
---

A comparison of terra and raster packages
=========================================

The `terra` package looks designed to replace an old favourite `raster`.
It is made by a similar team. The `terra` documentation states “can do
more, is simpler to use, and it is faster.”

So should you make the switch to `terra`? I’ll answer that here.

TLDR: `terra` is simpler and faster than `raster` and will be easy for
existing `raster` users to learn. Compatibility with other packages can
be an issue, but conversion back to `raster` objects is easy. Verdict:
make the switch.

There are a few important considerations when changing packages:

1.  How long will it take me to learn the new syntax?

2.  How much help is available online?

3.  Is it faster than what I used to use?

4.  Will it be compatible with other packages I use?

I will test each in turn.

The data
--------

We’ll use [this data from one of my
courses](https://www.seascapemodels.org/data/data-wrangling-spatial-course-data.zip).

 1 How long will it take to learn terra’s syntax?
-------------------------------------------------

First, let’s take a look at some basic syntax and compare it with raster

You can read in data much the same way, with the command `rast()`:

    library(terra)
    r <- rast("data-for-course/spatial-data/MeanAVHRRSST.grd")
    plot(r)

![](2021-05-28-terra-raster-comparison/unnamed-chunk-1-1.png)

    ext(r)

    ## SpatExtent : 82.5, 181.25, -72.25, -9.75 (xmin, xmax, ymin, ymax)

Now let’s crop and reproject it:

    #create an extent object
    ext2 <- ext(r)

    #constrain it in x direction
    ext2[1] <- 120
    ext2[2] <- 170

    r2 <- crop(r, ext2)

    r3 <- project(r2, "+proj=robin +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs +towgs84=0,0,0")

    plot(r3)

![](2021-05-28-terra-raster-comparison/unnamed-chunk-2-1.png)

So much of the syntax is familiar (or identical), if slightly different.
It took me about 10 minutes to translate what I know from raster to
terra syntax.

Note there are some important caveats with terra when it comes to
cluster computations and saving data see `?terra` for more information.

 2 How much help is available online?
-------------------------------------

It’s early days yet. But the terra package documentation is outstanding,
as good as it was for raster. This was one reason raster became so
popular.

`?terra` provides a very helpful description, a menu of functions and at
the very end a translation of function names from raster to terra (many
are the same)

So users will be once again grateful to Robert Hijmans and the
authorship team for the effort tney put into package documentation

There are a few courses/ blogs online if you google it and some limited
posts on stackexchange sites.

No vignette with the package as yet.

So the verdict is that the documentation of the package and functions is
excellent. Currently, there is limited existing documentation of
troubleshooting errors and bugs online. So you might have to ask
yourself. But online content will grow as the package becomes more
popular.

 3 Is terra faster than raster?
-------------------------------

I take the author’s word that its faster, but let’s see how much faster:

    library(microbenchmark)

    r_raster <- raster::raster("data-for-course/spatial-data/MeanAVHRRSST.grd")
    robin_proj <- "+proj=robin +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs +towgs84=0,0,0"

    tout <- microbenchmark(
    project(r, robin_proj),
    raster::projectRaster(r_raster, crs = robin_proj),
    times = 10
    )
    tout

    ## Unit: milliseconds
    ##                                               expr     median    
    ##                             project(r, robin_proj)      76.3  
    ##  raster::projectRaster(r_raster, crs = robin_proj)     529.6

So something like 7 times faster for the computationally demanding task
of reprojecting a raster.

 4 Will terra be compatible with other packages I use?
------------------------------------------------------

The answer here obviously depends on what packages you want to use. A
key one for me is tmap for mapping. This now works with `terra`.

But at the time of first writing this post my version of `tmap` was out of date
and `terra` wasn't compatible with `tmap`. So if you package isn't compatible,
the next question, how onerous is it to convert a
`terra` raster to a `raster` raster?

Here's a demonstration (with my out of date version of `tmap`)

    library(tmap)

    r_raster <- raster::raster(r)

    tm_shape(r_raster) +
      tm_raster()

![](2021-05-28-terra-raster-comparison/unnamed-chunk-4-1.png)

The multi-tool function `raster()` does the job, so I’ll take that for now.

Summary
-------

`terra` looks set to replace `raster`. It is faster and just as easy to
use as `raster`. Making the switch to `terra` isn’t as hard as it may
seem, its use will seem very familiar to `raster` users.

There are probably common errors and bugs with particular data types for
the R community to find and there isn’t help online for those yet. There
will be challenges in compatibility with other packages. But conversion
back to `raster` objects is easy.

There are also new features in `terra`, to handle vector data and manage
very large datasets. So plenty more to explore.


---

## POST: 2019-03-18-bayesian-timeline 
Path: posts/2019-03-18-bayesian-timeline/index.md 

---
date: '3/18/2019'
title: Diary of becoming a Bayesian
categories: [rstats, research-skills]
published: TRUE
---

Here's my timeline of going from frequentist stats to becoming a fully fledged Bayesian eco-statistician.

**2006** Read the *Ecological Detective* (Hilborn and Walters), the philosophy makes sense, the history of falsification is interesting but, geez, the maths looks hard.

**2008** Started PhD. Peers also interested in Bayes stats. But, Prof gets angry and tells us "ANOVA is all you will ever need". We rebel and start a study group on that James Clark book with elephants on the front cover.

Geez, the maths is even harder than I remember.  

Not comfortable with the 'subjective' aspect of Bayesian stats (AKA prior information). But its ok to use Bayesian stats for its flexibility, so long as we use 'uninformed' priors.

**2009** Read that Mick McCarthy book with the frog on the front cover. Start playing around in WinBUGS. BUGS code breaks the mystery of mixed effects models in R. MM models are just a series of equations, and much more than the obscure magic of R model formulas.

**2014** Actually published a paper on something with statistics in it (first time ever).  ([Interdependency of tropical marine ecosystems in
response to climate change]()). Used frequentist GLM. Leant heavily on advice in that Zuur, Ieno et al. book that has penguins on the front cover.  

**2017** Publish first [Bayesian eco-stats paper](). Went all out with a bespoke non-linear latent variable GLM in JAGS. Use broad 'uninformed priors', because the data should speak for themselves.

Brian Fry convinces me there is a big problem with the 'uninformed priors' used in isotope mixing models. Studies with poor data seem to unwittingly present the priors as their result.

**Winter 2017** Obsessed with the apparent simplicity and speed of the INLA rstats package for Bayesian GLMMs. Frequently taking hot baths in evening to read the latest INLA pre-print. Wife thinks I'm odd.

(Later on realize INLA is very fast, but not so simple)

**Autumn 2018** Started paper about sharks with regular frequentist GAMs. Finished paper with Bayesian GAMMs, because lead author wants random effects in a time-series model AND "confidence intervals" plotted on the graph. Too hard with GAMs, easy with Bayes.  

Publish paper on how [Bayesian isotope mixing models]() can't have uninformed priors. It is just mathematically impossible. Now convinced we should always use prior information to develop Bayesian priors.

Obsession with reading INLA in the bath vindicated by publishing in Nature.

Read about 'penalized complexity priors'. Now convinced priors for random effects should be 'informed' (or regularizing), even if we don't have prior information.

**2018/2019** Read that red and black MacElreath's book about rethinking. Agree that using informed priors for fixed effects is actually more conservative than broad priors.

In fact, realize now that no prior is truly 'uninformed', some are just broader than others. Broad priors can't be 'uninformed', because they are just are informed about a high variance.

**2019** Used INLA and Bayesian stats to do a simple linear regression. Never going back to frequentist.

Convinced postdoc to use informed priors for his model. Model works much better, results make much more sense.

**2020** Insist PhD students have to use Bayesian stats over frequentist stats too?  
