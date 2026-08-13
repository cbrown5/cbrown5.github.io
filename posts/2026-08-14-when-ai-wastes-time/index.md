---
date: '08/07/2026'
title: When AI coding assistance waste rather than save time
categories: [genAI, research, rstats]
published: true
---

*The time savings are often offset by dead end pursuits*

There's a lot of skill in using AI coding assistance in ways that are effective and actually save your time. I find in many cases, if you jump onto these tools too soon in a project, you end up wasting time that you should have been spending on clear thinking and planning.

In one example of this pattern recently, my student and I were looking to use a new type of model. So, we were reading a wonderful paper about [state changes in a marine ecosystem](https://www.nature.com/articles/s41559-024-02425-5), which had applied hidden markov models to detect state changes. And my student had started to try to apply that package to his data set.

He used an AI coding assistant to help him scaffold the code, which was fairly complex, requiring detailed parameter specifications. And then he came to show me the results. It was clear to me that the model wasn't fitting very well, and was likely over-specified. So more parameters than could be supported by the data.

We then considered alternative R packages for this problem. There's many other packages for doing hidden markov models in R that turn out to be better suited tothe data structures that we have.

So we could have saved some time if we'd done one of two things. Firstly, if we'd started by asking an AI assistant, describing our data structure, and asked: “search for us, the most appropriate types of hidden markov model packages in R for modelling state changes in this data structure”. That would have given us a head start to then research different packages and try to understand which is most appropriate.

Or if we could have just done our own research on different package options at the outset. Then once we'd settled on a package that was most appropriate to our data structure, we could ask an AI assistant to scaffold the code for that particular package.

So, there's a lot of skill in using R for statistics, and having a powerful coding assistant doesn't take away the need for understanding how coding works. In particular, I don’t advise jumping straight into asking AI, [clear planning of software and stats options is needed first](https://besjournals.onlinelibrary.wiley.com/doi/full/10.1111/2041-210x.70267).

*If you'd like email updates on AI posts, follow us on substack*

<div class="substack-post-embed"><p lang="en">When AI coding assistance waste rather than save time by Chris Brown</p><p>The time savings are often offset by dead end pursuits</p><a data-post-link href="https://vitaexmachina.substack.com/p/when-ai-coding-assistance-waste-rather">Read on Substack</a></div><script async src="https://substack.com/embedjs/embed.js" charset="utf-8"></script>