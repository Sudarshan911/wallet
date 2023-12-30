import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Wallet.css'

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
    return <div className='row justify-content-center mt-5'>  <div className="loader "></div> </div>;
}

  return (
    <div className="container m-y-5 p-5">
        < div className="card">
            <>
              <div className="card-header bg-dark text-white text-center">
                <p className="display-4 mb-0">Hello {walletData.name},</p>
              </div>
              <div className="card-body text-center text-white bg-dark">
                <>
                  <p className="display-5">
                    <strong>Balance:</strong> {walletData.balance.toFixed(4)}
                  </p>
                  <Link to={`/wallet/${walletId}/transactions`} className="btn btn-primary">
                    Create Transaction
                  </Link>
                </>
              </div>
            </>   
        </div>
    </div>
  );
}
