
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './App';
import ErrorPage from './Components/ErrorPage/ErrorPage';
// import UserInput from './Components/UserInput/UserInputBackup';
import UserInput from './Components/UserInput/UserInput';
import WalletInfo from './Components/Wallet/Wallet';
import Transactions from './Components/Transactions/Transactions';
import TransactionsList from './Components/TransactionList/TransactionList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: (localStorage.getItem('walletId')) ? <WalletInfo   />  : <UserInput />,
      },
      {
        path: "/wallet/:walletId",
        element:  <WalletInfo/>  ,
      },
      {
        path: "/wallet/:walletId/transactions",
        element:  <Transactions/>  ,
      },
      {
        path: "/wallet/:walletId/transactionList",
        element:  <TransactionsList/>  ,
      },
       
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <div className='bg-secondary' id='index'>
      <RouterProvider router={router} />
      </div>
  // </React.StrictMode>
);