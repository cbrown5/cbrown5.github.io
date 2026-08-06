# Code for Chris Brown's lab webpage

My personal webpage, view at [https://www.seascapemodels.org](https://www.seascapemodels.org)

Made with [quarto](https://quarto.org/docs/websites/)


## Instructions for creating blogs

1. Make a new folder in the posts directory
2. Add a index.qmd or index.md in that folder
3. Write the post
5. In the terminal use `quarto preview` to re-render just the changes

In the terminal use `quarto render` to re-render the entire site, which updates links etc... 

Or just run the bash script:
`scripts/new-post.sh "My Post Title"`


TODO

clear repo history

Investigate making r blogs in other dir then just brining over the .md and figure files, might be simpler as then I should be able to just render preview? 

test then update Rbloggers link

Improve readership: 

Add Plausible or GoatCounter (privacy-friendly, no cookie banner needed, trivial to add via a <script> include in _quarto.yml's include-in-header) to both the main site and both book repos. Skip Google Analytics — it's heavier than needed here and the privacy-friendly options are a one-line embed.

3. Make the RSS feed visible and promote it directly
The feed already exists but isn't advertised. Add a visible RSS icon/link on the blog listing page (bluecology_blog.qmd) so returning readers can subscribe instead of relying on remembering to check back.

Where blog posts already relate to book content (e.g. the 2025-10-05-AI-assistants-for-scientific-coding post that appears to be the seed of the AI assistants book), add an explicit link from the post to the book and vice versa. This costs a couple of minutes but turns blog traffic into book traffic and gives blog readers a next-step "read more."

