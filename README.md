# Pull Request Intermediate Diffs
Github has arbitrary commit diffs, but gives you no easy way to access this
view from the pull request page.

## Why?
Have you ever had a long pull request that went back and forth:

* push
* comments
* push
* comments
* push
* etc...

By the second or third round of review you've made a bunch of changes to the
original pull request, but your reviewers still have to look at the *entire*
diff.

Wouldn't it be better if you could just view the diff between the last comment
and the latest commit?

You've been able to do this, manually, for about two years with the github
compare view, but you had to copy and past the SHAs into the url.

This script puts two radio buttons (start, end) next to each commit and
provides a link in the top-left of the screen that generates this url for you.

![Screenshot](https://github.com/sbuss/pull_request_intermediate_diffs/blob/master/images/screenshot1.png)
