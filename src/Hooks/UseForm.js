import { useCallback, useReducer } from 'react';



const reducer = (state, action)=> {
  switch (action.type) {
      case 'INPUT_CHANGE':
          let isFormValid = true;
          for (let inputId in state.inputs) {
              if (inputId === action.inputId) {
                  isFormValid = isFormValid && action.value
              }
              else {
                  isFormValid = isFormValid && state.inputs[inputId].isValid
              }
          }
          console.log(isFormValid, state );
          return {
              ...state,
              isValid: isFormValid,
              inputs: {
                  ...state.inputs,
                  [action.inputId]: {
                      value: action.value,
                      isValid: action.isValid
                  }
              }
          }
      case 'SET_SUBMIT_ERROR':
          return {
              ...state,
              submitError :action.message
          }
      default:
          return state
  }
}

const useForm = (initialFormState) => {
  let [formState, dispatch] = useReducer(reducer, initialFormState )

const onInput = useCallback ((id,value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value: value, inputId: id, isValid: isValid })
    console.log('hook isvalid', id,value,isValid);
}, [])
  
  return [dispatch, onInput, formState]
};

export default useForm;
