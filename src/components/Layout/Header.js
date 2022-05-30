import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/pizza.jpg';
import classes from './Header.module.css';
import Button from '../UI/Button';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>{`Welcome ${props.username}`}</h1>
        <span>
          <HeaderCartButton onClick={props.onShowCart} />
          {props.isLoggedIn && <Button onClick={props.onLogout}>Logout</Button>}
          {!props.isLoggedIn && !props.isLogin && !props.isSignup && (
            <Button onClick={props.onLogin}>Login</Button>
          )}
          {!props.isLoggedIn && (props.isLogin || props.isSignup) && (
            <Button onClick={props.onShowMeals}>Meals</Button>
          )}
        </span>
      </header>
      {!props.isLogin && !props.isSignup && (
        <div className={classes['main-image']}>
          <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
      )}
    </Fragment>
  );
};

export default Header;
