const { Router } = require("express");
const { Recipe, Diet } = require("../../db")
const { getAllRecipes, getRecipeById, createRecipe } = require("../../controllers/controllers");

const recipeRouter = Router();

recipeRouter.get("/", async (req, res) => {
    const { name } = req.query
    const allRecipes = await getAllRecipes()
    try {
        if (!name) return res.status(200).json(allRecipes)
        const filterByName = allRecipes.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()))
        if (!filterByName[0]) return res.status(200).json(`The are no recipes with the name: ${name}`)
        res.status(200).json(filterByName)
    }   catch (error) {
        res.status(404).json(error.message)
    }
});

recipeRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    // try {
    //     if (id.includes("-")) {
    //         const recipeFromDb = await Recipe.findOne({ 
    //             where: { id },
    //             include: { model: Diet }
    //         })
    //         if (!recipeFromDb) throw Error(`No recipe found with the ID: ${id}`)
    //         return res.status(200).json(recipeFromDb)
    //     }   else {
    //         const recipeFromApi = await getRecipeById(id)
    //         if (!recipeFromApi) throw Error(`No recipe found with the ID: ${id}`)
    //         res.status(200).json(recipeFromApi)
    //     }
    // }   catch (error) {
    //     res.status(404).send(error)
    // }
    try {
        let recipeById = await getRecipeById(id)
        res.status(200).send(recipeById)
    }   catch (error) {
        res.status(404).send(error)
    }
});

recipeRouter.post("/create", async (req, res) => {
    try {
        const { name, image, summary, healthScore, steps, diets } = req.body
        const newRecipe = await createRecipe(name, image, summary, healthScore, steps, diets);
        res.status(200).send(`Recipe "${name}" added to the recipe book`);
    }   catch (error) {
        res.status(400).send(error.message)
    }
});


module.exports = recipeRouter;