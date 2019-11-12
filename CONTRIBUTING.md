# How to contribute to this project

First off, thanks for your interest in contributing to this project. Thank you for showing leadership through ownership in MAD Tech :-D

This guide assumes that you have a github account and a basic understanding of how Git works. If not, I'd recommend that you go thru [this guide](https://kbroman.org/github_tutorial/) first

## Setup

First, **fork the project to your personal account**. Go to the github page for [this project](https://github.com/makeadiff/dcdc) and click on the Fork button ot the top right cornor. This will create a copy of the repository in your personal account.

Now **clone the forked project to your system**...

`git clone git@github.com:<your github username>/dcdc.git`

**Install libraries** using NPM

`cd dcdc
npm install`

## Submiting contributions

**Create a branch** that you will have your changes

`git checkout -b "*<branch name>*"`

Make all the changes you want to that branch. And **commit the changes**. PS: This will run the linting tool to make sure your code is formated correctly.

`git commit -am "*<description of the changes you made>*"`

**Push the code to your remote repository** as and when needed

`git push`

Note: You might have to do this when pushing the branch for the first time...

`git push --set-upstream origin *<branch name>*`

Once all the changes are made and you can **create a pull request**. This will notify the admin of the project to merge your code in with the master branch. You can do this by going to the project page on your account(eg. github.com/*<your github username>*/dcdc.git). There should be a '**Compare & pull request**' button at the top - click on that. Write a few comments on what the feature is about and submit the request.

Now the admin of the main repository will merge your feature branch into the main branch.

## Working with Others 

You'll need to sync your local repository with the main online repository. This will get you the code that other people are commiting to the repository. You do this by **adding the main repository as an 'upstream' branch**.

`git remote add upstream git@github.com:makeadiff/dcdc.git`

If you still have doubts, check out a [video guide to this process](https://www.youtube.com/watch?v=8UguQzmswC4)