const axios = require("axios");
const { Recipe, Diet } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;

// -------------------- RECIPES GETTERS FROM API AND DATABASE -------------------- 
const getRecipesFromApi = async () => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const recipesApi = await response.data.results.map((recipe) => {
            const { id, healthScore, image } = recipe
            return {
                id,
                name: recipe.title,
                healthScore,
                image,
                summary: recipe.summary.replace(/<[^>]*>?/g, ""),
                steps: recipe.analyzedInstructions[0]?.steps.map((recipeStep) => {
                    return recipeStep.step;
                }),
                diets: recipe.diets.join(", ")
            }
        })
        return recipesApi
    }   catch (error) {
        res.status(400).send("Couldn't retrieve recipes from API")
    }
};

const getRecipesFromDb = async () => {
    try {
        const recipesDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })
        return recipesDb
    }   catch (error) {
        res.status(404).send("The recipe book is empty")
    }
};

const processInfoFromDb = async () => {
    try {
        const recipesInDb = await getRecipesFromDb()
        const processedData = recipesInDb.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            healthScore: recipe.healthScore,
            image: recipe.image,
            summary: recipe.summary,
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

const getAllRecipes = async () => {
    try {
        const apiRecipes = await getRecipesFromApi()
        const dbRecipes = await processInfoFromDb()
        const allRecipes = apiRecipes.concat(dbRecipes)
        return allRecipes
    }   catch (error) {
        res.status(400).send(error)
    }
};

// ------------------------------ RECIPE CONTROLLERS ------------------------------
const getRecipes = async (req, res) => {
    try {
        let allRecipes = await getAllRecipes()
        const { name } = req.query
        if (name) {
            let findByName = await allRecipes.filter((r) =>
                r.name.toLowerCase().includes(name.toLowerCase())
            )
            if (findByName.length) {
                res.status(200).send(findByName)
            }   else {
                throw Error(`The recipe ${name} doesn't exist yet`)
            }
        }   else {
            res.status(200).send(allRecipes)
        }
    }   catch (error) {
        res.status(404).send(error)
    }
};

const getRecipeById = async (req, res) => {
    try {
        const allRecipes = await getRecipes()
        const { id } = req.params
        if (id) {
            let findById = await allRecipes.filter((r) => r.id == id)
            if (findById.length) {
                res.status(200).send(findById)
            }   else {
                throw Error(`The recipe with the ID: ${id} doesn't exist`)
            }
        }
    }   catch (error) {
        res.status(404).send(error)
    }
};

const createRecipe = async (req, res) => {
    try {
        const { name, summary, healthScore, image, steps, myRecipe, diets } = req.body
        if (!name || !summary || !steps) throw Error("Missing important information")
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            steps,
            myRecipe,
            diets,
        })
        newRecipe.addDiet(diets)
        res.status(200).send(`The recipe ${name} has been added to the recipe book`)
    }   catch (error) {
        res.status(404).send(error)
    }
};

// ------------------------------- DIET CONTROLLERS -------------------------------

let dietId = 0;

let diets = [
    {
        name: "Gluten Free",
        id: ++dietId,
    },
    {
        name: "Ketogenic",
        id: ++dietId,
    },
    {
        name: "Vegetarian",
        id: ++dietId,
    },
    {
        name: "Lacto-Vegetarian",
        id: ++dietId,
    },
    {
        name: "Ovo-Vegetarian",
        id: ++dietId,
    },
    {
        name: "Vegan",
        id: ++dietId,
    },
    {
        name: "Pescatarian",
        id: ++dietId,
    },
    {
        name: "Paleo",
        id: ++dietId,
    },
    {
        name: "Primal",
        id: ++dietId,
    },
    {
        name: "Low FODMAP",
        id: ++dietId,
    },
    {
        name: "Whole30",
        id: ++dietId,
    }
];

const getDiets = async (req, res) => {
    try {
        const allDiets = await Diet.findAll()
        if (allDiets.length) return res.status(200).send(allDiets)
        else {
            try {
                const defaultDiets = await Diet.bulkCreate(diets)
                return res.status(200).send(defaultDiets)
            }   catch (error) {
                res.status(404).send("There are no diets yet")
            }
        }
    }   catch (error) {
        res.status(404).send("There are no diets yet")
    }
};

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    getDiets
};