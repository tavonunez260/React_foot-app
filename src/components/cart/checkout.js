import classes from "./checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = props => {
  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameInputHandler,
    inputBlurHandler: nameBlurHandler,
    resetHandler: resetName} = useInput(value => value.trim() !== '');
  const {
    value: enteredAddress,
    hasError: addressHasError,
    isValid: addressIsValid,
    valueChangeHandler: addressInputHandler,
    inputBlurHandler: addressBlurHandler,
    resetHandler: resetAddress} = useInput(value => value.trim() !== '');
  const {
    value: enteredCity,
    hasError: cityHasError,
    isValid: cityIsValid,
    valueChangeHandler: cityInputHandler,
    inputBlurHandler: cityBlurHandler,
    resetHandler: resetCity} = useInput(value => value.trim() !== '');
  const {
    value: enteredPostalCode,
    hasError: postalCodeHasError,
    isValid: postalCodeIsValid,
    valueChangeHandler: postalCodeInputHandler,
    inputBlurHandler: postalCodeBlurHandler,
    resetHandler: resetPostalCode} = useInput(value => value.trim() !== '');
  let formIsValid = false;
  if(nameIsValid && addressIsValid && cityIsValid && postalCodeIsValid) {
    formIsValid = true;
  }
  const confirmHandler = (event) => {
    event.preventDefault();
    if(!formIsValid) return;
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      postalCode: enteredPostalCode
    });
    resetName();
    resetCity();
    resetAddress();
    resetPostalCode();
  }
  const inputClasses = inputIsInvalid => {
    return  `${classes.control} ${inputIsInvalid ? '' : classes.invalid}`
  }
  return(
    <form onSubmit={confirmHandler}>
      <div className={inputClasses(!nameHasError)}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Name is not valid</p>}
      </div>
      <div className={inputClasses(!addressHasError)}>
        <label htmlFor='address'>Address</label>
        <input
          type='text'
          id='address'
          value={enteredAddress}
          onChange={addressInputHandler}
          onBlur={addressBlurHandler}
        />
        {addressHasError && <p>Address is not valid</p>}
      </div>
      <div className={inputClasses(!cityHasError)}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={enteredCity}
          onChange={cityInputHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>City is not valid</p>}
      </div>
      <div className={inputClasses(!postalCodeHasError)}>
        <label htmlFor='postalCode'>Postal code</label>
        <input
          type='text'
          id='postalCode'
          value={enteredPostalCode}
          onChange={postalCodeInputHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && <p>Postal code is not valid</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout