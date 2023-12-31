App URL :     https://wallet-frontend.onrender.com/

Its free hosting service, so it will spin down with inactivity. It may take some time to initialise the server on first hit.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

===================================================Steps to run the project=========================================================
1. npm i
2. npm run start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

===================================================Project structure=========================================================

1. react-router-dom is used for client side routing.
2. Bootstrap 5 is used for styling.
3. All the routes are defined in index.js
4. The Application basic structure is maintained in App.js
5. A custom hook "useForm" is used to manage form validation related operations (managing state of whole form). Its used in WalletInputForm and Transaction component
6. Context Api is used to maintain the state (walletId).
7. The pagination logic is handled on server side.
