# Coko Chat Tast

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project root directory, install all dependencies with `npm install`, then create initial DB migration by running

### `npx prisma migrate dev --name init`

Then start the server by running

### `node server/index.js`

Then you can start the app in development mode by running

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**Note: In Chrome, you will have to install the allow CORS extension to allow the browser to make API requests to localhost server**

See [https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related] to install it

## Stack

The stack used is
-- expressjs for the server
-- express-ws to handle websocket connections
-- react frontend
-- prisma ORM for the database
