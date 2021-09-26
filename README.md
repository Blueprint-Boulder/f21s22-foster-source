# Foster Source Respite App

## System Set-Up

This project is going to be built in angular, so to develop you will need to properly set up your environment.
The commands that I'll write in this document will be geared towards Linux, but should also work on MacOS.
If you are running Windows, there are equivalent commands that you will need to translate to. (It may be easier to
develop within a virtual Linux environment if you are on Windows)

1. Ensure that you have Node and NPM (node package manager) installed.
2. Make sure that your npm version is 7.5.2 with `sudo npm install npm@7.5.2 -g`
3. Install the Angular command line tool with `sudo npm install -g @angular/cli`

## Git

### Branches

Our main branches will be `main` and `current-sprint`. `main` needs to always be completely stable and functional. It will be updated at the end of each of our sprints (optimally every
week or two weeks). `current-sprint` will be the branch that we are working off of each sprint. When working on your feature, make sure to branch off of
current-sprint.

- `git checkout current-sprint`
- `git checkout -b [your branch name]`

### Committing

This project is set up in a way that (hopefully) will run both stylistic and functional checks against your code everytime that you
attempt to commit. If there are errors, you will not be able to commit until you fix the errors, re-add and recommit your work
I understand this will probably be pretty annoying, but it ensures consistency and readability across our code-base. If there are
errors that you believe are a result of an issue in the setup and configurations of these tools, please let Jett know.

- `git add .`
- `git commit -m "WHAT CHANGED?"`
- `git push --set-upstream origin [your branch name]` (only needs to be run the first time you push off of this branch. Subsequent pushes can be made with `git push`)

### Merging

All pull requests will need to pass through a code review and receive two OK's before they are merged into current sprint, one from Jett and one from another team member.
Merges/pull requests can be initiated from the Github web interface. Make sure to detail all of the changes you've made in your branch in the description.

### _The following is automatically generated documentation by Angular:_

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
