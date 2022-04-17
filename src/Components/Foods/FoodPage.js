// where user is able to search for Foods
// user sees results of food recipe cards
// user can click on each recipe card to link to its detail page
import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import SearchForm from "../Common/SearchForm";
import RecipeCard from "../Common/RecipeCard";
import Categories from "../Common/Categories";
import { DataContext } from "../../App";

const FoodPage = () => {
  const recipeData = useContext(DataContext);
  const [recipes, setRecipes] = useState(recipeData.foodResult);

  function displayFoods() {
    setRecipes(recipeData.foodResult);
  }

  useEffect(() => {}, []);

  useEffect(() => {
    displayFoods();
  }, [recipeData.foodResult]);

  let displayFoodCards = recipes.map((recipe, index) => {
    return (
      <RecipeCard
        type="FOOD"
        linkTo={"/foods/" + recipe.id}
        recipe={recipe}
        key={index}
      />
    );
  });
  // }

  return (
    <div className="max-width">
      <div className="search-container">
        <SearchForm type="FOOD" dispatch={recipeData.dispatch} />
        <Categories type="FOOD" />
      </div>
      <div className="card-container">{displayFoodCards}</div>
    </div>
  );
};

export default FoodPage;
