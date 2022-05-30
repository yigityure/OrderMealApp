import { useState } from 'react';

import Card from '../UI/LoginCard/Card';
import SignUpForm from './SignUpForm';
import classes from './SignUp.module.css';

const SignUp = props => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const signUpUserHandler = async userData => {
    await fetch(
      'https://react-http-cd495-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application.json' },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }),
      }
    );

    setIsSignedUp(true);

    setTimeout(() => {
      props.onSignedUp();
    }, 3000);
  };

  return (
    <Card className={classes.signup}>
      {!isSignedUp && (
        <SignUpForm onUserSubmission={signUpUserHandler}></SignUpForm>
      )}
      {isSignedUp && (
        <div>
          <p>You have been successfully signed up.</p>
          <p>You can login now.</p>
        </div>
      )}
    </Card>
  );
};

export default SignUp;
