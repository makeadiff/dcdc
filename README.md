# DCDC

Dream Camp Data Capture tool. Lets you collect information about student participation at DC. 

## Vision

This tool is the front end of a survey creation mechanism - think Google Forms. It eventually will be able to collect any kind of data on Volunteers, Students, Shelters, Events, etc. Right now its being done thru Google Forms, Sheets or Formad. Eventually, when this app matures, this will replace all of them.

## Project Setup

This app is the front end of the survey system. It takes Survey details, questions, etc from the MAD DB using the API system. We are using Vuex to manage state when doing this.

### Tech Used

- [VueJS](https://vuejs.org/) - JS Framework
- [Vuex](https://vuex.vuejs.org/) - State management system for Vue
- [Vue Router](https://router.vuejs.org/) - Router for Vue
- [Axios](https://github.com/axios/axios) - HTTP Client - for making AJAX calls
- [Core-JS](https://github.com/zloirock/core-js)
- [Bootstrap](https://getbootstrap.com/) - UI Framework
- [NProgress](https://ricostacruz.com/nprogress/) - Progress indicator plugin
- [ESLint](https://eslint.org/) - Code style enforcing / linting.
- Etc.

### Requirements

You'll need the following things in your system to work on this project...

[Git](https://git-scm.com/) - Code Version control tool
[NPM](https://www.npmjs.com/) - Package manager

### Installation

Get a copy of the code on your system. You can do this by cloning this repository...

```
git clone git@github.com:makeadiff/dcdc.git
```

Install all the dependensies need for this project.

```
cd dcdc
npm install
```

To view the app in action, run this command...

```
npm run serve
```

## Contributing

We are looking for people who can help us flesh out this project. If you are interested in helping out, go to our [Contributing page](https://github.com/makeadiff/dcdc/blob/master/CONTRIBUTING.md).
