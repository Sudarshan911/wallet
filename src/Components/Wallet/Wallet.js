import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Wallet.css'
import Loader from '../Loader/Loader';

export default function WalletInfo() {
  const [walletData, setWalletData] = useState(null);
  const walletId = JSON.parse(localStorage.getItem('walletId'))
  useEffect(() => {
    if (walletId) {
      // Fetch wallet data using the walletId from the server
      axios.get(`${process.env.REACT_APP_API_BASE_URL}wallet/${walletId}`)
        .then((response) => {
          setWalletData(response.data)
        })
        .catch((error) => console.error('Error fetching wallet data:', error.message));
    }
  }, [walletId]);

  if (!walletData) {
    return <Loader/>;
}

  return (
    <div>
      <div className="container m-y-5 p-5 w-40 d-flex justify-content-center">
        <div className="card">
          <>
            <div className=" text-black text-center wallet-user">
              <p className="display-4 mb-0">Hello <strong>{walletData.name},</strong> </p>
            </div>
            <div className=" text-center text-black">
              <>
                <p className="display-5  wallet-balance">
                  <strong>Balance:</strong> {walletData.balance.toFixed(2)}
                </p>
                <Link to={`/wallet/${walletId}/transactions`} className="btn  transact-button">
                  Create Transaction
                </Link>
              </>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
