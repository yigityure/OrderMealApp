import Button from '../UI/Button';
import useInput from '../hooks/use-input';
import classes from './SignUpForm.module.css';

const SignUpForm = props => {
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput(value => value.trim().length > 5);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => value.trim() !== '' && value.includes('@'));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(value => value.trim().length > 5);

  const {
    value: enteredPasswordAgain,
    isValid: enteredPasswordAgainIsValid,
    hasError: passwordAgainInputHasError,
    valueChangeHandler: passwordAgainChangeHandler,
    inputBlurHandler: passwordAgainBlurHandler,
    reset: resetPasswordAgainInput,
  } = useInput(value => value.trim().length > 5);

  let formIsValid = false;
  let errorMessage = '';

  if (
    enteredUsernameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredPasswordAgainIsValid
  ) {
    if (enteredPassword !== enteredPasswordAgain) {
      errorMessage = 'Passwords must be same.';
    } else {
      formIsValid = true;
    }
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredUsernameIsValid) {
      return;
    }

    const userData = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onUserSubmission(userData);

    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
    resetPasswordAgainInput();
  };

  const usernameInputClasses = usernameInputHasError
    ? `${classes.invalid}`
    : '';

  const emailInputClasses = emailInputHasError ? `${classes.invalid}` : '';

  const passwordInputClasses = passwordInputHasError
    ? `${classes.invalid}`
    : '';

  const passwordAgainInputClasses = passwordAgainInputHasError
    ? `${classes.invalid}`
    : '';

  return (
    <form className={classes.control} onSubmit={formSubmissionHandler}>
      <div className={usernameInputClasses}>
        <label htmlFor="text">Username</label>
        <input
          type="text"
          id="name"
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          value={enteredUsername}
        />
        {usernameInputHasError && (
          <p className={classes['error-text']}>
            Username must not be 6 character at least.
          </p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className={classes['error-text']}>Please enter a valid e-mail.</p>
        )}
      </div>
      <div className={passwordInputClasses}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
        />
        {passwordInputHasError && (
          <p className={classes['error-text']}>
            Password must not be 6 character at least.
          </p>
        )}
      </div>
      <div className={passwordAgainInputClasses}>
        <label htmlFor="password">Password Again</label>
        <input
          type="password"
          id="confirm-password"
          onChange={passwordAgainChangeHandler}
          onBlur={passwordAgainBlurHandler}
          value={enteredPasswordAgain}
        />
        {passwordAgainInputHasError && (
          <p className={classes['error-text']}>
            Password must not be 6 character at least.
          </p>
        )}
      </div>
      <p className={classes['error-text']}>{errorMessage}</p>
      <div className={classes.actions}>
        <Button type="submit" disabled={!formIsValid}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
