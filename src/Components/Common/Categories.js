import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../App";
import "./Categories.css";

const Categories = ({ type }) => {
  const recipeData = useContext(DataContext);
  const categoryLists = recipeData.categoryLists;

  // FOOD CATEGORIES STATES
  const [foodCategories, setFoodCategories] = useState(
    categoryLists.foodCategories
  );
  const [foodCategory, setFoodCategory] = useState("FOODTYPE");

  // DRINK CATEGORIES STATES
  const [drinkCategories, setDrinkCategories] = useState(
    categoryLists.drinkCategories
  );
  const [drinkCategory, setDrinkCategory] = useState("DRINKTYPE");

  // DISPLAY FOOD CATEGORIES ON THE PAGE
  let displayFoodCategories = foodCategories.map((category, index) => {
    let type = "";
    if (foodCategory === "FOODTYPE") {
      type = "FCATEGORY";
    } else if (foodCategory === "COUNTRY") {
      type = "FAREA";
    } else if (foodCategory === "ALPHABETICAL") {
      type = "FALPHABET";
    }
    return (
      <p
        key={index}
        className="category-text category-food"
        id={category}
        onClick={(e) => recipeData.dispatch({ type: type, value: e.target.id })}
      >
        {category}
      </p>
    );
  });

  let displayDrinkCategories = drinkCategories.map((category, index) => {
    let type = "";
    if (drinkCategory === "DRINKTYPE") {
      type = "DCATEGORY";
    } else if (drinkCategory === "ALCOHOLIC") {
      type = "DALCOHOLIC";
    } else if (drinkCategory === "ALPHABETICAL") {
      type = "DALPHABET";
    }
    return (
      <p
        key={index}
        className="category-text category-drink"
        id={category}
        onClick={(e) => recipeData.dispatch({ type: type, value: e.target.id })}
      >
        {category}
      </p>
    );
  });

  // CHANGE DISPLAYED CATEGORIES WHEN SELECTED CATEGORY CHANGES.
  useEffect(() => {
    switch (foodCategory) {
      case "FOODTYPE":
        console.log("changed - foodtype");
        setFoodCategories(recipeData.categoryLists.foodCategories);
        break;
      case "COUNTRY":
        console.log("changed - foodtarea");
        setFoodCategories(recipeData.categoryLists.foodAreas);
        break;
      case "ALPHABETICAL":
        console.log("changed - alphaets");
        setFoodCategories(recipeData.categoryLists.alphabets);
        break;
      default:
        return;
    }

    switch (drinkCategory) {
      case "DRINKTYPE":
        console.log("changed - drinkType");
        setDrinkCategories(recipeData.categoryLists.drinkCategories);
        break;
      case "ALCOHOLIC":
        console.log("changed - drinkArea");
        setDrinkCategories(recipeData.categoryLists.drinkAlcoholic);
        break;
      case "ALPHABETICAL":
        console.log("changed - drinkAlphabets");
        setDrinkCategories(recipeData.categoryLists.alphabets);
        break;
      default:
        return;
    }
  }, [foodCategory, drinkCategory]);

  const foodCategoryJSX = () => {
    return (
      <div className="category-container max-width">
        <div>
          <select
            id="food-category"
            name="food-category"
            onChange={(e) => {
              setFoodCategory(e.target.value);
            }}
          >
            <option value="FOODTYPE">FOOD TYPE</option>
            <option value="COUNTRY">BY COUNTRY</option>
            <option value="ALPHABETICAL">FIRST LETTER</option>
          </select>
        </div>
        <div className="categories">{displayFoodCategories}</div>
      </div>
    );
  };

  const drinkCategoryJSX = () => {
    return (
      <div className="category-container max-width">
        <select
          id="drink-category"
          name="drink-category"
          onChange={(e) => {
            setDrinkCategory(e.target.value);
          }}
        >
          <option value="DRINKTYPE">DRINK TYPE</option>
          <option value="ALCOHOLIC">BY ALCOHOLIC</option>
          <option value="ALPHABETICAL">FIRST LETTER</option>
        </select>
        <div className="categories">{displayDrinkCategories}</div>
      </div>
    );
  };

  return <div>{type === "FOOD" ? foodCategoryJSX() : drinkCategoryJSX()}</div>;
};

export default Categories;
