---
layout: md_layout
category: Rstats
title: "Barebones guide to creating R packages"
published: false  
---

### Barebones guide to creating R packages  

What follows is a guide for creating R packages for the time-poor.  

I wanted to go from code to an R package with the least hassle possible and couldn't find an easy guide. There is lots of good info out there, but I was initially overwhelmed by all the details. So I sifted through it, and here is my barebones guide. This should get you started and do enough that you can get a package on Github that others can download and use (that is the extent of my testing!).  

Once you get started, I recommend you read  [Cran]() and [Hadley Wickham's online book]()), for a more comprehensive guide.   

First though, what is an R package? It is basically just a standard format for sharing R code and data. A package is just a folder that contains specific files and directories in addition to your own custom code (which should be under specific directories). That doesn't sound too difficult does it?  

You probably need a spare couple of hours at least to make it from start to finish with this guide. Of course it could take longer if you get bugs in your code.   


#### 1. Find a project to turn into a package
It will be best if it is something you are excited about so you are motivated to document and organise the code. Also, better if it is something simple.

[My first R package]() only does three things, none of which are particularly useful if you haven't already done a bunch of pre-analysis. I wrote it up as much to document the methods for my future self, as I did to share the code.  

#### 2. Get [Rstudio]() and the [devtools package]()  
Make sure you have the [devtools] package installed.  It'll be a good idea to update R too, if you haven't done so in over a year.

#### 3. Get a [github account]() and install the Git software  
It's free an easy. You can skip this step if you don't ever want to share your code. But I recommend you do, science should be repeatable, and its hard to repeat without the scripts!  Also, github is a convenient way to back-up your code online and importantly let's you go back to old versions of your code (although it is open access unless you pay a monthly fee for privacy).  

#### Now you are set-up with necessary software, onto the technical stuff  

#### 4. Create an empty R package in R studio  
This is easy, Rstudio can build a template with all necessary folders and intial files for you. Open Rstudio, then click this sequence of buttons:
file > New Project > New Directory > R Package
This will take you to a box. Enter a name into 'Package name'. The name should be all one word (no spaces, _ or - or other special characters).  
You can add source files if you already have some operational functions for your project, using the 'add' button.   
Choose a directory on your computer to store the package. I have a 'Code' folder on my computer that sits at the same level as my 'Documents' folder, but do whatever works for you.  
If you intend to store your package on github, click the 'Create a git repository' button.
Now click 'Create Package' and your new package directory will appear in RStudio, and be created on your computer.  

#### 5. Explore your package  
It is worth familiarizing yourself with the folder structure at this point.  You can use whatever file browser you like to look inside the package, or just click the different elements in in Rstudios 'Files' box.  
Read and delete the file called 'Read-and-delete-me'.  
R/   
man/
NAMESPACE
DESCRIPTION

#### 6. Creating a working folder  
data
code
add to gitignore
load_all()

#### 7. Write a function

>**If you don't already know how to write functions in R** now is a good time to learn. Wickham advanced R programming

#### 8. Document your function

#### 9. Create a package data-set    

#### 10. Document your data-set    

#### 11. Create a plan  
Decide what the package will encompass

#### 12. Vignettes
tutorials  

#### 13. Compile manuals

#### 14. Compile Vignettes
devtools::use_vignette("remixsiar")
devtools::build_vignettes()
clicking 'check' will also create vignettes
#### 15. Testing  

license
http://kbroman.org/pkg_primer/pages/licenses.html

#### 16. Upload to github  
And download, to test it.

#### 17. Tell people about your R package success    
