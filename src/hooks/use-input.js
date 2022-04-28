import {useReducer} from "react";

const initialState = {
  value: '',
  isTouched: false
}
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, value: action.value };
    case 'BLUR':
      return { ...state, isTouched: true };
    case 'RESET':
      return { value: '', isTouched: false };
    default:
      return initialState;
  }
}
const init = () => {
  return initialState;
}

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState, init);
  const valueIsValid = validateValue(inputState.value);
  const valueHasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = event => {
    dispatch({type: 'INPUT', value: event.target.value});
  }
  const inputBlurHandler = () => {
    dispatch({type: 'BLUR'});
  }
  const resetHandler = () => {
    dispatch({type: 'RESET'});
  }
  return {
    value: inputState.value,
    hasError: valueHasError,
    isValid: valueIsValid,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: inputBlurHandler,
    resetHandler: resetHandler
  }
}

export default useInput;