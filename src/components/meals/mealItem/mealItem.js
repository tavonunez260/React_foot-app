import classes from './mealItem.module.css'
import MealItemForm from "./mealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartContext = useContext(CartContext)
  const addToCartHandler = amount => {
    cartContext.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price
    })
  }
  return  (
    <li className={classes['meal']}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes['description']}>{props.meal.description}</div>
        <div className={classes['price']}>{`$ ${props.meal.price.toFixed(2)}`}</div>
      </div>
      <div><MealItemForm id={props.meal.id} onAddToCart={addToCartHandler}/></div>
    </li>
  )
}

export default MealItem;