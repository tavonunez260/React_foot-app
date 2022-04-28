import classes from './cart.module.css'
import Modal from "../ui/modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./cartItem";
import Checkout from "./checkout";

export const Cart = props => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$ ${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const cartItemAddHandler = item => {
    cartContext.addItem({...item, amount: 1})
  };
  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id)
  };
  const orderHandler = () => {
    setIsCheckout(true);
  }
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-http-ed390-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  }
  const cartItems =
    <ul className={classes['cart-items']}>
      {cartContext.items.map(item => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        )})}
    </ul>;

  return (
    <Modal onClose={props.onClose}>
      {
        !isSubmitting && !didSubmit &&
         <>
           {cartItems}
           <div className={classes['total']}>
             <span>Total amount</span>
             <span>{totalAmount}</span>
           </div>
           {isCheckout &&
             <Checkout
               onCancel={props.onClose}
               onConfirm={submitOrderHandler}
             />}
           {!isCheckout &&
             <div className={classes['actions']}>
               <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
               {hasItems && <button className={classes['button']} onClick={orderHandler}>Order</button>}
             </div>
           }
         </>
      }
      {
        isSubmitting && <p>Sending order data...</p>
      }
      {
        didSubmit && !isSubmitting &&
        <>
          <p>Successfully sent the order!</p>
          <div className={classes['actions']}>
            <button className={classes['button']} onClick={props.onClose}>Close</button>
          </div>
        </>
      }
    </Modal>
  )
};

export default Cart;