import React, { useEffect, useState, useContext } from "react";
import Ingredients from "../Common/Ingredients";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import "./style.css";

const RecipeDetail = (props) => {
    const recipeData = useContext(DataContext);

    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [inSaved, setInSaved] = useState(false);
    const [recipeId, setRecipeId] = useState(props.match.params.id);

    async function recipeLookUp() {
        let url;
        let recipe;
        let instructions;
        let ingredients = [];
        if (props.match.path.includes("food")) {
            url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId;
            let res = await fetch(url);
            let json = await res.json();
            recipe = json.meals[0];
            instructions = recipe.strInstructions.trim();
            recipe["strInstructions"] = instructions.split(".");
        } else if (props.match.path.includes("cocktail")) {
            url =
                "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + recipeId;
            let res = await fetch(url);
            let json = await res.json();
            recipe = json.drinks[0];
            instructions = recipe.strInstructions.trim();
            recipe["strInstructions"] = instructions.split(".");
        }
        recipe["ingredients"] = [];
        recipe["measures"] = [];
        for (let key in recipe) {
            if (key.includes("strIngredient") && recipe[key]) {
                ingredients.push(recipe[key]);
            }
            if (key.includes("strMeasure") && recipe[key]) {
                recipe["measures"].push(recipe[key]);
            }
        }

        console.log(recipe);
        setRecipe(recipe);
        setIngredients(ingredients);
    }

    let setInstructions = [];
    if (recipe.strInstructions) {
        setInstructions = recipe.strInstructions.map((instruction, index) => {
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
        if (recipe.strTags) {
            let tagsArr = recipe.strTags.split(",");
            tags = tagsArr.map((tag, index) => {
                if (tag) {
                    if (props.match.path.includes("food")) {
                        return <p className="card-tags tags-food">{tag}</p>;
                    } else {
                        return <p className="card-tags tags-drink">{tag}</p>;
                    }
                }
            });
        }
        return (
            <div className="recipe-tags-container">
                {props.match.path.includes("food") ? (
                    <>
                        <p className="card-tags tags-food">{recipe.strCategory}</p>
                        <p className="card-tags tags-food">{recipe.strArea}</p>
                    </>
                ) : (
                    <>
                        <p className="card-tags tags-drink">{recipe.strCategory}</p>
                        <p className="card-tags tags-drink">{recipe.strGlass}</p>
                    </>
                )}
                {tags}
            </div>
        );
    };

    function loopThruSaved(type, recipeArr, id) {
        let exists = false;
        recipeArr.forEach((recipe, index) => {
            if (type === "FOOD") {
                if (recipe.idMeal === id) {
                    exists = true;
                } else {
                    return;
                }
            } else {
                if (recipe.idDrink === id) {
                    exists = true;
                } else {
                    return;
                }
            }
        });
        setInSaved(exists);
    }

    const addToSaved = () => {
        if (props.match.path.includes("food")) {
            recipeData.addToSaved("FOOD", recipeId);
        } else if (props.match.path.includes("cocktail")) {
            recipeData.addToSaved("DRINK", recipeId);
        }
    };

    const deleteFromSaved = () => {
        if (props.match.path.includes("food")) {
            recipeData.deleteFromSaved("FOOD", recipeId);
        } else {
            recipeData.deleteFromSaved("DRINK", recipeId);
        }
        setInSaved(false);
    };

    useEffect(() => {
        recipeLookUp();
        if (props.match.path.includes("food") && recipeData.savedFoods) {
            loopThruSaved("FOOD", recipeData.savedFoods, recipeId);
        } else if (props.match.path.includes("cocktail")) {
            loopThruSaved("DIRNK", recipeData.savedDrinks, recipeId);
        }
    }, []);

    useEffect(() => {
        if (props.match.path.includes("food") && recipeData.savedFoods) {
            loopThruSaved("FOOD", recipeData.savedFoods, recipeId);
        } else if (props.match.path.includes("cocktail")) {
            loopThruSaved("DIRNK", recipeData.savedDrinks, recipeId);
        }
    }, [recipeData.savedFoods, recipeData.savedDrinks]);

    const arrowL = "< ";
    const arrowR = " >";
    console.log(recipeId);

    return (
        <div className="max-width recipe-detail-page">
            {props.match.path.includes("food") ? (
                <Link to="/foods" className="float-left">
                    <h3> {arrowL} BACK TO FOODS</h3>
                </Link>
            ) : (
                <Link to="/cocktails" className="float-left">
                    <h3> {arrowL} Back to Drinks</h3>
                </Link>
            )}

            {props.match.path.includes("food") && !inSaved ? (
                <h3
                    className="float-right"
                    onClick={() => recipeData.addToSaved("FOOD", recipeId)}
                >
                    SAVE THIS RECIPE {arrowR}
                </h3>
            ) : (
                <></>
            )}
            {props.match.path.includes("cocktail") && !inSaved ? (
                <h3
                    className="float-right"
                    onClick={() => recipeData.addToSaved("DRINK", recipeId)}
                >
                    SAVE THIS RECIPE {arrowR}
                </h3>
            ) : (
                <></>
            )}

            {inSaved && (
                <h3 className="float-right remove" onClick={() => deleteFromSaved()}>
                    REMOVE FROM SAVED
                </h3>
            )}

            <div className="recipe-title-container">
                {props.match.path.includes("food") ? (
                    <h1>{recipe.strMeal}</h1>
                ) : (
                    <h1>{recipe.strDrink}</h1>
                )}
                {displayTags()}
            </div>
            <div className="recipe-detail-container">
                <div className="recipe-image">
                    {props.match.path.includes("food") ? (
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    ) : (
                        <img src={recipe.strDrinkThumb} alt={recipe.strDrink} />
                    )}
                </div>
                <div className="ingredients-container">
                    <Ingredients
                        detail={true}
                        allMeasures={recipe.measures}
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

export default RecipeDetail;
