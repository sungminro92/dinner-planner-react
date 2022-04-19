import React, { useState, useEffect, createContext, useReducer } from "react";
import { Route, Redirect } from "react-router-dom";
import FoodPage from "./Components/Foods/FoodPage";
import DrinkPage from "./Components/Drinks/DrinkPage";
import SavedPage from "./Components/Saved/SavedPage";
import Home from "./Components/Home";
import Alphabets from "./alphabets";
import "./styles.css";
import Footer from "./Components/Home/Footer.js";
import Navigation from "./Components/Navigation";
import recipeReducer from "./Reducer";
import RecipeDetail from "./Components/Detail/RecipeDetail";

export const DataContext = createContext();
const foodIdUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const drinkIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const initState = {
  foodUrl: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  foodSearch: " ",
  drinkUrl: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=",
  drinkSearch: " ",
  tempsavedFoods: [],
  tempsavedDrinks: [],
  needInput: false
};

export default function App() {
  const [state, dispatch] = useReducer(recipeReducer, initState);
  const [foodResult, setFoodResult] = useState([]); // initial search for foods
  const [drinkResult, setDrinkResult] = useState([]); // initial search for drinks

  const [savedFoods, setSavedFoods] = useState([]); // saved foods
  const [savedDrinks, setSavedDrinks] = useState([]); // saved drinks

  const [categoryLists, setCategoryLists] = useState({});

  const [isFound, setIsFound] = useState({
    food: true,
    drink: true
  });

  let foodUrl = state.foodUrl + state.foodSearch;
  let drinkUrl = state.drinkUrl + state.drinkSearch;

  // SETTING CATEGORY LISTS
  let Categories = {
    foodCategories: [],
    foodAreas: [],
    drinkCategories: [],
    drinkAlcoholic: [],
    alphabets: Alphabets
  };

  async function setCategories() {
    const filtersUrls = [
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list", // food category
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list", // food area
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list", // cocktail category
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list" // cocktail alcopholic
    ];

    for (let i = 0; i < filtersUrls.length; i++) {
      let url = filtersUrls[i];
      let res = await fetch(url);
      let json = await res.json();
      if (i === 0 || i === 1) {
        let categories = json.meals;
        categories.map((category, index) => {
          for (let key in category) {
            console.log(category);
            if (i === 0) {
              if (key.includes("strCategory")) {
                Categories.foodCategories.push(category[key]);
              }
            } else if (i === 1) {
              if (key.includes("strArea")) {
                Categories.foodAreas.push(category[key]);
              }
            }
          }
        });
      } else if (i === 2 || i === 3) {
        let categories = json.drinks;
        categories.map((category, index) => {
          for (let key in category) {
            if (i === 2) {
              if (key.includes("strCategory")) {
                Categories.drinkCategories.push(category[key]);
              }
            } else if (i === 3) {
              if (key.includes("strAlcoholic")) {
                Categories.drinkAlcoholic.push(category[key]);
              }
            }
          }
        });
      }
    }
    setCategoryLists(Categories);
  }

  const [width, setWindowWidth] = useState(0);
  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
    // console.log(width);
  };

  async function foodDrinkApiCall(type, url, arr) {
    let res = await fetch(url);
    let json = await res.json();
    let recipeArr;
    console.log("saved foods are- ", arr);
    if (type === "FOOD") {
      recipeArr = json.meals;
    } else if (type === "DRINK") {
      recipeArr = json.drinks;
    }
    let filteredArr = [];
    if (recipeArr === null) {
      if (type === "FOOD") {
        recipeArr = json.meals;
        setIsFound({
          ...isFound,
          food: false
        });
      } else if (type === "DRINK") {
        setIsFound({
          ...isFound,
          drink: false
        });
      }
    } else {
      filteredArr = recipeArr.map((recipe, index) => {
        recipe["existsInSaved"] = false;
        if (arr.length > 0) {
          arr.forEach((savedRecipe, index) => {
            if (type === "FOOD") {
              if (savedRecipe.idMeal === recipe.idMeal) {
                recipe["existsInSaved"] = true;
              }
            } else if (type === "DRINK") {
              if (savedRecipe.idDrink === recipe.idDrink) {
                recipe["existsInSaved"] = true;
              }
            }
          });
        }
        recipe["ingredients"] = [];
        recipe["measures"] = [];
        for (let key in recipe) {
          if (key.includes("strIngredient") && recipe[key]) {
            recipe["ingredients"].push(recipe[key]);
          }
          if (key.includes("strMeasure") && recipe[key]) {
            recipe["measures"].push(recipe[key]);
          }
        }
        if (type === "FOOD") {
          return {
            id: recipe.idMeal,
            name: recipe.strMeal,
            category: recipe.strCategory,
            area: recipe.strArea,
            img: recipe.strMealThumb,
            tags: recipe.strTags,
            instructions: recipe.strInstructions,
            ingredients: recipe.ingredients,
            measures: recipe.measures,
            existsInSaved: recipe.existsInSaved
          };
        } else if (type === "DRINK") {
          return {
            id: recipe.idDrink,
            name: recipe.strDrink,
            category: recipe.strCategory,
            glass: recipe.strGlass,
            img: recipe.strDrinkThumb,
            tags: recipe.strTags,
            instructions: recipe.strInstructions,
            ingredients: recipe.ingredients,
            measures: recipe.measures,
            existsInSaved: recipe.existsInSaved
          };
        }
        return recipe;
      });
      if (type === "FOOD") {
        setFoodResult(filteredArr);
        setIsFound({
          ...isFound,
          food: true
        });
      } else if (type === "DRINK") {
        setDrinkResult(filteredArr);
        setIsFound({
          ...isFound,
          drink: true
        });
      }
    }
  }

  // FUNCTION THAT SETS savedFoods or savedDrinks
  async function saveRecipe(type, url, id) {
    let res = await fetch(url + id);
    let json = await res.json();
    if (type === "FOOD") {
      let recipe = json.meals[0];
      console.log("saved food is", recipe.strMeal);
      setSavedFoods([...savedFoods, recipe]);
    } else if (type === "DRINK") {
      let recipe = json.drinks[0];
      console.log("saved food is", recipe.strDrink);
      setSavedDrinks([...savedDrinks, recipe]);
    }
  }

  const addToSaved = (type, id) => {
    if (type === "FOOD") {
      saveRecipe("FOOD", foodIdUrl, id);
    } else if (type === "DRINK") {
      saveRecipe("DRINK", drinkIdUrl, id);
    }
  };

  // DELETE FUNCTION FOODS / DRINKS
  const deleteFromSaved = (type, id) => {
    if (type === "FOOD") {
      console.log("deleting from savedFoods", id);
      const newSavedFoods = savedFoods.filter((d, i) => d.idMeal !== id);
      setSavedFoods(newSavedFoods);
    } else if (type === "DRINK") {
      console.log("deleting from savedDrinks", id);
      let newSavedDrinks = savedDrinks.filter((d, i) => d.idDrink !== id);
      setSavedDrinks(newSavedDrinks);
    }
  };

  useEffect(() => {
    setCategories();
    foodDrinkApiCall("FOOD", foodUrl, savedFoods);
    foodDrinkApiCall("DRINK", drinkUrl, savedDrinks);
  }, []);

  useEffect(() => {
    foodDrinkApiCall("FOOD", foodUrl, savedFoods);
  }, [state.foodSearch]);

  useEffect(() => {
    foodDrinkApiCall("DRINK", drinkUrl, savedDrinks);
  }, [state.drinkSearch]);

  useEffect(() => {
    foodDrinkApiCall("FOOD", foodUrl, savedFoods);
  }, [savedFoods]);

  useEffect(() => {
    foodDrinkApiCall("DRINK", drinkUrl, savedDrinks);
  }, [savedDrinks]);

  const recipeData = {
    width,
    state,
    categoryLists,
    foodResult,
    drinkResult,
    isFound,
    addToSaved,
    deleteFromSaved,
    savedFoods,
    savedDrinks,
    dispatch
  };

  return (
    <DataContext.Provider value={recipeData}>
      <div className="App">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="spacer"></div>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/foods" component={FoodPage} />
          <Route exact path="/foods/:id" component={RecipeDetail} />
          <Route exact path="/cocktails" component={DrinkPage} />
          <Route exact path="/cocktails/:id" component={RecipeDetail} />
          <Route exact path="/savedRecipes" component={SavedPage} />
          <Redirect to="/" />
        </main>
        <Footer />
      </div>
    </DataContext.Provider>
  );
}
