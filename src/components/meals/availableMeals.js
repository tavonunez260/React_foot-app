import classes from './availableMeals.module.css'
import Card from "../ui/card";
import MealItem from "./mealItem/mealItem";
import {useEffect, useState} from "react";

const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect( () => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-ed390-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message)
    });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <section className={classes['meals']}>
      <Card>
        <ul>{meals.map(meal => <MealItem key={meal.id} meal={meal}/>)} </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;