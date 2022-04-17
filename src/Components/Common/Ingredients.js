import React from "react";

const Ingredients = ({ detail, allMeasures, allIngredients }) => {
  let displayIngredients;
  if (allIngredients.length > 0) {
    displayIngredients = allIngredients.map((ingredient, index) => {
      return (
        <div className="ingredient">
          <img
            src={
              "https://www.themealdb.com/images/ingredients/" +
              ingredient +
              ".png"
            }
            key={index}
            alt={ingredient + "image"}
          />
          {detail ? (
            <p>
              <strong>{allMeasures[index]}</strong> {ingredient}
            </p>
          ) : (
            <p>{ingredient}</p>
          )}
        </div>
      );
    });
  }
  return [displayIngredients];
};

export default Ingredients;
