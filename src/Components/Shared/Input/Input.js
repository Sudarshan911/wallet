
import { useEffect, useReducer } from 'react'
import './Input.css'
import { validate } from '../../../Utils/validators'
export const Input = ({ label, type, id, placeholder, validators, onInput }) => {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        const { isValid, errorText } = validate(action.val, action.validators, label)
        console.log(action.validators);
        return {
          ...state,
          value: action.val,
          isValid: isValid,
          errorText: errorText
        }
      case 'IS_TOUCHED':
        return {
          ...state,
          isTouched: true
        }
      default:
        return state
    }
  }
  const isRequired = validators.find((record) => record.type === 'REQUIRE')

  const [inputState, dispatch] = useReducer(reducer, { value: '', isValid: isRequired ? false : true, isTouched: false })

  const inputChangeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators
    })
  }

  const onTouchHandler = () => {
    dispatch({ type: 'IS_TOUCHED' })
  }

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid)
  }, [id, inputState.value, inputState.isValid])

  return (
    <>
      <div className="form-group my-2">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        <input
          id={id}
          type={type}
          step={'any'}
          min={0}
          className={`form-control ${!inputState.isValid && inputState.isTouched && 'is-invalid'}`}
          placeholder={placeholder}
          onChange={inputChangeHandler}
          onBlur={onTouchHandler}
        />
        {!inputState.isValid && inputState.isTouched && <div className="invalid-feedback">{ inputState.errorText || `${label} is required.`}</div>}
      </div>

    </>
  )
}