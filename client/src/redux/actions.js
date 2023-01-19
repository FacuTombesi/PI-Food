import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_MY_RECIPES = "FILTER_MY_RECIPES";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_SCORE = "SORT_BY_SCORE";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";

// ----------------------------------- RECIPES ACTIONS -----------------------------------

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- GET -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

// ASYNC VERSION
export const getRecipes = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/recipes`)
            return dispatch({ type: GET_RECIPES, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};

// SYNC VERSION WITH FETCH
// export const getRecipes = () => dispatch => {
//     return (
//         fetch("http://localhost:3001/recipes") 
//         .then(response => response.json())
//         .then(data => {
//             dispatch({ type: GET_RECIPES, payload: data })
//         })
//         .catch((error) => console.log(error))
//     )
// };

// ASYNC VERSION
export const getRecipeByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({ type: GET_RECIPE_BY_NAME, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};

// SYNC VERSION WITH FETCH
// export const getRecipeByName = (name) => dispatch => {
//     return (
//         fetch(`http://localhost:3001/recipes?name=${name}`)
//         .then(response => response.json())
//         .then(data => {
//             dispatch({ type: GET_RECIPE_BY_NAME, payload: data})
//         })
//         .catch((error) => console.log(error))
//     )
// };

// ASYNC VERSION
export const getRecipeById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({ type: GET_RECIPE_BY_ID, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};

// SYNC VERSION WITH FETCH
// export const getRecipeById = (id) => dispatch => {
//     return (
//         fetch(`http://localhost:3001/recipes/&{id}`)
//         .then(response => response.json())
//         .then(data => {
//             dispatch({ type: GET_RECIPE_BY_ID, payload: data})
//         })
//         .catch((error) => console.log(error))
//     )
// };

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- POST / DELETE -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

// ASYNC VERSION
export const createRecipe = (payload) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:3001/recipes/create`, payload)
            return dispatch({ type: CREATE_RECIPE, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};

// SYNC VERSION WITH FETCH
// export const createRecipe = (payload) => dispatch => {
//     return (
//         fetch(`http://localhost:3001/recipes/create`, payload)
//         .then(response => response.json())
//         .then(data => {
//             dispatch({ type: CREATE_RECIPE, payload: data})
//         })
//         .catch((error) => console.log(error))
//     )
// };

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ FILTERS / SORTS +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

export const filterMyRecipes = (payload) => {
    return {
        type: FILTER_MY_RECIPES,
        payload
    }
};

export const sortByName = (payload) => {
    return {
        type: SORT_BY_NAME,
        payload
    }
};

export const sortByScore = (payload) => {
    return {
        type: SORT_BY_SCORE,
        payload
    }
};


// ------------------------------------ DIETS ACTIONS ------------------------------------

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- GET -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

// ASYNC VERSION
export const getDiets = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/diets`)
            return dispatch({ type: GET_DIETS, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};

// SYNC VERSION WITH FETCH
// export const getDiets = () => dispatch => {
//     return (
//         fetch("http://localhost:3001/diets") 
//         .then(response => response.json())
//         .then(data => {
//             dispatch({ type: GET_DIETS, payload: data })
//         })
//         .catch((error) => console.log(error))
//     )
// };

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ FILTER +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

export const filterByDiet = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload
    }
};