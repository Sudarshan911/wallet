import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/UseFormBackup';
import axios from 'axios';

export default function UserInput() {
    const navigate = useNavigate();
    const { formData, errors, isValid, submitError, handleChange, dispatch } = useForm(
        {
            name: '',
            amount: '',
        },
        {
            name: { required: true },
            amount: { type: 'number' },
        }
    );

    const handleWalletInitialized = (newWalletId) => {
        // Navigate to the WalletInfo page with the new walletId
        console.log(newWalletId);
        navigate(`/wallet/${newWalletId}`);
    };
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const requestBody = {};

            Object.entries(formData).forEach(([key, value]) => {
                // Exclude fields with empty or null values
                if (value !== '' && value !== null) {
                    requestBody[key] = value;
                }
            });

            const walletData = await axios.post(
                process.env.REACT_APP_API_BASE_URL + 'wallet',
                requestBody
            );
            console.log(walletData.data._id);
            localStorage.setItem('walletId', JSON.stringify(walletData.data._id));
            dispatch({ type: 'SET_IS_VALID', payload: true });
            dispatch({ type: 'SET_SUBMIT_ERROR', payload: null }); // Clear any previous submission errors
            handleWalletInitialized(walletData.data._id);
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
        <div className="container p-4 bg-dark text-white">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="walletName" className="form-label">
                        UserName
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Please enter your username."
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="walletAmount" className="form-label">
                        Initial Balance
                    </label>
                    <input
                        type="number"
                        className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                        value={formData.amount}
                        name="amount"
                        onChange={handleChange}
                        placeholder="Please enter your opening balance."
                    />
                    {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                    Submit
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
