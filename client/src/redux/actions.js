import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const FILTER_MY_RECIPES = "FILTER_MY_RECIPES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";

// ----------------------------------- RECIPES ACTIONS -----------------------------------
// GETS
export const getRecipes = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/recipes`)
            return dispatch({ type: GET_RECIPES, payload: response.data })
        }   catch (error) {
            console.log("The recipe book is empty")
        }
    }
};

export const getRecipeByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({ type: GET_RECIPE_BY_NAME, payload: response.data })
        }   catch (error) {
            console.log(`The recipe ${name} doesn't exist`)
        }
    }
};

export const getRecipeById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({ type: GET_RECIPE_BY_ID, payload: response.data })
        }   catch (error) {
            console.log(`The recipe with the ID: ${id} doesn't exist`)
        }
    }
};

// POST / DELETE
export const createRecipe = (body) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:3001/recipes/create`, body)
            return dispatch({ type: CREATE_RECIPE, payload: response.data })
        }   catch (error) {
            console.log("Missing important information")
        }
    }
};

export const deleteRecipe = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`http://localhost:3001/recipes/${id}`)
            return dispatch({ type: DELETE_RECIPE, payload: response.data })
        }   catch (error) {
            console.log(`The recipe with the ID: ${id} doesn't exist`)
        }
    }
};

// FILTERS / ORDERS
export const filterMyRecipes = (payload) => {
    return {
        type: FILTER_MY_RECIPES,
        payload
    }
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export const orderByScore = (payload) => {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
};

// ------------------------------------ DIETS ACTIONS ------------------------------------

// GET
export const getDiets = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/diets`)
            return dispatch({ type: GET_DIETS, payload: response.data })
        }   catch (error) {
            console.log("There are no diets yet")
        }
    }
};

// FILTER
export const filterByDiet = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload
    }
};