import CartIcon from "../cart/carticon";
import classes from './headerCardButton.module.css'
import CartContext from "../../store/cart-context";
import {useContext, useEffect, useState} from "react";

const HeaderCardButton = props => {
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);
  const cartContext = useContext(CartContext);
  const numberofCartItems = cartContext.items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);
  const btnClasses = `${classes['button']} ${btnIsAnimated ? classes['bump'] : ''}`
  useEffect(() => {
    if (cartContext.items.length === 0) return;
    setBtnIsAnimated(true);
    const timer = setTimeout(() => {
      setBtnIsAnimated(false)
    }, 300)
    return () => {
      clearTimeout(timer);
    }
  }, [cartContext.items])
  return(
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes['icon']}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes['badge']}>
        {numberofCartItems}
      </span>
    </button>
  )
};

export default HeaderCardButton;