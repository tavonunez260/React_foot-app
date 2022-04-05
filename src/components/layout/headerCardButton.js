import CartIcon from "../cart/carticon";
import classes from './headerCardButton.module.css'
import CartContext from "../../store/cart-context";
import {useContext} from "react";

const HeaderCardButton = props => {
  const cartContext = useContext(CartContext);
  const numberofCartItems = cartContext.items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);
  return(
    <button className={classes['button']} onClick={props.onClick}>
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