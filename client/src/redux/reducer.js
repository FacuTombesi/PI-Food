import { 
    GET_RECIPES, 
    GET_RECIPE_BY_NAME,
    GET_RECIPE_BY_ID,
    CREATE_RECIPE,
    DELETE_RECIPE,
    FILTER_MY_RECIPES,
    ORDER_BY_NAME,
    ORDER_BY_SCORE,
    GET_DIETS,
    FILTER_BY_DIET 
} from "./actions";


const initialState = {
    recipes: [],
    recipeDetail: [],
    allRecipes: [],
    myRecipes: [],
    diets: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // CASES FOR RECIPES
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            }

        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipeDetail: action.payload
            }

        case CREATE_RECIPE:
            return {
                ...state,
                myRecipes: [...state.myRecipes, action.payload]
            }

        case DELETE_RECIPE:
            return {
                ...state,
                myRecipes: state.myRecipes.filter((recipe) => recipe.id !== action.payload)
            }

        // FILTERS / ORDERS FOR RECIPES
        case FILTER_MY_RECIPES:
            const allRecipesByCreation = state.allRecipes
            const myRecipesFilter =
                action.payload === "created"
                    ? allRecipesByCreation.filter((recipe) => recipe.myRecipe)
                    : allRecipesByCreation.filter((recipe) => !recipe.myRecipe)
            return {
                ...state,
                recipes: action.payload === "all" ? state.allRecipes : myRecipesFilter
            }

        case ORDER_BY_NAME:
            let sortByName =
                action.payload === "asc"
                    ? state.recipes.sort(function (a, b) {
                        if (a.name > b.name) return 1
                        if (b.name > a.name) return -1
                        return 0
                    })
                    : state.recipes.sort(function (a, b) {
                        if (a.name > b.name) return -1
                        if (b.name > a.name) return 1
                        return 0
                    })
            return {
                ...state,
                recipes: sortByName
            }

        case ORDER_BY_SCORE:
            let sortByScore =
                action.payload === "asc"
                    ? state.recipes.sort(function (a, b) {
                        if (a.healthScore > b.healthScore) return 1
                        if (b.healthScore > a.healthScore) return -1
                        return 0
                    })
                    : state.recipes.sort(function (a, b) {
                        if (a.healthScore > b.healthScore) return -1
                        if (b.healthScore > a.healthScore) return 1
                        return 0
                    })
            return {
                ...state,
                recipesLoaded: sortByScore
            }

        // CASES FOR DIETS
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        // FILTER FOR DIETS
        case FILTER_BY_DIET:
            const allRecipesByDiet = state.allRecipes
            const dietFilter =
                action.payload === ""
                    ? allRecipesByDiet
                    : allRecipesByDiet.filter((recipe) => recipe.diets.includes(action.payload))
            return {
                ...state,
                recipes: dietFilter
            }

        default:
            return state
    }
};

export default rootReducer;
