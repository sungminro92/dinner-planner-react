import React, { useEffect, useState } from "react";
import Ingredients from "../Common/Ingredients";
import { Link } from "react-router-dom";

const DrinkDetail = (props) => {
  let drinkId = props.match.params.cocktail;
  const drinkIdUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

  const [drink, setDrink] = useState({});
  const [ingredients, setIngredients] = useState([]);

  async function drinkLookUp() {
    let res = await fetch(drinkIdUrl);
    let json = await res.json();
    let drink = json.drinks[0];
    let instructions = drink.strInstructions.trim();
    drink["strInstructions"] = instructions.split(".");
    drink["ingredients"] = [];
    drink["measures"] = [];
    let ingredients = [];
    for (let key in drink) {
      if (key.includes("strIngredient") && drink[key]) {
        ingredients.push(drink[key]);
      }
      if (key.includes("strMeasure") && drink[key]) {
        drink["measures"].push(drink[key]);
      }
    }
    console.log(drink);
    setDrink(drink);
    setIngredients(ingredients);
  }

  let setInstructions = [];
  if (drink.strInstructions) {
    setInstructions = drink.strInstructions.map((instruction, index) => {
      if (instruction) {
        return (
          <li key={index} className="detail-instructions">
            <span className="pacifico-font">{index + 1}. </span> {instruction}.
          </li>
        );
      }
    });
  }
  const displayTags = () => {
    let tags;
    if (drink.strTags) {
      let tagsArr = drink.strTags.split(",");
      tags = tagsArr.map((tag, index) => {
        if (tag) {
          return <p className="card-tags tags-drink">{tag}</p>;
        }
      });
    }
    return (
      <div className="recipe-tags-container">
        <p className="card-tags tags-drink">{drink.strCategory}</p>
        <p className="card-tags tags-drink">{drink.strGlass}</p>
        {tags}
      </div>
    );
  };
  useEffect(() => {
    drinkLookUp();
  }, []);
  const arrow = "< ";

  return (
    <div className="max-width recipe-detail-page">
      <Link to="/cocktails" className="float-left">
        <h3> {arrow} Back to Drinks</h3>
      </Link>
      <div className="recipe-title-container">
        <h1>{drink.strDrink}</h1>
        {displayTags()}
      </div>
      <div className="recipe-detail-container">
        <div className="recipe-image">
          <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        </div>
        <div className="ingredients-container">
          <Ingredients allIngredients={ingredients} />
        </div>
      </div>
      <div className="recipe-instructions">
        <h1>Instructions</h1>
        {setInstructions}
      </div>
    </div>
  );
};

export default DrinkDetail;
