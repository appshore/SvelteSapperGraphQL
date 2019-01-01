# Progressive responsive web site for the mysterious Sapeur Corp

This is a work in progress.

Sapeur is the French word for [Sapper](https://en.wikipedia.org/wiki/Sapper), the server side framework of this project.

This full stack Svelte/Sapper project was bootstrapped with the default [Sapper](https://github.com/sveltejs/sapper) template.

It uses the following stack:
* Javascript ES6 as scripting language
* [Svelte](https://svelte.technology) as JS client framework
* NodeJS, [Sapper](https://sapper.svelte.technology), Express as JS server framework
* [w3.css](https://www.w3schools.com/w3css/4/w3.css) as css library
* [Fontawesome](https://www.fontawesome.com/) for icons
* [Apollo GraphQL](https://www.apollographql.com/) stack 
* [MongoDB](https://www.mongodb.com/) Database
* [Cypress](https://www.cypress.io/) as test runner

## Available Scripts

In the project directory, you can run:

### `yarn mongo or npm run mongo`

will start the mongoDB instance. A MongoDb must been installed first with the datafiles in ./db or in another location by setting up the DB_URL prop in ,/src/config.server.js

### `yarn mongoDefault or npm run mongoDefault`
will restore a default dataset in the mongoDb database named sapeur

### `yarn mongoDump or npm run mongoDump`
will dump/backup the database sapeur in the mongoDump folder with the package version as identifier

### `yarn dev or npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build or npm run build`

To build the production code.

### `yarn start or npm run start`

To run the app in production mode.<br/>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn cy:run or npm run cy:run`

To run tests with Cypress

### `yarn cy:open or npm run cy:ruopenn`

To access Cypress dashboard

