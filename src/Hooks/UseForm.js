import { useReducer } from 'react';

const initialState = {
  formData: {},
  errors: {},
  isValid: false,
  submitError: null,
};

const actionTypes = {
  SET_FORM_DATA: 'SET_FORM_DATA',
  SET_ERRORS: 'SET_ERRORS',
  SET_IS_VALID: 'SET_IS_VALID',
  SET_SUBMIT_ERROR: 'SET_SUBMIT_ERROR',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FORM_DATA:
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case actionTypes.SET_ERRORS:
      return { ...state, errors: action.payload };
    case actionTypes.SET_IS_VALID:
      return { ...state, isValid: action.payload };
    case actionTypes.SET_SUBMIT_ERROR:
      return { ...state, submitError: action.payload };
    default:
      return state;
  }
};

const useForm = (initialFormState, validationConfig) => {
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    formData: { ...initialState.formData, ...initialFormState },
  });

  const handleChange = (event) => {

    const { name, value } = event.target;
    dispatch({ type: actionTypes.SET_FORM_DATA, payload: { [name]: value } });
    const validationErrors = validateForm({ ...state.formData, [name]: value }, validationConfig[name], name);
    dispatch({ type: actionTypes.SET_ERRORS, payload: validationErrors });
    dispatch({ type: actionTypes.SET_IS_VALID, payload: Object.keys(validationErrors).length === 0 });
  };

  return { ...state, handleChange, dispatch };
};

const validateForm = (data, validationRules, currentEvent) => {
  const errors = {};

  if (validationRules?.required && !data[currentEvent]) {
    errors[currentEvent] = 'This field is required.';
  }

  if (validationRules?.positive && data[currentEvent] <= 0) {
    errors[currentEvent] = 'Please enter a positive number.';
  }

  

  if (validationRules?.type === 'number' && (isNaN(data[currentEvent]) || data[currentEvent] === '')) {
    errors[currentEvent] = 'Must be a number.';
  }
  if (validationRules?.type === 'number' && (isNaN(data[currentEvent]) || data[currentEvent] === '')  ) {
    errors[currentEvent] = 'Must be a number.';
  }
  if (validationRules?.type === 'number' && data[currentEvent].toString().split('.')[1]?.length > 4  ) {
    errors[currentEvent] = 'Maximum prcision limit is 4.';
  }
  return errors;
};

export default useForm;