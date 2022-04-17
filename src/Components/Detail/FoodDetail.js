import React, { useEffect, useState } from "react";
import Ingredients from "../Common/Ingredients";
import { Link } from "react-router-dom";
import "./style.css";

const FoodDetail = (props) => {
  let foodId = props.match.params.food;
  const foodIdUrl =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foodId;
  const [food, setFood] = useState({});
  const [ingredients, setIngredients] = useState([]);

  async function foodLookUp() {
    let res = await fetch(foodIdUrl);
    let json = await res.json();
    let food = json.meals[0];
    let instructions = food.strInstructions.trim();
    food["strInstructions"] = instructions.split(".");
    food["ingredients"] = [];
    food["measures"] = [];
    let ingredients = [];
    for (let key in food) {
      if (key.includes("strIngredient") && food[key]) {
        ingredients.push(food[key]);
      }
      if (key.includes("strMeasure") && food[key]) {
        food["measures"].push(food[key]);
      }
    }
    console.log(food);
    setFood(food);
    setIngredients(ingredients);
  }

  let setInstructions = [];
  if (food.strInstructions) {
    setInstructions = food.strInstructions.map((instruction, index) => {
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
    if (food.strTags) {
      let tagsArr = food.strTags.split(",");
      tags = tagsArr.map((tag, index) => {
        if (tag) {
          return <p className="card-tags tags-food">{tag}</p>;
        }
      });
    }
    return (
      <div className="recipe-tags-container">
        <p className="card-tags tags-food">{food.strCategory}</p>
        <p className="card-tags tags-food">{food.strArea}</p>
        {tags}
      </div>
    );
  };
  useEffect(() => {
    foodLookUp();
  }, []);

  const arrow = "< ";
  return (
    <div className="max-width recipe-detail-page">
      <Link to="/cocktails" className="float-left">
        <h3> {arrow} Back to Foods</h3>
      </Link>
      <div className="recipe-title-container">
        <h1>{food.strMeal}</h1>
        {displayTags()}
      </div>
      <div className="recipe-detail-container">
        <div className="recipe-image">
          <img src={food.strMealThumb} alt={food.strMeal} />
        </div>
        <div className="ingredients-container">
          <Ingredients
            detail={true}
            allMeasures={food.measures}
            allIngredients={ingredients}
          />
        </div>
      </div>
      <div className="recipe-instructions">
        <h1>Instructions</h1>
        {setInstructions}
      </div>
    </div>
  );
};

export default FoodDetail;
