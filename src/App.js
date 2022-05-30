import { useState, useEffect } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedLoggedIn === '1') {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem('name'));
    }
  }, []);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const loginHandler = () => {
    setIsLogin(true);
  };

  const showMealsHandler = () => {
    setIsLogin(false);
    setIsSignup(false);
  };

  const signupHandler = () => {
    setIsSignup(true);
    setIsLogin(false);
  };

  const signedUpHandler = () => {
    setIsSignup(false);
    setIsLogin(true);
  };

  const loggedInHandler = username => {
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('name', username);
    setIsLoggedIn(true);
    setIsLogin(false);
    setUsername(username);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart isLoggedIn={isLoggedIn} onClose={hideCartHandler} />
      )}
      {/* {isLogin && <Login onClose={hideCartHandler} />} */}
      <Header
        isLogin={isLogin}
        isSignup={isSignup}
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={loginHandler}
        onShowCart={showCartHandler}
        onShowMeals={showMealsHandler}
        onLogout={logoutHandler}
      />
      <main>
        {!isLogin && !isSignup && <Meals />}
        {isLogin && !isSignup && (
          <Login
            isSignup={isSignup}
            isLoggedIn={isLoggedIn}
            username={username}
            onSignup={signupHandler}
            onLoggedIn={loggedInHandler}
          />
        )}
        {!isLogin && isSignup && <SignUp onSignedUp={signedUpHandler} />}
      </main>
    </CartProvider>
  );
}

export default App;
