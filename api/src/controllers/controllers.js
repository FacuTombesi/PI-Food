const axios = require("axios");
const { Recipe, Diet } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;

// -------------------- GETTING/ MERGING DATA FROM API AND DATABASE -------------------- 
const getDataFromApi = async () => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const dataApi = await response.data.results.map((recipe) => {
            const { id, healthScore, image } = recipe
            return {
                id,
                name: recipe.title,
                summary: recipe.summary.replace(/<[^>]*>?/g, ""),
                healthScore,
                image,
                steps: recipe.analyzedInstructions[0]?.steps.map((recipeStep) => {
                    return recipeStep.step
                }),
                diets: recipe.diets.join(", ")
            }
        })
        return dataApi
    }   catch (error) {
        res.status(400).send("Couldn't retrieve recipes from API")
    }
};

const getDataFromDb = async () => {
    try {
        const dataDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        return dataDb
    }   catch (error) {
        res.status(404).send("The recipe book is empty")
    }
};

const processDataFromDb = async () => {
    try {
        const recipesInDb = await getDataFromDb()
        const processedData = recipesInDb.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            image: recipe.image,
            steps: recipe.steps,
            diets: recipe.diets.map((d) => {
                return d.name;
            }).join(", "),
            myRecipe: recipe.createdInDb
        }));
        return processedData;
    }   catch (error) {
        res.status(400).send("Error processing data")
    }
};

// ------------------------------ RECIPE CONTROLLERS ------------------------------
const getAllRecipes = async () => {
    const apiRecipes = await getDataFromApi()
    const dbRecipes = await processDataFromDb()
    const allRecipes = apiRecipes.concat(dbRecipes)
    return allRecipes
};

const getRecipeById = async (id) => {
    const allRecipes = await getAllRecipes()
    let recipeId = await allRecipes.filter((r) => r.id == id)
    if (recipeId.length) return recipeId
    else throw Error(`The recipe with the ID: ${id} doesn't exist`)
};

const createRecipe = async (name, summary, healthScore, image, steps, diets) => {
    if (!name || !summary || !healthScore || !steps) throw Error("Missing important information")
    const newRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        image,
        steps,
        myRecipe: true
    })
    newRecipe.addDiet(diets)
    return newRecipe
};

// ------------------------------- DIET CONTROLLERS -------------------------------

let diets = [
    { name: "Gluten Free" },
    { name: "Ketogenic" },
    { name: "Vegetarian" },
    { name: "Lacto-Vegetarian" },
    { name: "Ovo-Vegetarian" },
    { name: "Vegan" },
    { name: "Pescatarian" },
    { name: "Paleo" },
    { name: "Primal" },
    { name: "Low FODMAP" },
    { name: "Whole30" }
];

const getDiets = async () => {
    const allDiets = await Diet.findAll()
    if (allDiets.length) return res.status(200).send(allDiets)
    else {
        const defaultDiets = await Diet.bulkCreate(diets)
        return defaultDiets
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    getDiets
};