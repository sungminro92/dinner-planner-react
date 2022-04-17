import React, { useState } from "react";
import Instructions from "./Instructions";
import Ingredients from "./Ingredients";

const RecipeInfo = (props) => {
  const [isInstructions, setActive] = useState(true);

  const handleClick = (word) => {
    if (word === "instructions") {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div>
      <div className="">
        <p onClick={() => handleClick("instructions")}>Instructions</p>
        <p onClick={() => handleClick("ingredients")}>Ingredients</p>
      </div>
      <div className="infoContainer">
        {isInstructions ? <Instructions /> : <Ingredients />}
      </div>
    </div>
  );
};

export default RecipeInfo;
