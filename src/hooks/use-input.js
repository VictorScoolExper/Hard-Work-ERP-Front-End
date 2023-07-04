import { useState, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  // if(action.type === 'INPUT'){
  //     return { value: action.value, isTouched: state.isTouched };
  // }
  // if(action.type === 'BLUR'){
  //     return { isTouched: true, value: state.value }
  // }
  // if(action.type === 'RESET'){
  //     return { isTouched: false, value: '' }
  // }
  // return initialInputState;

  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    case "RESET":
      return { isTouched: false, value: "" };
    default:
      return initialInputState;
  }
};

const useInput = (validateValue) => {
  // we give it a state and reducer function similiar to Redux library
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // we validate the value
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
