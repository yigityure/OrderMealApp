import { useEffect, useReducer, useState } from 'react';

import Input from '../UI/LoginInput/Input';
import Button from '../UI/Button';
import classes from './LoginForm.module.css';

const UsernameReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 5 };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }

  return { value: '', isValid: false };
};

const PasswordReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 5 };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }

  return { value: '', isValid: false };
};

const Login = props => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const [usernameState, dispatchUsername] = useReducer(UsernameReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(PasswordReducer, {
    value: '',
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(usernameState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [usernameState, passwordState]);

  const usernameChangeHandler = event => {
    dispatchUsername({ type: 'INPUT', value: event.target.value });
  };

  const passwordChangeHandler = event => {
    dispatchPassword({ type: 'INPUT', value: event.target.value });
  };

  const usernameBlurHandler = () => {
    dispatchUsername({ type: 'BLUR' });
  };

  const passwordBlurHandler = () => {
    dispatchPassword({ type: 'BLUR' });
  };

  const submitHandler = event => {
    event.preventDefault();

    if (formIsValid) {
      for (const key in props.usersList) {
        if (usernameState.value === props.usersList[key].username) {
          if (passwordState.value === props.usersList[key].password) {
            props.onLogin(usernameState.value);
          }
        } else {
          setIsUser(false);
        }
      }
    }
  };

  const notSignedUser = (
    <p className={classes['error-text']}>Your username or password is wrong!</p>
  );

  return (
    <form onSubmit={submitHandler}>
      <div>
        <Input
          type="text"
          id="username"
          label="Username"
          isValid={usernameState.isValid}
          value={usernameState.value}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
        />
      </div>
      <div>
        <Input
          type="password"
          id="password"
          label="Password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
      </div>
      {!isUser && notSignedUser}
      <div className={classes.actions}>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default Login;
