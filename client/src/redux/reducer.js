import { 
    GET_RECIPES, 
    GET_RECIPE_BY_NAME,
    GET_RECIPE_BY_ID,
    CREATE_RECIPE,
    FILTER_MY_RECIPES,
    SORT_BY_NAME,
    SORT_BY_SCORE,
    GET_DIETS,
    FILTER_BY_DIET 
} from "./actions";


const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
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
                recipes: [...state.recipes, action.payload]
            }

        // FILTERS / SORTS FOR RECIPES
        case FILTER_MY_RECIPES:
            const allRecipes = state.allRecipes
            const createdFilter =
                action.payload === "created"
                    ? allRecipes.filter((r) => r.myRecipe)
                    : allRecipes.filter((r) => !r.myRecipe)
            return {
                ...state,
                recipes: action.payload === "all" ? state.allRecipes : createdFilter
            }

        case SORT_BY_NAME:
            let sortByName = []
            switch (action.payload) {
                case "asc":
                    sortByName = state.recipes.sort(function(a, b) {
                    if (a.name > b.name) return 1
                    if (b.name > a.name) return -1
                    return 0
                    })
                    return {
                        ... state,
                        recipes: sortByName
                    }
                case "desc":
                    sortByName = state.recipes.sort(function(a, b) {
                        if (a.name > b.name) return -1
                        if (b.name > a.name) return 1
                        return 0
                    })
                    return {
                        ... state,
                        recipes: sortByName
                    }
            }

        case SORT_BY_SCORE:
            let sortByScore = []
            switch (action.payload) {
                case "ascScore":
                    sortByScore = state.recipes.sort(function(a, b) {
                        if (a.healthScore > b.healthScore) return 1; 
                        if (b.healthScore > a.healthScore) return -1; 
                        return 0;
                    });
                    return {
                        ... state,
                        recipes: sortByScore
                    }
                case "descScore":
                    sortByScore = state.recipes.sort(function(a, b) { 
                        if (a.healthScore > b.healthScore) return -1; 
                        if (b.healthScore > a.healthScore) return 1; 
                        return 0;
                    });   
                    return {
                        ... state,
                        recipes: sortByScore
                    }
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
                    : allRecipesByDiet.filter((r) => r.diets.includes(action.payload))
            return {
                ...state,
                recipes: dietFilter
            }

        default: 
            return {
                ...state
            }                
    }
};

export default rootReducer;
