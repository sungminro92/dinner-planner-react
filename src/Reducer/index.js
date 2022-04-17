const FoodUrls = {
  search: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  category: "https://www.themealdb.com/api/json/v1/1/filter.php?c=",
  area: "https://www.themealdb.com/api/json/v1/1/filter.php?a=",
  alphabet: "https://www.themealdb.com/api/json/v1/1/search.php?f=",
  id: "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
};

const DrinkUrls = {
  search: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=",
  category: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=",
  alcoholic: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=",
  alphabet: "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=",
  id: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
};

export default function searchReducer(state, action) {
  switch (action.type) {
    case "FSEARCH":
      console.log("food url updated - search");
      if (action.value === "") {
        return {
          ...state,
          foodUrl: FoodUrls.search,
          foodSearch: action.value,
          needInput: true
        };
      } else {
        return {
          ...state,
          foodUrl: FoodUrls.search,
          foodSearch: action.value,
          needInput: false
        };
      }

    case "FCATEGORY":
      console.log("food url updated - category");
      return {
        ...state,
        foodUrl: FoodUrls.category,
        foodSearch: action.value
      };
    case "FAREA":
      console.log("food url updated - area");
      return {
        ...state,
        foodUrl: FoodUrls.area,
        foodSearch: action.value
      };
    case "FALPHABET":
      console.log("food url updated - alphabet");
      return {
        ...state,
        foodUrl: FoodUrls.alphabet,
        foodSearch: action.value
      };
    case "DSEARCH":
      console.log("drink url updated - search");
      return {
        ...state,
        drinkUrl: DrinkUrls.search,
        drinkSearch: action.value
      };
    case "DCATEGORY":
      console.log("drink url updated - category");
      return {
        ...state,
        drinkUrl: DrinkUrls.category,
        drinkSearch: action.value
      };
    case "DALCOHOLIC":
      console.log("drink url updated - alcoholic");
      return {
        ...state,
        drinkUrl: DrinkUrls.alcoholic,
        drinkSearch: action.value
      };
    case "DALPHABET":
      console.log("drink url updated - alphabet");
      return {
        ...state,
        drinkUrl: DrinkUrls.alphabet,
        drinkSearch: action.value
      };
    default:
      return state;
  }
}
