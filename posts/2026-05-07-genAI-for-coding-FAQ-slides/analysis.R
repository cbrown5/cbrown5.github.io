library(ggplot2)

# Sample dataset
set.seed(42)
n <- 50
dat <- data.frame(
    x = rnorm(n, mean = 5, sd = 2),
    group = sample(c("A", "B"), n, replace = TRUE)
)
dat$y <- 2 * dat$x + rnorm(n, sd = 1.5)

# X-Y scatter plot
ggplot(dat, aes(x = x, y = y, colour = group)) +
    geom_point(size = 3, alpha = 0.8) +
    geom_smooth(method = "lm", se = FALSE) +
    labs(
        title = "Sample X-Y Plot",
        x = "X variable",
        y = "Y variable",
        colour = "Group"
    ) +
    theme_bw()
