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
