import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/UseFormBackup';

export default function Transactions() {
    const { walletId } = useParams();
    const navigate = useNavigate();

    const { formData, submitError, handleChange, dispatch, isValid, errors } = useForm(
        {
            transactionAmount: '',
            description: '',
        },
        {
            transactionAmount: { type: 'number', required: true },
            description: {required: true}
        }
    );

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const transactionData = {
                amount: parseFloat(formData.transactionAmount),
                description: formData.description,
            };

            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}transact/${walletId}`,
                transactionData
            );
            navigate(`/wallet/${walletId}`);

        } catch (error) {
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
        <div className="container p-4 ">
            <h2>Transactions</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="transactionAmount" className="form-label">
                        Transaction Amount
                    </label>
                    <input
                        type="number"
                        className={`form-control ${errors.transactionAmount ? 'is-invalid' : ''}`}
                        value={formData.transactionAmount}
                        onChange={handleChange}
                        name="transactionAmount"
                        placeholder="Enter transaction amount"
                        required
                    />
                    {errors.transactionAmount && <div className="invalid-feedback">{errors.transactionAmount}</div>}

                </div>
                <div className="mb-3">
                    <label htmlFor="walletName" className="form-label">
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
