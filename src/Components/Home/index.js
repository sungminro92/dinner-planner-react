import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import RecipeCard from "../Common/RecipeCard";
import "./style.css";

const Home = () => {
  const recipeData = useContext(DataContext);
  const width = recipeData.width;

  const [randomFood, setRandomFood] = useState("");
  const [randomDrink, setRandomDrink] = useState("");

  const foodDrinkUrl = [
    "https://www.themealdb.com/api/json/v1/1/random.php",
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  ];

  async function randomFoodDrink() {
    for (let i = 0; i < foodDrinkUrl.length; i++) {
      let res = await fetch(foodDrinkUrl[i]);
      let json = await res.json();
      if (i === 0) {
        let food = json.meals[0];
        let newFood = {
          id: food.idMeal,
          name: food.strMeal,
          area: food.strArea,
          tags: food.strTags,
          img: food.strMealThumb
        };
        setRandomFood(newFood);
      } else {
        let drink = json.drinks[0];
        let newDrink = {
          id: drink.idDrink,
          name: drink.strDrink,
          category: drink.strCategory,
          glass: drink.strGlass,
          img: drink.strDrinkThumb,
          tags: drink.strTags
        };
        setRandomDrink(newDrink);
      }
    }
  }

  useEffect(() => {
    randomFoodDrink();
  }, []);

  const displayFood = () => {
    return (
      <RecipeCard
        home={true}
        type="FOOD"
        recipe={randomFood}
        linkTo={"/foods/" + randomFood.id}
      />
    );
  };

  const displayDrink = () => {
    return (
      <RecipeCard
        home={true}
        type="DRINK"
        recipe={randomDrink}
        linkTo={"/cocktails/" + randomDrink.id}
      />
    );
  };

  return (
    <div className="Home max-width">
      <div className="home-main">
        {width > 650 ? (
          <h1>
            Best <span className="pacifico-font">Dinner Planner</span> for your
            party table!
          </h1>
        ) : (
          <h1>
            Best <span className="pacifico-font">Dinner Planner</span> <br />
            for your party table!
          </h1>
        )}
        <div>
          <Link to={"/foods"} className="card-link">
            <button className="home-search-button home-food-button ">
              SEARCH FOODS
            </button>
          </Link>
          <Link to={"/cocktails"} className="card-link">
            <button className="home-search-button home-drink-button ">
              SEARCH COCKTAILS
            </button>{" "}
          </Link>
        </div>
      </div>
      <div className="random-container">
        <section>{displayFood()}</section>
        <section>{displayDrink()}</section>
      </div>
    </div>
  );
};

export default Home;
