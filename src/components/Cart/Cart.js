import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import Payment from './Payment';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPayment, setIsPayment] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    props.isLoggedIn && setIsCheckout(true);
    !props.isLoggedIn && setIsLoggedIn(false);
  };

  let user;

  const paymentHandler = userData => {
    user = userData;
    setIsPayment(true);
  };

  const submitOrderHandler = async userData => {
    setIsPayment(false);

    setIsSubmitting(true);
    await fetch(
      'https://react-http-cd495-default-rtdb.europe-west1.firebasedatabase.app/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={paymentHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>;
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const loginContent = <p className={classes.login}>Please login to order.</p>;

  return (
    <Modal onClose={props.onClose}>
      {isPayment && (
        <Payment
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
          user={user}
        />
      )}
      {!isPayment && !isSubmitting && !didSubmit && cartModalContent}
      {!isPayment && isSubmitting && isSubmittingModalContent}
      {!isPayment && !isSubmitting && didSubmit && didSubmitModalContent}
      {!isPayment && !isLoggedIn && loginContent}
    </Modal>
  );
};

export default Cart;
