import React, { useEffect, useState } from 'react';

import LoginForm from './LoginForm';
import Card from '../UI/LoginCard/Card';
import classes from './Login.module.css';

const Users = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        'https://react-http-cd495-default-rtdb.europe-west1.firebasedatabase.app/users.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedUsers = [];

      for (const key in responseData) {
        loadedUsers.push({
          id: key,
          username: responseData[key].username,
          password: responseData[key].password,
        });
      }

      setUsers(loadedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <Card className={classes.login}>
      <LoginForm
        usersList={users}
        onLogin={props.onLoggedIn}
        onLogout={props.onLogout}
      />
      <div>
        <br />
        <p className={classes.signup} onClick={props.onSignup}>
          If you haven't an account, you can sign up from here!
        </p>
      </div>
    </Card>
  );
};

export default Users;
