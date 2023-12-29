import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function WalletInfo() {
    const [walletData, setWalletData] = useState(null);
    const  walletId  = JSON.parse(localStorage.getItem('walletId'))
    console.log(walletId);
    useEffect(() => {
    if (walletId) {
      // Fetch wallet data using the walletId from the server
      axios.get(`${process.env.REACT_APP_API_BASE_URL}wallet/${walletId}`)
          .then((response) => {
              console.log(response.data);
              setWalletData(response.data)
          })
        .catch((error) => console.error('Error fetching wallet data:', error.message));
    }
  }, [walletId]);

  return (
    <div className="container m-y-5 p-5">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h2 className="mb-0">Wallet Information</h2>
        </div>
        <div className="card-body">
          {walletData ? (
            <>
              <p className="lead">
                <strong>Name:</strong> {walletData.name}
              </p>
              <p className="lead">
                <strong>Balance:</strong> {walletData.balance.toFixed(4)}
              </p>
              <Link to={`/wallet/${walletId}/transactions`} className="btn btn-primary">
                Go to Transactions
              </Link>
            </>
          ) : (
            <p>Loading wallet information...</p>
          )}
        </div>
      </div>
    </div>
  );
}
