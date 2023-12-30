import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import Header from "./Components/Header/Header";
import {walletIdContext} from './Context/walletContext.js'

export default function App() {
  const [walletId, setWalletId] = useState( localStorage.getItem('walletId') ? JSON.parse(localStorage.getItem('walletId')) : null)

  return (
    <walletIdContext.Provider value={{walletId:walletId, setWalletId: setWalletId  }}>
   <> <Header />
        <Outlet /> </>
        </walletIdContext.Provider>
  );
}