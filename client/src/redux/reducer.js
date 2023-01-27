import { 
    GET_RECIPES, 
    GET_RECIPE_BY_NAME,
    GET_RECIPE_BY_ID,
    CREATE_RECIPE,
    FILTER_MY_RECIPES,
    SORT_BY_ORDER,
    GET_DIETS,
    FILTER_BY_DIET 
} from "./actions";


const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail:{},
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
                ...state
            }

        // FILTERS / SORTS FOR RECIPES
        case FILTER_MY_RECIPES:
            const allRecipesByCreation = state.allRecipes
            const createdFilter =
                action.payload === "API" // Aplico un condicional que me traiga todas las recetas de la api si la opción elegida es "API"
                    ? allRecipesByCreation.filter(r => typeof(r.id) === "number") // Si la opción es "API", el filtro busca las recetas cuyo ID sea un número (como aparecen los IDs de la api)
                    : allRecipesByCreation.filter(r => typeof(r.id) === "string") // De lo contrario, el filtro busca las recetas cuyo ID sea un string (como aparecen en las recetas creadas en el modelo usando UUID)
            return {
                ...state,
                recipes: action.payload === "All" ? state.allRecipes : createdFilter // Aplico un último condicional para el caso de que quiera todas las recetas
            }

        case SORT_BY_ORDER:
            let sortedRecipes = []
            switch (action.payload) {
                // SORT BY NAME
                case "AlphAsc": // Ascendiente
                    sortedRecipes = state.recipes.sort(function(a, b) {
                        if (a.name > b.name) return 1
                        if (b.name > a.name) return -1 
                        return 0
                    })
                    return {
                        ...state,
                        recipes: sortedRecipes
                    }
                case "AlphDesc": // Descendiente
                    sortedRecipes = state.recipes.sort(function(a, b) { 
                        if (a.name > b.name) return -1 
                        if (b.name > a.name) return 1 
                        return 0
                    })  
                    return {
                        ...state,
                        recipes: sortedRecipes
                    }

                // SORT BY SCORE
                case "ScoreAsc":
                    sortedRecipes = state.recipes.sort(function(a, b) {
                        if (a.healthScore > b.healthScore) return 1
                        if (b.healthScore > a.healthScore) return -1
                        return 0
                    })
                    return {
                        ...state,
                        recipes: sortedRecipes
                    }
                case "ScoreDesc":
                    sortedRecipes = state.recipes.sort(function(a, b) { 
                        if (a.healthScore > b.healthScore) return -1
                        if (b.healthScore > a.healthScore) return 1
                        return 0
                    })   
                    return {
                        ...state,
                        recipes: sortedRecipes
                    }
                default:
                    return {
                        ...state
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
                action.payload === "All" // Aplico un condicional que me traiga todas las recetas si la opción elegida es "All"
                    ? allRecipesByDiet
                    : allRecipesByDiet.filter((r) => r.diets.includes(action.payload)) // De lo contrario aplico un filtro para que solo traiga las recetas cuyas diets sean iguales a las recibidas por payload
            return {
                ...state,
                recipes: dietFilter
            }

        // DEFAULT CASE
        default: 
            return {
                ...state
            }                
    }
};

export default rootReducer;