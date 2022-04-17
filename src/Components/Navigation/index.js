import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { DataContext } from "../../App";

const Navigation = () => {
  const [active, setActive] = useState("");
  const recipeData = useContext(DataContext);
  const savedFoods = recipeData.savedFoods;
  const savedDrinks = recipeData.savedDrinks;
  const width = recipeData.width;

  const handleClick = (id) => {
    setActive(id);
  };
  return (
    <div className="max-width">
      {width > 600 ? (
        <nav>
          <span>
            <Link
              to="/"
              id="logo-type"
              onClick={() => {
                handleClick("HOME");
              }}
            >
              Plan D
            </Link>
            <Link
              to="/foods"
              onClick={() => {
                handleClick("FOODS");
              }}
              className={active === "FOODS" ? "active-nav" : ""}
            >
              FOODS
            </Link>
            <Link
              to="/cocktails"
              onClick={() => {
                handleClick("COCKTAILS");
              }}
              className={active === "COCKTAILS" ? "active-nav" : ""}
            >
              COCKTAILS
            </Link>
          </span>
          <span>
            {savedFoods.length >= 1 || savedDrinks.length >= 1 ? (
              <Link
                to="/savedRecipes"
                onClick={() => {
                  handleClick("RECIPES");
                }}
                className={active === "RECIPES" ? "active-nav" : ""}
              >
                {savedFoods.length + savedDrinks.length} SAVED RECIPES{" "}
              </Link>
            ) : (
              <Link
                to="/savedRecipes"
                onClick={() => {
                  handleClick("RECIPES");
                }}
                className={active === "RECIPES" ? "active-nav" : ""}
              >
                SAVED RECIPES
              </Link>
            )}
          </span>
        </nav>
      ) : (
        <nav>
          <Link to="/" id="logo-type">
            Plan D
          </Link>
          <div className="nav-flex">
            <div>
              <Link
                to="/foods"
                onClick={() => {
                  handleClick("FOODS");
                }}
                className={active === "FOODS" ? "active-nav" : ""}
              >
                FOODS
              </Link>
            </div>
            <div>
              <Link
                to="/cocktails"
                onClick={() => {
                  handleClick("COCKTAILS");
                }}
                className={active === "COCKTAILS" ? "active-nav" : ""}
              >
                COCKTAILS
              </Link>
            </div>
            <div>
              {savedFoods.length >= 1 || savedDrinks.length >= 1 ? (
                <Link
                  to="/savedRecipes"
                  onClick={() => {
                    handleClick("RECIPES");
                  }}
                  className={active === "RECIPES" ? "active-nav" : ""}
                >
                  {savedFoods.length + savedDrinks.length} SAVED RECIPES{" "}
                </Link>
              ) : (
                <Link
                  to="/savedRecipes"
                  onClick={() => {
                    handleClick("RECIPES");
                  }}
                  className={active === "RECIPES" ? "active-nav" : ""}
                >
                  SAVED RECIPES
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
