// const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet, recipeDiet } = require("../db");

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
            steps: recipe.analyzedInstructions.steps?.map(step => step), // steps es un array
            diets: recipe.diets?.map(diet => diet = { name: diet })
        }
    })
    return dataFromApi
};

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

const getAllRecipes = async () => {
    const apiRecipes = await getDataFromApi()
    const dbRecipes = await getDataFromDb()
    const allRecipes = apiRecipes.concat(dbRecipes)
    return allRecipes
};

// ------------------------------ RECIPE CONTROLLERS ------------------------------
const getRecipeById = async (id) => {
    const response = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    const recipe = response.data
    const recipeById = {
        name: recipe.title,
        image: recipe.image,
        summary: recipe.summary.replace(/<[^>]*>?/g, ""),
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions.steps?.map(step => step),
        diets: recipe.diets?.map(diet => diet = { name: diet })
    }
    return recipeById
};

const createRecipe = async (name, image, summary, healthScore, steps, diets) => {
    if (!name || !summary || !healthScore || !steps) throw Error("Missing important information")
    const newRecipe = await Recipe.create({
        name: name,
        image: image,
        summary: summary,
        healthScore: healthScore,
        steps: [[steps]] // El modelo espera un array por lo que le tendo que pasar un array
    })
    let dietsAux = diets.map(diet => diet.name.toLowerCase())
    let dietsDb = await Diet.findAll()
    // console.log(dietsDb)
    let newDiets = dietsDb.filter(diet => dietsAux.includes(diet.dataValues.name)) // Filtro dietsDb para incluir a newRecipe sólo las dietas cuyo nombre sea igual al recibido por parámetro
    await newRecipe.addDiet(newDiets, { through: { recipeDiet } }) // Agrego las dietas a la nueva receta y las vinculo a través de la tabla intermedia
    return newRecipe
};

// ------------------------------- DIET CONTROLLERS -------------------------------

// Esto ya no me sirve porque fue incluido en la nueva api creada con mocky.io
// let diets = [
//     { name: "Gluten Free" },
//     { name: "Ketogenic" },
//     { name: "Vegetarian" },
//     { name: "Lacto-Vegetarian" },
//     { name: "Ovo-Vegetarian" },
//     { name: "Vegan" },
//     { name: "Pescatarian" },
//     { name: "Paleo" },
//     { name: "Primal" },
//     { name: "Low FODMAP" },
//     { name: "Whole30" }
// ];

const getDiets = async () => {
    const dataFromApi = await getDataFromApi() // La api ahora incluye un array con todos los tipos de dietas
    const allDietsFromApi = dataFromApi.map(recipe => recipe.diets)
    // console.log(diets)
    allDietsFromApi.forEach(dietsPerRecipe => {
        dietsPerRecipe.map(diet => { // Diet es un array, por lo que por cada dieta uso findOrCreate...
            Diet.findOrCreate({ where: { name: diet.name } }) // ... findOrCreate busca (o crea, si no encuentra) la dieta que reciba el nombre pedido
        })
    })
    const allDiets = await Diet.findAll()
    return allDiets
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    getDiets
};