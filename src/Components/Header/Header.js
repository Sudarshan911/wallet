import React from "react";
import './Header.css'
import {
  Link
} from "react-router-dom";
export default function Header() { 
  const  walletId  = (localStorage.getItem('walletId')) ? JSON.parse(localStorage.getItem('walletId')) : null
  console.log(walletId);
    return <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link"  to="/home">Wallet</Link>
            </li>
            {walletId && <li className="nav-item">
            <Link className="nav-link"  to={`/wallet/${walletId}/transactions`}>Transact</Link>
          </li>}
          {walletId && <li className="nav-item">
            <Link className="nav-link"  to={`/wallet/${walletId}/transactionList`}>Statement</Link>
          </li>}
        </ul>
      </div>
    </div>
  </nav>
}

