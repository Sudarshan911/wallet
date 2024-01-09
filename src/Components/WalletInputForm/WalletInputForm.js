import React, { useCallback, useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/UseForm';
import axios from 'axios';
import { walletIdContext } from '../../Context/walletContext';
import { Input } from '../Shared/Input/Input';
import { VALIDATOR_MAX_PRECISION, VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../Utils/validators';
import Loader from '../Loader/Loader';
import { utilityConstants } from '../../Utils/constants';
import CommonErrors from '../CommonErrors/CommonErrors';

export default function WalletInputForm() {
    const navigate = useNavigate();
    const { setWalletId } = useContext(walletIdContext);
    const [loading, setLoading] = useState(false);
   const[dispatch, onInput, formState] = useForm({
        inputs: {
            name: {
                value: '',
                isValid: false
            },
            amount: {
                value: '',
                isValid: false
            }
        },
        submitError: false
    })

    const handleWalletInitialized = (newWalletId) => {
        // Navigate to the WalletInfo page with the new walletId
        setWalletId(newWalletId);
        navigate(`/wallet/${newWalletId}`);
    };

    const handleSubmit = async (event) => {
        try {
            const requestBody = {};
            for (let input in formState.inputs) { 
                if ( formState.inputs[input].value) {
                    requestBody[input] = formState.inputs[input].value
                }
            }
            setLoading(true)
            const walletData = await axios.post(
                process.env.REACT_APP_API_BASE_URL + 'setup',
                requestBody
            );
            setLoading(false)
            localStorage.setItem('walletId', JSON.stringify(walletData.data._id));
            handleWalletInitialized(walletData.data._id);
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SET_SUBMIT_ERROR', message: utilityConstants.getError(error) });
        }
        finally {
            setLoading(false)
        }
    };

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="container p-4 text-warning mt-3 w-50">
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <Input type='text'
                        id='name'
                        label="UserName"
                        placeholder="Please enter your username."
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={onInput}
                    />
                    <Input
                        type='number'
                        id='amount'
                        label="Initial Balance"
                        placeholder="Please enter your opening balance."
                        validators={[ VALIDATOR_MAX_PRECISION(4), VALIDATOR_MIN(0)]}
                        onInput={onInput}
                    />

                </div>
                <button type="submit" className="btn btn-primary" disabled={!formState.isValid}>
                    Submit
                </button>
            </form>
             {formState.submitError && (
                <CommonErrors dispatch={dispatch} submitError={formState.submitError}  />
            )} 
        </div>
    );
}
