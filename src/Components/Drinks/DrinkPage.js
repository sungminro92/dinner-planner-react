import React, { useState, useEffect, useContext } from "react";
import SearchForm from "../Common/SearchForm";
import RecipeCard from "../Common/RecipeCard";
import Categories from "../Common/Categories";
import { DataContext } from "../../App";
import "./style.css";

const DrinkPage = () => {
  const recipeData = useContext(DataContext);
  const [recipes, setRecipes] = useState(recipeData.drinkResult);

  function displayDrinks() {
    setRecipes(recipeData.drinkResult);
  }

  useEffect(() => {}, []);

  useEffect(() => {
    displayDrinks();
  }, [recipeData.drinkResult]);

  let displayDrinkCards = recipes.map((recipe, index) => {
    return (
      <RecipeCard
        type="DRINK"
        linkTo={"/cocktails/" + recipe.id}
        recipe={recipe}
        key={index}
      />
    );
  });

  return (
    <div className="max-width">
      <div className="search-container">
        <SearchForm type="DRINK" dispatch={recipeData.dispatch} />
        <Categories type="DRINK" />
      </div>
      <div className="card-container">{displayDrinkCards}</div>
    </div>
  );
};

export default DrinkPage;
