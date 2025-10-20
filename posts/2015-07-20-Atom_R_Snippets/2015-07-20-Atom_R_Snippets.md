---
category: rstats
title: "A fast start to R scripts"
date: '20/07/2015'
---

  <h2> A fast start to R scripts </h2>
  <p>I recently heard about the <a href="https://atom.io">Atom</a> text editor. It has
     been designed for coders by coders. The idea is to have a text editor
     that works on any OS and is hackable. That means you can customise
     any of its features, or write your own features.
     It acheives OS independence by using web-technology, i.e. Javascript
     and CSS. If you know these it is easy start hacking Atom, if not, they
     are not that hard to learn (certainly easier than R!). Regardless, you don't
     need to know any programming language to use Atom.
      I am now trying it out for R programming. </p>
      <p>
         In the past I have primarily used the R inbuilt scripter for writing
         code and RStudio for teaching. My hope is that Atom will make life
         easier and will also be flexibile, but easy enough to use for teaching.
      </p>
  <p>
     To help convince you about why switching to Atom is a good idea,
     here is an example of one of its cool features: <em> Snippets</em>
  </p>
  <p>
     <img class="wide_image" src="/images/Atom_Snippets.png" alt="" />
  </p>
  <p>
     Atom Snippets allow you to type a shortcut and hit tab, and it will
     fill in the rest for you. One way to use Snippets would be to set up
     Snippets for common program structures, to save you time in re-writing
     them every time you start a new project
  </p>
  <p>
     One of the most common things to do in R is to import data and manipulate
     it into a usable form. So here is a step by step guide for how to set
     up such a snippet in Atom
  </p>
  <h3>Step 1: Install Atom</h3>
  <p>
     Atom is available <a href="https://atom.io">here</a>
  </p>
  <h3>Step 2: Open Your Snippets </h3>
  <p>
     Got to the 'Atom' menu and select 'Open your snippets'
  </p>
  <h3>Step 3: Write your snippet</h3>
  <p>
     Snippet code uses the .cson (CoffeeScript Object Notation) structure to
     delineate commands and code. Here is an example to create a common
     R script:</p>
     <pre><code>'.source.r':
      'R data import':
        'prefix': 'R_data_import'
        'body': """
        rm(list = ls())
        setwd('')
        library(dplyr)
        library(tidyr)
        dat <- read.csv('.csv', header = TRUE)
        head(dat)
        """</code> </pre>
   <p>
     The first line is the file type, the second line is the name,
     the third line is the shortcut name and the fourth line 'body'
     is the snippet. You can enclose multiline snippets in '"""' as I
     have done here.
  </p>
<p>
   Now, create a new file and save it with the '.r' (lower case is important)
    extension. When you start
   writing your file type 'R_data_' and a drop down box should appear. Scroll
   down and select 'R_data_import' and hit tab. It should auto-fill your script
   and you are ready to begin with some data wrangling.
</p>
<p>
   If you want to evalute code you write in Atom, check out Atoms 'eval-r' package
   (OSX only).
</p>
</div>

</div>
