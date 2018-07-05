---
title: Survey your audience and visualise the results with R and Google forms
layout: default
category: rstats
published: TRUE
---

Survey your audience and visualise the results with R and Google forms
======================================================================

I wanted to make my [presentation on dataviz at the UQ School of
Bioinformatics](http://www.seascapemodels.org/rstats/2018/07/04/dataviz2018_notes.html)
more interactive.

A quiz is a good way to engage your audience. Given I was giving a talk
about R datavisuals I thought it would be fun to visualise the quiz
results using R live with the audience. To top it off, we posted the
results to Twitter.

This blog describes is how I did that.  

{% include r-courses-ad.html %}

You could also use this system to survey our audience and share the
results live. Just prepare you R code and set it to run at a certain
time during your talk with a task scheduling algorithm.

Setting up the survey
---------------------

I used Google Forms to do my quiz. [You can take it
here](https://docs.google.com/forms/d/e/1FAIpQLSd5v5d15q8KO7VyfjRRrfGV1NadKVyLpyAdzqu2Fvreq40UXg/viewform).
I posed a few questions that challenged the audience to think about the
best way to visualise data.

It is pretty easy to set up a survey if you have a gmail account. A few
tips:

-   You can add images, which is great posing questions about results.

-   I used the 'short answer' input for numeric answers. If you click
    the validation tab at the bottom of each 'short answer' question you
    can require users enter certain types of numbers (e.g. within a
    range).

-   Think carefully about limiting required inputs if you want to avoid
    bugs that might arise from unexpected answers.

-   There is a green button at the top of the form that let's you link
    it to a google sheet. Do this.

-   You can make the sheet public, so other people can use it, but
    changing the sharing settings.

Connecting to your survey answers in R
--------------------------------------

I used the `googlesheets` package to read my survey answers from the
(public) spreadsheet. You will need to authenticate yourself first:

    library(googlesheets)
    gs_ls()

    ## # A tibble: 24 x 10
    ##    sheet_title  author perm  version updated             sheet_key ws_feed
    ##    <chr>        <chr>  <chr> <chr>   <dttm>              <chr>     <chr>  
    ##  1 Dataviz qui~ chris~ rw    new     2018-07-05 10:39:47 10i3v3NI https:~
    ##  2 Science-pol~ "    ~ rw    new     2018-07-05 06:04:45 1aP8fYu1 https:~
    ##  3 Dataviz qui~ chris~ rw    new     2018-07-04 10:11:18 156deWbu https:~
    ##  4 "         S~ chris~ rw    new     2018-06-29 23:26:03 1yiBlbGB https:~
    ##  5 "    Untitl~ chris~ rw    new     2018-06-23 07:06:59 16aeSpQe https:~
    ##  6 "      Used~ chris~ rw    new     2018-03-27 23:49:58 15FLPXNj https:~
    ##  7 Connectivit~ meg.i~ rw    new     2015-10-13 02:17:29 13B7eLQP https:~
    ##  8 "  SEL Inte~ "    ~ r     new     2014-11-04 10:00:03 1ewHgpn6 https:~
    ##  9 "  MSCB wed~ chris~ rw    new     2014-04-28 07:55:02 1a3GmpZT https:~
    ## 10 quantmareco~ chris~ rw    new     2014-01-29 05:33:22 1SKWMa_k https:~
    ## # ... with 14 more rows, and 3 more variables: alternate <chr>,
    ## #   self <chr>, alt_key <chr>

This will prompt you to login to your google account and authenticate an
app that allows the connection to happen.

Now we can load our data:

    sheet_url <- "https://docs.google.com/spreadsheets/d/10i3v3NIVpgmURyLVzsiadPAMGeqa7dLFcDb9sqFe8KA/edit#gid=1513779153"
    dataviz <- gs_url(sheet_url) #creates connection

    ## Sheet-identifying info appears to be a browser URL.
    ## googlesheets will attempt to extract sheet key from the URL.

    ## Putative key: 10i3v3NIVpgmURyLVzsiadPAMGeqa7dLFcDb9sqFe8KA

    ## Sheet successfully identified: "Dataviz quiz 2018 v2 (Responses)"

    dat <- gs_read(dataviz) #reads data into R

    ## Accessing worksheet titled 'Form Responses 1'.

    ## Parsed with column specification:
    ## cols(
    ##   Timestamp = col_character(),
    ##   `Examine the figure below. At what point does the number of people in the shopping centre decrease: A, B, C or D?` = col_character(),
    ##   `In the data presented below in the barchart, what per cent of people were sick?` = col_integer(),
    ##   `In the data presented below in the pie chart, what per cent of people were absent?` = col_integer(),
    ##   `Where are you sitting in this room?` = col_character(),
    ##   `How old do you think Chris is?` = col_integer()
    ## )

If you want to keep your sheet private you can use `gs_ls()` to list all
your sheets, and then pick a name to read it in. e.g. like this:

    dataviz <- gs_title("Dataviz quiz 2018 v2 (Responses)")
    dat <- gs_read(dataviz)

Analysing your data
-------------------

The file `dat` we just read in is a dataframe like object (actually a
tibble) where each column is a question and each row is a response. The
first column is a time stamp.

All other columns are titled with your questions.

It will make life easier if we rename the columns to shorter (but still
descriptive) names.

    newnames <- c("timestamp", "shopping",
                  "bar_percent",
                  "pie_percent",
                  "room",
                  "cb_age")
    names(dat) <- newnames

Now let's create some dataviz

    library(ggplot2)
    datplot <- na.omit(dat)
    ggplot(datplot, aes(x = room, y = cb_age)) +
      geom_boxplot() +
      xlab("Position in room") +
      ylab("Guess at CB's age") +
      ylim(0, 75) +
      theme_bw()

![](survey-your-audience_files/figure-markdown_strict/unnamed-chunk-5-1.png)

A boxplot of the audience's guesses at my age by their position in the
room. I limited the y-axis because there were some outrageously large
numbers!

Share the results
-----------------

We could show the audience the results on our screen. But why not let
Twitter know too!

For this, I used the `rtweet` package. `rtweet` is pretty simple to use
*once you've set up an app on Twitter's API and authorised R to access
it*. So get `rtweet` then look at the vignette `vignette("auth")`.
Follow the instructions *to the letter* and you shouldn't have any
problems.

Once authorisation is done, its a simple matter to save our plot as a
png to use in a tweet:

    myplot <- ggplot(datplot, aes(x = room, y = cb_age)) +
      geom_boxplot()
    ggsave(filename = "myplot.png", myplot)

Now just write your tweet and send it off to twitter.

    library(rtweet)
    newstatus = "Chris age as surveyed at  #UQwinterSchool
    @DoktrNick @UQwinterSchool"

    post_tweet(status = newstatus,
               media = "myplot.png")

Next steps?
-----------

So I tried this as a way of doing a live R tutorial. Next step would be
to try and integrate it into a talk without showing the R coding. For
that you would either need to get a friend to run the code or use a
scheduler (like the
[taskscheduleR](https://cran.r-project.org/web/packages/taskscheduleR/index.html)
R package).

Be careful though! You never know what answers people may give if
allowed. So design you code to be robust to strange answers (like that I
am 100 years old).
