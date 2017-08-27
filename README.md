# `webtrekk-assignment-angular`

This project was developed to accomplish webtrekk angularJS task assigned


## Getting Started

To get you started you can simply clone the `webtrekk-assignment-angular` repository and install the dependencies:

### Prerequisites

You need git to clone the `webtrekk-assignment-angular` repository.

We also use a number of Node.js tools to initialize and test `webtrekk-assignment-angular`. You must have Node.js
and its package manager (npm) installed.

### Clone `webtrekk-assignment-angular`

Clone the `webtrekk-assignment-angular` repository using git:

```
git clone https://github.com/bablooarmy/webtrekk-assignment-angular.git
cd webtrekk-assignment-angular
```

If you just want to start a new project without the `webtrekk-assignment-angular` commit history then you can do:

```
git clone --depth=1 https://github.com/bablooarmy/webtrekk-assignment-angular.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [Node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`webtrekk-assignment-angular` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    version/              --> version related components
      version.js                 --> version module declaration,
                                      basic "version" value service
                                      "customerFactory" that add/edit/delete customers data back and forth to localStorage
                                      as well when localStorage is empty pulls json data from "data/*" json flat files and stores into localStorage. Even navigation data also fetched from json data and stored in localStorage when app was initialized and later all transaction happens in localStorage
      version_test.js            --> "version" value, customerFactory service tests
      version-directive.js       --> custom directives
                                      "appVersion" that returns the current app version
                                      "dropdownList" that replace element with gender stepper components
                                      "formatLifetimeValue" that formats customer lifetime value when user inputs number in input element
      version-directive_test.js  --> version directive tests
                                      "formatLifetimeValue" directive tests
      interpolate-filter.js      --> custom interpolation filter
                                      "genderFormat" for formatting m -> Male and w -> Female in customer list
                                      "birthFormat" for calculating age based on birthdate ex: birthday=1982-03-07 to age=35 in customer list
      interpolate-filter_test.js --> interpolate filter tests
                                      "genderFormat" tests
                                      "birthFormat" tests
  customers/                --> the customers view template and logic
    customers.html            --> the customers list grid partial template
    customers.js              --> the controller logic includes sorting, navigation to add/edit/navi view, delete customer
    customers_test.js         --> tests of the controller
    details/                --> the customers detail view template and logic
      details.html            --> the customer details form partial template
      details.js              --> the controller logic includes editing existing customer as well as adding new.
                                  Form validation on required fields
      details_test.js         --> tests of the controller
    navigation/                --> the navigation view template and logic
      navigation.html            --> the customer's navigation list partial template
      navigation.js              --> the controller logic includes sorting navigation list and navigate back to customers list
      navigation_test.js         --> tests of the controller
  data/                 --> customer and navigation master json data files
    CustomerData.json     --> Customer JSON data has to be stored in localStorage when app initialized
    NavigationData.json   --> Navigation JSON data has to be stored in localStorage when user navigate to
                              customers navigation list for first time
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```


## Testing

There are two kinds of tests in the `webtrekk-assignment-angular` application: Unit tests and end-to-end tests.

### Running Unit Tests

The `webtrekk-assignment-angular` app comes preconfigured with unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. We provide a Karma configuration file to run them.

* The configuration is found at `karma.conf.js`.
* The unit tests are found next to the code they are testing and have an `_test.js` suffix (e.g.
  `view1_test.js`).

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```


<a name="e2e-testing"></a>
### Running End-to-End Tests

The `webtrekk-assignment-angular` app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner. It uses native events and has
special features for Angular applications.

* The configuration is found at `e2e-tests/protractor-conf.js`.
* The end-to-end tests are found in `e2e-tests/scenarios.js`.

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor can
interact with it.

**Before starting Protractor, open a separate terminal window and run:**

```
npm start
```

In addition, since Protractor is built upon WebDriver, we need to ensure that it is installed and
up-to-date. The `webtrekk-assignment-angular` project is configured to do this automatically before running the
end-to-end tests, so you don't need to worry about it. If you want to manually update the WebDriver,
you can run:

```
npm run update-webdriver
```

Once you have ensured that the development web server hosting our application is up and running, you
can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

**Note:**
Under the hood, Protractor uses the [Selenium Standalone Server][selenium], which in turn requires
the [Java Development Kit (JDK)][jdk] to be installed on your local machine. Check this by running
`java -version` from the command line.

If JDK is not already installed, you can download it [here][jdk-download].


## Updating Angular

Since the Angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools to easily update the dependencies. Simply run the preconfigured
script:

```
npm run update-deps
```

This will call `npm update` and `bower update`, which in turn will find and install the latest
versions that match the version ranges specified in the `package.json` and `bower.json` files
respectively.

## Serving the Application Files

While Angular is client-side-only technology and it is possible to create Angular web apps that
do not require a backend server at all, we recommend serving the project files using a local
web server during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, XHR,
etc to function properly when an HTML page is opened via the `file://` scheme instead of `http://`.

### Running the App during Development

The `webtrekk-assignment-angular` project comes preconfigured with a local development web server. It is a Node.js
tool called [http-server][http-server]. You can start this web server with `npm start`, but you may
choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own web server, such as Apache or Nginx. Just
configure your server to serve the files under the `app/` directory.

### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but
the general rule is that all you need in production are the files under the `app/` directory.
Everything else should be omitted.

Angular apps are really just a bunch of static HTML, CSS and JavaScript files that need to be hosted
somewhere they can be accessed by browsers.

If your Angular app is talking to the backend server via XHR or other means, you need to figure out
what is the best way to host the static files to comply with the same origin policy if applicable.
Usually this is done by hosting the files by the backend server or through reverse-proxying the
backend server(s) and web server(s).
