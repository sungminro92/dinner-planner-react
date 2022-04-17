import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../App";
import "./style.css";

const SearchForm = ({ type, dispatch }) => {
  const recipeData = useContext(DataContext);
  const [input, setInput] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [isFound, setIsFound] = useState(recipeData.isFound);
  const [error, setError] = useState("");
  const [needInput, setNeedInput] = useState(false);

  useEffect(() => {
    switch (type) {
      case "FOOD":
        setError("no foods found... with " + input);
        setIsFound(recipeData.isFound);
        break;
      case "DRINK":
        setError("no cocktails found... with " + input);
        setIsFound(recipeData.isFound);
        break;
      default:
        return;
    }
  }, [recipeData.isFound]);

  useEffect(() => {
    setNeedInput(recipeData.state.needInput);
  }, [recipeData.state]);

  const handleChange = (e) => {
    const input = e.target.value;
    setInput(input);
  };

  const handleFoodClick = () => {
    dispatch({ type: "FSEARCH", value: input });
    setNeedInput(recipeData.needInput);
  };

  const handleDrinkClick = () => {
    dispatch({ type: "DSEARCH", value: input });
    setNeedInput(recipeData.needInput);
  };

  // WHICH PAGE IS IT BEING USED
  useEffect(() => {
    setIsFound({
      food: true,
      drink: true
    });

    if (type === "FOOD") {
      setPlaceHolder("search for food recipe... or choose a category below");
    } else if (type === "DRINK") {
      setPlaceHolder("search for cocktail recipe...or choose category below");
    }
  }, []);

  return (
    <div className="max-width" style={{ textAlign: "center" }}>
      <div className="error-container">
        {type === "FOOD" ? (
          <>
            {!isFound.food && <p className="error-message">{error}</p>}
            {needInput && (
              <p className="error-message">maybe type something first...</p>
            )}
          </>
        ) : (
          <>
            {!isFound.drink && <p className="error-message">{error}</p>}
            {needInput && (
              <p className="error-message">maybe type something first...</p>
            )}
          </>
        )}
      </div>
      <div className="search-box">
        <input
          type="text"
          className="input-text"
          placeholder={placeHolder}
          value={input}
          onChange={handleChange}
          onKeyPress={
            type === "FOOD" ? () => handleFoodClick() : () => handleDrinkClick()
          }
        />
        <span
          className="erase"
          onClick={() => {
            setInput("");
          }}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default SearchForm;
