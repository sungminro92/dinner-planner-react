import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import "./style.css";

const RecipeCard = ({ home, type, linkTo, recipe }) => {
  let style = {};
  if (type === "FOOD") {
    style = {
      backgroundColor: "#FFEDB3"
    };
  } else if (type === "DRINK") {
    style = {
      backgroundColor: "#FAE4D1"
    };
  }
  const recipeData = useContext(DataContext);

  let id = recipe.id;

  let tags;
  if (recipe.tags) {
    let tagsArr = recipe.tags.split(",");
    tags = tagsArr.map((tag, index) => {
      if (type === "FOOD") {
        return <p className="card-tags tags-food">{tag}</p>;
      } else if (type === "DRINK") {
        return <p className="card-tags tags-drink">{tag}</p>;
      }
    });
  }

  const displayButton = (type) => {
    if (type === "FOOD" && !home) {
      if (!recipe.existsInSaved) {
        return (
          <div
            className="card-save-button-food"
            onClick={() => recipeData.addToSaved(type, id)}
          >
            {" "}
            SAVE THIS RECIPE
          </div>
        );
      } else {
        return (
          <div
            className="card-saved"
            onClick={() => recipeData.deleteFromSaved(type, id)}
          >
            REMOVE FROM SAVED
          </div>
        );
      }
    } else if (type === "DRINK" && !home) {
      if (!recipe.existsInSaved) {
        return (
          <div
            className="card-save-button-drink"
            onClick={() => recipeData.addToSaved(type, id)}
          >
            SAVE THIS RECIPE
          </div>
        );
      } else {
        return (
          <div
            className="card-saved"
            onClick={() => recipeData.deleteFromSaved(type, id)}
          >
            REMOVE FROM SAVED
          </div>
        );
      }
    } else if (home && type === "FOOD") {
      return (
        <Link to={linkTo} className="card-link">
          <div className="card-save-button-food">VIEW THIS RECIPE</div>
        </Link>
      );
    } else if (home && type === "DRINK") {
      return (
        <Link to={linkTo} className="card-link">
          <div className="card-save-button-drink">VIEW THIS RECIPE</div>
        </Link>
      );
    }
  };

  return (
    <div className="card" style={style}>
      <Link to={linkTo} className="card-link">
        <div className="card-img">
          <img src={recipe.img} alt={recipe.name} />
        </div>
        <div className="card-content">
          <p className="card-title">{recipe.name}</p>
          <div className="card-tags-container">
            {recipe.area && (
              <p className="card-tags tags-food">{recipe.area}</p>
            )}
            {recipe.glass && (
              <p className="card-tags tags-drink">{recipe.glass}</p>
            )}
            {tags}
          </div>
        </div>
      </Link>
      {displayButton(type)}
    </div>
  );
};

export default RecipeCard;
