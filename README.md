# Planelo Application

Responsive web application based on Ionic 3 with TypeScript.


## Important!
**To work with the application you need to use API.** You can use link to [production](https://api.planelo.com), but it may be outdated for now. Please go through the steps in [planelo-api](https://bitbucket.org/planelo/planelo-api) to run your local instance.


## Table of Contents
 - [Getting Started](#getting-started)
 - [Contributing](#contributing)
 - [File Structure of App](#file-structure-of-app)


## Getting Started

* Clone this repository: `git clone https://bitbucket.org/planelo/planelo-api.git`.
* Run `npm install` from the project root.
* Install the ionic CLI (`npm install -g ionic`)
* Run `ionic serve` in a terminal from the project root.
* Profit

**Note:** Is your build slow? Update `npm` to 3.x: `npm install -g npm`.


## Contributing
Development workflow will be described soon.


## File Structure of App

```
planelo-app/
├── resources/
|
├── src/
|    ├── app/
|    |    ├── app.component.ts
|    |    ├── app.module.ts
|    |    ├── app.template.html
|    |    └── main.ts
|    |
|    ├── assets/
|    |    ├── fonts/
|    |    |    ├── ionicons.eot
|    |    |    └── ionicons.svg
|    |    |    └── ionicons.ttf
|    |    |    └── ionicons.woff
|    |    |    └── ionicons.woff2
|    |    |
|    |    ├── i18n/                      * Contains all translations
|    |    |    └── pl.json               * Polish language
|    |    |
|    |    └── img/
|    |
|    ├── components/                     * Contains all of our components
│    │    └── index.ts                   * List of all components needed in app
|    |
|    ├── pages/                          * Contains all of our pages
│    │    ├── login/                     * Login page
│    │    │    ├── login.html            * LoginPage template
│    │    │    ├── login.ts              * LoginPage code
│    │    │    ├── login.module.ts       * LoginPage module for lazy loading
│    │    │    └── login.scss            * LoginPage stylesheet
│    │    │
│    │    └── tutorial/                  * Tutorial Intro page
│    │         ├── tutorial.html         * TutorialPage template
│    │         ├── tutorial.ts           * TutorialPage code
│    │         └── tutorial.scss         * TutorialPage stylesheet
|    |
│    ├── providers/
│    │     └── utils.ts                  * Useful methods used across the app
|    |
│    ├── services/                       * Contains all Injectables
│    │    ├── _base/                     * Base classes to be extended by other services
│    │    │    ├── base-service.ts       * Base class for Model's service
│    │    │    └── base-store.ts         * Base class for Model's store
│    │    │
│    │    ├── company/                       * Example model from API
│    │    │    ├── company-service.ts        * CompanyService instance with defined API path
│    │    │    ├── company-service.mock.ts   * CompanyService mock for testing
│    │    │    ├── company-store.ts          * CompanyStore defines all methods for model
│    │    │    ├── company-store.mock.ts     * CompanyStore mock for testing
│    │    │    ├── company.ts                * Company model and interface
│    │    │    └── index.ts                  * List of Injectables needed in app
|    |    |
│    │    ├── index.ts                   * List of all exported Injectables to use in app
│    │    └── mock.ts                    * List of all mocks to use in tests
|    |
│    ├── theme/                          * App theme files
|    |     └── variables.scss            * App Shared Sass Variables
|    |
|    └── index.html
|
├── www/
|    ├── assets/
|    └── build/
|    └── index.html
|
├── .editorconfig                       * Defines coding styles between editors
├── .gitignore                          * Example git ignore file
├── LICENSE                             * Apache License
├── README.md                           * This file
├── config.xml                          * Cordova configuration file
├── ionic.config.json                   * Ionic configuration file
├── package.json                        * Defines our JavaScript dependencies
├── tsconfig.json                       * Defines the root files and the compiler options
└── tslint.json                         * Defines the rules for the TypeScript linter
```