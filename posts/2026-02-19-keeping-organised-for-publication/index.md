---
date: '02/19/2026'
title: Keeping files organised for publication
categories: [research, rstats]
published: true
---

Getting files ready for publication can be frustrating when you can't find the right file, or you realize your figures look like 2000s jpeg. 

Here's a list of things I wished I'd done (or my students had done) properly earlier in the paper prep process. Save this list somewhere to refer back to it, it will save you time and frustration. 

- Keep folders organized. Save figures for the pub to a single folder. Likewise have a folder for tables. Towards submission label these files as per the paper e.g. fig1_concepts.png ....

- You R scripts should save plots directly to that folder like ggsave("plots/fig1-lineplot.png...)

- Make a final results script that reads in the final outputs and calculates any stats/metrics you quote in the results in the order they are written in the results. This helps with updating this section if you have to re-run or change something during review and for cross checking with the MS.

- If assembling figures in powerpoint, save original powerpoint in this folder also

- Always save figures in high res .png format, ready for publication. e.g. ggsave("plots/bias_sensitivity_analysis.png", final_plot, width = 12, height = 6, dpi = 300)

- Have separate R scripts that make pub ready figures (e.g. load final model fits and make figures). This way you can quickly go back into and edit them. Obviously make the scripts easy to find with clear names and project folder structure.

- Even better save both .png and .pdf versions. Never use .jpg (.jpg is for photos)

- When revising your ms to respond to reviews turn on track changes the entire time. You should resubmit the track changed version as one of the files. 

- Double check how coauthors spell their names/institutions against their previous papers, before you submit