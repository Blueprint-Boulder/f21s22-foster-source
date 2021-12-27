# Foster Source Respite App

## TODO

- [ ] Updating account
  - [ ] Backend endpoints
  - [ ] Frontend forms
- [ ] Complete Profile
  - [ ] Backend Routes
  - [ ] Capture frontend user when they have not yet completed their account
    - user should not be able to visit any other page until they complete their account
- [ ] Deployment
  - [ ] Make sure all configurations work in the cloud
  - [ ] Dockerize the backend?
  - [ ] Set up CI/CD
  - [ ] Set up AWS database
- [ ] AWS
  - [ ] Re-add everyone to AWS
  - [ ] Get out of sandbox mode on emails
- [ ] Images
  - [ ] Implement actual S3 image fetching on front end instead of placeholder images
- [ ] Account Page
  - Different from profile page
  - [ ] Update account specific details
  - [ ] Delete account
- [ ] Profile Page
  - [ ] Finish profile page
  - [ ] Allow updating of attributes for profile
- [ ] Login
  - [ ] Work out bugs in login and sessions (ex. If you are insufficient privilege to go to a page it takes you back to the login page sometimes, whereas it should show you a 404)
  - [ ] Logout
  - [ ] Forgot your password?
- [ ] Announcements
  - [ ] Make recent announcements not return anything after maybe a week?
- [ ] Mod/Admin
  - [ ] Mod / Admin signup page
  - [ ] Mod / Admin approvals frontend
  - [ ] Mod / Admin approvals backend
  - [ ] Remove "Profile" tab on nav bar for mods and admins

### Stretch Goals

- [ ] Reporting functionality
- [ ] User Forum
- [ ] Feature requests + bug reporting

## System Set-Up

This project is going to be built in angular, so to develop you will need to properly set up your environment.
The commands that I'll write in this document will be geared towards Linux, but should also work on MacOS.
If you are running Windows, there are equivalent commands that you will need to translate to. (It may be easier to
develop within a virtual Linux environment if you are on Windows).

1. Ensure that you have Node and NPM (node package manager) installed.
2. Make sure that your npm version is 7.5.2 with `sudo npm install npm@7.5.2 -g`
3. Ensure that `npx` is installed globally on your machine with `sudo npm install -g npx`
4. Install the Angular command line tool with `sudo npm install -g @angular/cli`
5. Run `npm install` when cloning the fresh repository.

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

Make sure to commit often! It will be much easier to fix errors incrementally rather than all at once before pushing.

When pushing, the test suite will be run. You will not be able to push until all tests pass.

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

Run `ng generate module [module name]` to generate a module.  
Run `ng generate component [module name]/component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
Run `ng generate service services/[service name]/[service name]` to generate a service. The two service names are intentional to place the service in a subdirectory with the same name.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

> > > > > > > master
