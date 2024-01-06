import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../Hooks/UseForm';
import './TransactionInputForm.css'

export default function Transactions() {
    const { walletId } = useParams();
    const navigate = useNavigate();
    const [transactionType, setTransactionType] = useState('Credit');
    const [loading, setLoading] = useState(false);

    const { formData, submitError, handleChange, dispatch, isValid, errors } = useForm(
        {
            transactionAmount: '',
            description: '',
            transactionType: '',
        },
        {
            transactionAmount: { type: 'number', required: true, positive: true },
            description: { required: true }
        }
    );

    function handleTransactionType() { 
        setTransactionType((pre)=> (pre === 'Credit') ? 'Debit' : 'Credit')
    }
    if (loading) {
        return <div className='row justify-content-center mt-5'>  <div className="loader "></div> </div>;
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setLoading(true);
            const transactionData = {
                amount: parseFloat(formData.transactionAmount),
                description: formData.description,
                transactionType: transactionType
            };

            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}transact/${walletId}`,
                transactionData
            );
            setLoading(false);
            navigate(`/wallet/${walletId}`);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.error('Server Error:', error.response.status, error.response.data);
                dispatch({ type: 'SET_SUBMIT_ERROR', payload: `Server Error: ${error.response.status}` });
                dispatch({ type: 'SET_IS_VALID', payload: true });
            } else if (error.request) {
                console.error('No response received:', error.request);
                dispatch({ type: 'SET_SUBMIT_ERROR', payload: 'No response received from the server.' });
                dispatch({ type: 'SET_IS_VALID', payload: true });
            } else {
                console.error('Request setup error:', error.message);
                dispatch({ type: 'SET_SUBMIT_ERROR', payload: 'Error setting up the request.' });
            }
            dispatch({ type: 'SET_IS_VALID', payload: false });
        }
    };

    return (
        <div className="container p-4 w-50">
            <h2 className='text-center'>Transactions</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="transactionAmount" className="form-label text-warning">
                        Transaction Amount
                    </label>
                    <input
                        type="number"
                        step="any"
                        className={`form-control ${errors.transactionAmount ? 'is-invalid' : ''}`}
                        value={formData.transactionAmount}
                        onChange={handleChange}
                        name="transactionAmount"
                        placeholder="Enter transaction amount"
                        min="0"
                        required
                    />
                    {errors.transactionAmount && <div className="invalid-feedback">{errors.transactionAmount}</div>}

                </div>
                <div className="mb-3">
                    <label htmlFor="walletName" className="form-label text-warning">
                        Description
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        value={formData.description}
                        name="description"
                        onChange={handleChange}
                        placeholder="Please enter description."
                        required
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
                <div className="form-check form-switch form-switch-md">
                    <input className="form-check-input me-2" type="checkbox" role='switch' onChange={handleTransactionType}  id="transactionType" />
                    <label className="form-check-label m-1 text-info" htmlFor="transactionType">{transactionType }</label>
                </div>
                <button type="submit" className="btn btn-primary mb-3" disabled={!isValid}>
                    Submit Transaction
                </button>
            </form>
            {submitError && (
                <div className="alert alert-danger mt-3" role="alert">
                    {submitError}
                </div>
            )}
        </div>
    );
}
