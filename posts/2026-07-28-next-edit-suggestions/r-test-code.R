# Example of using copilot's next edit suggestion as a way to scaffold learning about agentic AI

# I'm going to assume you are using vscode and have the copilot extension installed.

# start simple. Use Ghost text suggetions to complete lines

# Say you have a long-format database  with timeseres for three species
library(dplyr)
library(ggplot2)
dat <- data.frame(
    time = rep(1:10, 3),
    species = rep(c("A", "B", "C"), each = 10),
    value = c(rnorm(10, mean = 5), rnorm(10, mean = 10), rnorm(10, mean = 15))
)

# You want to filter to fit a linear model to the timeseries one species at a time, then extract the slope coefficient and make a labelled plot.

# Start by using ghost text to write the code for one species
datA <- dat |> filter(species == "A")
m1 <- lm(value ~ time, data = datA)
coef(m1)["time"]

ggplot(datA, aes(x = time, y = value)) +
    geom_point() +
    geom_smooth(method = "lm", se = FALSE) +
    labs(
        title = "Species A Time Series",
        x = "Time",
        y = "Value"
    )

# for now we are just developing our ideas for a single case. We are going to be focusing on results for species A. We know we want to generalize the code later to work for any species, but we're not going to worry about that yet

# Next edit suggestions makes the generalization easy. Click teh octocat icon in the bottom R of the vscode window and active 'Next Edit Suggestions'. Note, I recommend leaving this turned off most of the time, as its annoyign when it makes suggestions you don't want.

# Now click above your code for species A and start typing the function name that you will wrap the code in. Copilot will bring up suggestions that usualy work to generalize your code for any `species_name`. You can accept the suggestion by pressing tab.

fit_fun <- function(species_name) {
    datA <- dat |> filter(species == species_name)
    m1 <- lm(value ~ time, data = datA)
    coef(m1)["time"]

    ggplot(datA, aes(x = time, y = value)) +
        geom_point() +
        geom_smooth(method = "lm", se = FALSE) +
        labs(
            title = paste("Species", species_name, "Time Series"),
            x = "Time",
            y = "Value"
        )
}


fit_fun("A")

#That's it. This is a nice scaffold for agentic programming. With agents we want a clear specification - in this case we used  the code for a single species to define what we want. Then the agent does the work to automate that.

# Of course the big differnece here is that our ghost text completion is not a true agent, because it doesn't run the R code and then iterate to improve. But I recommend starting out this way to get a feel for agentic coding.

# One more example. We can use the same next edit approach with text only. Basically write out a recipe for what you want in comments. Then start typing under the first step, the ghost text and next edit suggestions should activate and help you write the rest of the steps.

# A few tips. I set the eagerness of Copilot to 'High', so I get quick suggestions. Sometimes you need to start typing a few characters to kickstart the ghost text suggestions.

# Simulate a new dataset of abundance at x-y coordinates
dat <- data.frame(
    x = runif(100, 0, 10),
    y = runif(100, 0, 10),
    abundance = rnorm(100, mean = 5)
)

# plot a 2D map
ggplot(dat, aes(x = x, y = y, fill = abundance)) +
    geom_tile() +
    scale_fill_viridis_c() +
    labs(
        title = "Abundance Map",
        x = "X Coordinate",
        y = "Y Coordinate"
    )

# fit a model with interaction between x and y
