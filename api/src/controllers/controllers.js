// const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");

// -------------------- GETTING AND MERGING DATA FROM API AND DATABASE -------------------- 
const getDataFromApi = async () => {
    // const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

    // Api creada a partir de la data de la Api de spoonacular para evitar límite de request a la Api
    const response = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    // console.log(response)
    const dataFromApi = await response.data.results.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            summary: recipe.summary.replace(/<[^>]*>?/g, ""),
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions[0]?.steps.map((r) => {
                return r.step
            }), // steps es un array
            diets: recipe.diets.join(", ")
        }
    })
    return dataFromApi
};

// VERSIÓN SYNC
// const getDataFromApi = () => {
//     return fetch("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
//       .then(response => response.json())
//       .then(data => {
//         return data.results.map(recipe => {
//           return {
//             id: recipe.id,
//             name: recipe.title,
//             image: recipe.image,
//             summary: recipe.summary.replace(/<[^>]*>?/g, ""),
//             healthScore: recipe.healthScore,
//             steps: recipe.analyzedInstructions[0]?.steps.map((r) => {
//               return r.step
//             }),
//             diets: recipe.diets.join(", ")
//           }
//         })
//       })
//   };

const getDataFromDb = () => {
    const dataFromDb = Recipe.findAll({
        include: {
            model: Diet, // Incluyo al modelo Diet para asociarlo a mis recetas
            attributes: ["name"], // A través del atributo "name"
            through: {
                attributes: []
            }
        }
    })
    return dataFromDb
}; 

const dataFromDb = async () => {
    const dataDb = await getDataFromDb()
    const recipeFromDb = dataDb.map((r) => ({
        id: r.id,
        name: r.name,
        image: r.image,
        summary: r.summary,
        healthScore: r.healthScore,
        steps: r.steps,
        diets: r.diets.length
                ? r.diets.map((d) => d.name).join(", ")
                : r.diets
    }))
    return recipeFromDb
};

const getAllRecipes = async () => {
    const apiRecipes = await getDataFromApi()
    const dbRecipes = await dataFromDb()
    const allRecipes = apiRecipes.concat(dbRecipes)
    return allRecipes
};

// ------------------------------ RECIPE CONTROLLERS ------------------------------
const getRecipeById = async (id) => {
    const allRecipes = await getAllRecipes()
    const recipeById = await allRecipes.filter((r) => r.id == id)
    if (recipeById) return recipeById
    else throw Error(`No recipe found with the ID: ${id}`)
};

const createRecipe = async (name, image, summary, healthScore, steps, diets) => {
    if (!name || !summary || !healthScore || !steps) throw Error("Missing important information")
    const newRecipe = await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        steps,
        diets
    })
    newRecipe.addDiet(diets)
    return newRecipe
};

// ------------------------------- DIET CONTROLLERS -------------------------------

let diets = [
    { name: "Gluten Free" },
    { name: "Ketogenic" },
    { name: "Lacto-Ovo-Vegetarian" },
    { name: "Vegan" },
    { name: "Pescatarian" },
    { name: "Paleo" },
    { name: "Primal" },
    { name: "Low FODMAP" },
    { name: "Whole 30" }
];

const getDiets = async () => {
    const allDiets = await Diet.findAll()
    if (allDiets.length > 0) return allDiets.map((diet) => diet.name)
    else {
        defaultDiets = await Diet.bulkCreate(diets)
        return defaultDiets.map((diet) => diet.name)
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    getDiets
};