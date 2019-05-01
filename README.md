# LocationManager

## What to expect?

The project contains 2 parts:

### Frontend - Angular 7

The code for the frontend part is in the **client** folder.

### Middleware - NestJS 6

The reason for a middleware is to eliminate the **CORS** limitation imposed by web browsers. Even if you install extensions, it will not allow you to make all the requests.

The middleware is also serving the **Angular** app so it all runs on the same port to avoid **CORS**.

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
cd ../server
npm install

```

## Building and starting the application

Go to the root folder of the project.

Run

```
cd client
npm run build
cd ../server
npm run start

```

Open the browser and navigate to `http://localhost`.

## Running unit tests

Go to the root folder of the project.

To execute the unit tests run:

```
cd client
npm run test
```

## Running end-to-end tests

**!! Before running the E2E tests, you must build and start the application. The command for testing does NOT build the app and it does NOT start the server. The reason for this is that the tests fail because of the CORS limitation**

Go to the root folder of the project.

To execute the E2E tests run:

```
cd client
npm run build
cd ../server
npm run start

```

Open a new terminal inside the root folder of the project and run:

```
cd client
npm run e2e

```

## Further help

Contact me.
