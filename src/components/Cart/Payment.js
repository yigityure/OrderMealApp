import { useRef, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Payment.module.css';

const isNotTwoDigits = value => value.trim().length !== 2;
const isNotThreeDigits = value => value.trim().length !== 3;
const isNotTwelveDigits = value => value.trim().length !== 12;

const Payment = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    cardNumber: true,
    month: true,
    year: true,
    ccv: true,
  });

  const cardNumberInputRef = useRef();
  const monthInputRef = useRef();
  const yearInputRef = useRef();
  const ccvInputRef = useRef();

  const paymentHandler = event => {
    event.preventDefault();

    const enteredCardNumber = cardNumberInputRef.current.value;
    const enteredMonth = monthInputRef.current.value;
    const enteredYear = yearInputRef.current.value;
    const enteredCcv = ccvInputRef.current.value;

    const enteredCardNumberIsValid = !isNotTwelveDigits(enteredCardNumber);
    const enteredMonthIsValid = !isNotTwoDigits(enteredMonth);
    const enteredYearIsValid = !isNotTwoDigits(enteredYear);
    const enteredCcvIsValid = !isNotThreeDigits(enteredCcv);

    setFormInputsValidity({
      cardNumber: enteredCardNumberIsValid,
      month: enteredMonthIsValid,
      year: enteredYearIsValid,
      ccv: enteredCcvIsValid,
    });

    const formIsValid =
      enteredCardNumberIsValid &&
      enteredMonthIsValid &&
      enteredYearIsValid &&
      enteredCcvIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm(props.user);
  };

  const cardNumberControlClasses = `${classes.control} ${
    formInputsValidity.cardNumber ? '' : classes.invalid
  }`;
  const monthControlClasses = `${classes.control} ${
    formInputsValidity.month ? '' : classes.invalid
  }`;
  const yearControlClasses = `${classes.control} ${
    formInputsValidity.year ? '' : classes.invalid
  }`;
  const ccvControlClasses = `${classes.control} ${
    formInputsValidity.ccv ? '' : classes.invalid
  }`;

  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={paymentHandler}>
        <div className={cardNumberControlClasses}>
          <label htmlFor="cardnumber">Card Number</label>
          <input type="number" id="cardnumber" ref={cardNumberInputRef} />
          {!formInputsValidity.cardNumber && (
            <p>Please enter a valid card number (12 characters long)!</p>
          )}
        </div>
        <div className={classes.asd}>
          <div className={monthControlClasses}>
            <label htmlFor="month">Month</label>
            <input type="number" id="month" ref={monthInputRef} />
            {!formInputsValidity.month && (
              <p>Please enter a valid month (2 characters long)!</p>
            )}
          </div>
          <div className={yearControlClasses}>
            <label htmlFor="year">Year</label>
            <input type="number" id="year" ref={yearInputRef} />
            {!formInputsValidity.year && (
              <p>Please enter a valid year (2 characters long)!</p>
            )}
          </div>
        </div>
        <div className={ccvControlClasses}>
          <label htmlFor="ccv">CCV</label>
          <input type="number" id="ccv" ref={ccvInputRef} />
          {!formInputsValidity.ccv && (
            <p>Please enter a valid ccv (3 characters long)!</p>
          )}
        </div>

        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

export default Payment;
