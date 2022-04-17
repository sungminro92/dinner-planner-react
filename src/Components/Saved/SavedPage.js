import React, { useState, useContext, useEffect } from "react";
import SavedCard from "./SavedCard";
import Ingredients from "../Common/Ingredients";
import { DataContext } from "../../App";

import "./style.css";

const SavedPage = () => {
  const recipeData = useContext(DataContext);
  const [savedFoods, setSavedFoods] = useState(recipeData.savedFoods);
  const [savedDrinks, setSavedDrinks] = useState(recipeData.savedDrinks);
  const [allIngredients, setAllIngredients] = useState([]);

  function displaySaved() {
    let ingredients = [];
    if (recipeData.savedFoods) {
      let foodArr = recipeData.savedFoods.map((recipe, index) => {
        recipe["ingredients"] = [];
        recipe["measures"] = [];
        recipe["instructions"] = recipe.strInstructions.trim().split(".");
        for (let key in recipe) {
          if (key.includes("strIngredient") && recipe[key]) {
            recipe["ingredients"].push(recipe[key]);
            ingredients.push(recipe[key]);
          }
          if (key.includes("strMeasure") && recipe[key]) {
            recipe["measures"].push(recipe[key]);
          }
        }
        return {
          id: recipe.idMeal,
          name: recipe.strMeal,
          category: recipe.strCategory,
          area: recipe.strArea,
          img: recipe.strMealThumb,
          tags: recipe.strTags,
          instructions: recipe.instructions,
          ingredients: recipe.ingredients,
          measures: recipe.measures
        };
      });
      setSavedFoods(foodArr);
    }

    if (recipeData.savedDrinks) {
      let drinkArr = recipeData.savedDrinks.map((recipe, index) => {
        recipe["ingredients"] = [];
        recipe["measures"] = [];
        recipe["instructions"] = recipe.strInstructions.trim().split(".");
        for (let key in recipe) {
          if (key.includes("strIngredient") && recipe[key]) {
            recipe["ingredients"].push(recipe[key]);
            ingredients.push(recipe[key]);
          }
          if (key.includes("strMeasure") && recipe[key]) {
            recipe["measures"].push(recipe[key]);
          }
        }
        return {
          id: recipe.idDrink,
          name: recipe.strDrink,
          category: recipe.strCategory,
          glass: recipe.strGlass,
          img: recipe.strDrinkThumb,
          tags: recipe.strTags,
          instructions: recipe.instructions,
          ingredients: recipe.ingredients,
          measures: recipe.measures
        };
      });
      setSavedDrinks(drinkArr);
    }

    setAllIngredients(removeDuplicates(ingredients));
  }

  useEffect(() => {
    displaySaved();
  }, []);

  useEffect(() => {
    displaySaved();
  }, [recipeData.savedFoods, recipeData.savedDrinks]);

  let foodCards = savedFoods.map((recipe, index) => {
    return <SavedCard type="FOOD" recipe={recipe} id={recipe.id} />;
  });

  let drinkCards = savedDrinks.map((recipe, index) => {
    return <SavedCard type="DRINK" recipe={recipe} id={recipe.id} />;
  });

  function removeDuplicates(arr) {
    let newArr = arr.filter((item, index) => arr.indexOf(item) === index);
    return newArr;
  }

  const copy = async () => {
    await navigator.clipboard.writeText(allIngredients);
    alert("Text copied");
  };

  return (
    <div className="max-width">
      <div className="saved-recipes-container">
        <p className="saved-title">
          <span className="pacifico-font">{allIngredients.length}</span>{" "}
          Shopping Lists
        </p>
        <div className="recipes-container">
          {savedFoods.length >= 1 || savedDrinks.length >= 1 ? (
            <>
              <div className="ingredients-container">
                <Ingredients allIngredients={allIngredients} />
              </div>
            </>
          ) : (
            <p className="non-saved">
              Please add any recipes to view shopping lists
            </p>
          )}
        </div>
        <p className="saved-title">
          <span className="pacifico-font">{savedFoods.length}</span> Saved Foods
        </p>
        <div className="recipes-container">
          {savedFoods.length >= 1 ? (
            [foodCards]
          ) : (
            <p className="non-saved">you don't have any saved foods</p>
          )}
        </div>

        <p className="saved-title">
          <span className="pacifico-font">{savedDrinks.length}</span> Saved
          Drinks
        </p>
        <div className="recipes-container">
          {savedDrinks.length >= 1 ? (
            [drinkCards]
          ) : (
            <p className="non-saved">you don't have any saved drinks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
