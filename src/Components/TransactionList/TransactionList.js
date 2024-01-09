import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";
import { useParams } from 'react-router-dom';
import './TransactionList.css'
import Loader from '../Loader/Loader';

export default function TransactionsList() {
    const { walletId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by date
    const [orderBy, setOrderBy] = useState('desc');
    const [limit, setLimit] = useState(process.env.REACT_APP_PER_PAGE_LIMIT);
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage, sortBy, orderBy, limit]);


    const fetchTransactions = async (nextPage) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}transactions`, {
                params: {
                    walletId: walletId,
                    page: nextPage,
                    limit: limit,
                    sortBy: sortBy,
                    orderBy: orderBy
                }
            }
            );
            setTransactions(response.data.data);
            setTotalPages(Math.ceil(response.data.totalRecords / limit));
            if (limit === 'all') {
                setLimit(response.data.totalRecords)
            }
            setCsvData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching transactions:', error.message);
            setError('Error fetching transactions. Please try again.');
            setLoading(false);
        }
    };



    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (transactions.length === 0) {
        return <p className='text-center'>No transactions available for this wallet.</p>;
    }

    function previousPage() {
        setCurrentPage((pre) => pre - 1)
    }

    function nextPage() {
        setCurrentPage((pre) => pre + 1)
    }

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleOrderByChange = (event) => {
        setOrderBy(event.target.value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-0">
                <div className="d-flex align-items-center">
                    <div className="m-2">
                        <p className="text-info font-weight-bold">Sort and OrderBy</p>
                    </div>
                    <div className="m-2 align-self-start">
                        <select value={sortBy} onChange={handleSortByChange}>
                            <option value="createdAt">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="m-2 align-self-start">
                        <select value={orderBy} onChange={handleOrderByChange}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                    <div className="m-2 align-bottom">
                        <p className="text-info font-weight-bold">Limit</p>
                    </div>
                    <div className="m-2 align-self-start">
                        <select value={limit} onChange={handleLimitChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="all">all</option>
                        </select>
                    </div>
                </div>

                {csvData.length > 0 && (
                    <div className="ml-auto align-self-start">
                        <CSVLink className="btn btn-primary" filename="WalletTransactions.csv" data={csvData}>
                            Export to CSV
                        </CSVLink>
                    </div>
                )}
            </div>


            <h2 className='text-center mb-3 text-warning'>Transactions History</h2>
            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                            <td>{transaction.amount.toFixed(2)}</td>
                            <td>{transaction.newBalance.toFixed(2)}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <tr className='d-flex justify-content-center'>
                <div className='column m-2'>
                    <button type="button" className="btn btn-primary" onClick={previousPage} disabled={currentPage <= 1}>Previous</button>
                </div>
                <div className='pt-2 m-2'>  <span>  {currentPage} of {totalPages} </span></div>
                <div className='column m-2'>
                    <button type="button" className="btn btn-primary" onClick={nextPage} disabled={currentPage >= totalPages}>Next</button>
                </div>
            </tr>
        </div>
    );
}
