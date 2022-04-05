import meals from '../../assets/meals.png'
import classes from './header.module.css'
import HeaderCardButton from "./headerCardButton";

const Header = props => {
  return(
  <>
    <header className={classes['header']}>
      <h1>ReactMeals</h1>
      <HeaderCardButton onClick={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
      <img src={meals} alt='A table full of delicious food!'/>
    </div>
  </>
  )
};

export default Header;