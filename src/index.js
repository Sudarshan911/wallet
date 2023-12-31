
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './App';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import WalletInfo from './Components/Wallet/Wallet';
import Transactions from './Components/TransactionInputForm/TransactionInputForm';
import TransactionsList from './Components/TransactionList/TransactionList';
import Home from './Components/Home/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [

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
      {
        path: "/",
        element: <Home/>
      },
       
    ],
  },
  ]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <div className='bg-secondary' id='index'>
      <RouterProvider router={router} />
    </div>
);