# LocationManager

## What to expect?

The project contains 2 parts:

### Frontend - Angular 7

The code for the Frontend part is in the **client** folder.

### Middleware - NestJS 6

The reason why there is a middleware is to eliminate the **CORS** limitation imposed by Chrome browser. Even if you install extensions, it will not allow you to make all the requests.

The middleware is also serving the **Angular** app so they run on the same port to avoid **CORS**.

The code for the middleware is in the **server** folder.

## Pre-requisites
- Node ~ 11
- Angular CLI @ 7.3.8
- Chrome ~ 74

## Setting up the project

Go to the root folder of the project.

Run

```
  cd client
  npm install
```

Go to the root folder of the project

Run

```
  cd server
  npm install
```

## Building and starting the application

Go to the root folder of the project.

Run

```
  cd client
  npm run build
```

Go to the root folder of the project.

Run

```
  cd server
  npm run start
```

Open the browser and navigate to `http://localhost`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

**!! Before running the E2E tests, you must build and start the application. The command for testing does NOT build the app and it does NOT start the server. The reason for this is that the tests fail because of the CORS limitation**

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

Contact me.
