import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../Hooks/UseForm';
import './TransactionInputForm.css'
import { utilityConstants } from '../../Utils/constants';
import { Input } from '../Shared/Input/Input';
import { VALIDATOR_MAX_PRECISION, VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../Utils/validators';
import Loader from '../Loader/Loader';
import CommonErrors from '../CommonErrors/CommonErrors';

export default function Transactions() {
    const { walletId } = useParams();
    const navigate = useNavigate();
    const [transactionType, setTransactionType] = useState('Credit');
    const [loading, setLoading] = useState(false);

    const[dispatch, onInput, formState] = useForm({
        inputs: {
            description: {
                value: '',
                isValid: false
            },
            transactionAmount: {
                value: '',
                isValid: false
            }
        },
        submitError: false
    })

    function handleTransactionType() {
        setTransactionType((pre) => (pre === 'Credit') ? 'Debit' : 'Credit')
    }
    if (loading) {
        return <Loader/>;
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const transactionData = {
                amount: parseFloat(formState.inputs['transactionAmount'].value) ,
                description: formState.inputs['description'].value,
                transactionType: transactionType
            };

            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}transact/${walletId}`,
                transactionData
            );
            setLoading(false);
            navigate(`/wallet/${walletId}`);
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SET_SUBMIT_ERROR', message: utilityConstants.getError(error) });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="container p-4 w-50">
            <h2 className='text-center'>Transactions</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <Input type='number'
                        id='transactionAmount'
                        label="Transaction Amount"
                        placeholder="Enter transaction amount."
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAX_PRECISION(4), VALIDATOR_MIN(0)]}
                        onInput={onInput}
                    />

                    <Input type='text'
                        id='description'
                        label="Description"
                        placeholder="Please enter description."
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={onInput}
                    />

                </div>
                <div className="form-check form-switch form-switch-md">
                    <input className="form-check-input me-2" type="checkbox" role='switch' onChange={handleTransactionType} id="transactionType" />
                    <label className="form-check-label m-1 text-info" htmlFor="transactionType">{transactionType}</label>
                </div>
                <button type="submit" className="btn btn-primary mb-3" disabled={!formState.isValid}>
                    Submit Transaction
                </button>
            </form>
            {formState.submitError && (
                <CommonErrors dispatch={dispatch} submitError={formState.submitError}  />
            )} 
        </div>
    );
}
