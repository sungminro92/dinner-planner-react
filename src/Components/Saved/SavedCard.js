import React, { useState, useContext } from "react";
import "./style.css";
import { DataContext } from "../../App";

const SavedCard = ({ type, recipe, id }) => {
  const recipeData = useContext(DataContext);
  const [choice, setChoice] = useState("instructions");
  const [activeChoice, setActiveChoice] = useState();

  let className = "choice";

  let tags = [];
  let newTags = [];

  if (recipe.tags >= 1) {
    var tagArr = recipe.tags.split(",");
    tags = tagArr;
    newTags = tags.map((tag, index) => {
      return <li className="tags">{tag}</li>;
    });
  }

  let setInstructions = [];
  if (recipe.instructions) {
    setInstructions = recipe.instructions.map((instruction, index) => {
      if (instruction) {
        return (
          <p className="instructions">
            <span className="pacifico-font">{index + 1}.</span> {instruction}
          </p>
        );
      }
    });
  }

  let setIngredients = [];
  if (recipe.ingredients) {
    setIngredients = recipe.ingredients.map((ingredient, index) => {
      return (
        <li className="ingredients" key={index}>
          <strong>{recipe.measures[index]}</strong> {ingredient}
        </li>
      );
    });
  }

  const toggleChoice = (choice) => {
    setChoice(choice);
    setActiveChoice(choice);
    console.log("choice changed to " + choice);
  };

  return (
    <div className="recipe-card">
      <div
        style={{ backgroundColor: type === "FOOD" ? "ffedb3" : "#fae4d1" }}
        className="recipe-container food-bg"
      >
        <div className="recipeCard-L">
          <img id="saved-img" src={recipe.img} alt="" />
          <p className="saved-name">
            {recipe.name}
            {type === "FOOD" && <span id="savedArea">({recipe.area})</span>}
          </p>
          <span id="tags-container">{newTags}</span>
          {type === "FOOD" ? (
            <span
              className="delete-recipe"
              onClick={() => recipeData.deleteFromSaved("FOOD", id)}
            >
              {" "}
              X DELETE THIS RECIPE
            </span>
          ) : (
            <span
              className="delete-recipe"
              onClick={() => recipeData.deleteFromSaved("DRINK", id)}
            >
              {" "}
              X DELETE THIS RECIPE
            </span>
          )}
        </div>

        <div className="recipeCard-R">
          <div className="choices">
            <p
              id="instructions"
              className={
                className +
                (activeChoice === "instructions" ? " active-choice" : "")
              }
              onClick={(e) => toggleChoice(e.target.id)}
            >
              Instructions
            </p>
            <p
              id="ingredients"
              className={
                className +
                (activeChoice === "ingredients" ? " active-choice" : "")
              }
              onClick={(e) => toggleChoice(e.target.id)}
            >
              Ingredients
            </p>
          </div>

          {choice === "instructions" && (
            <div className="recipe-content">{setInstructions}</div>
          )}
          {choice === "ingredients" && (
            <div className="recipe-content">{setIngredients}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCard;
