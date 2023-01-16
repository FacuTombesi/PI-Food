const { Router } = require('express');
const { getRecipeById, createRecipe, getRecipes, deleteRecipe, findRecipe, getDiets } = require('../controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
    const { name } = req.query 
    let recipes
    try {
        if (name) recipes = await findRecipe(name)
        else recipes = await getRecipes()
        res.status(200).json(recipes)
    }   catch (error) {
        res.status(404).send(error.message)
    }
});

router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await getRecipeById(id)
        res.status(200).json(recipe)
    }   catch (error) {
        res.status(404).send(error.message)
    }
});

router.delete("/recipes/:id/delete", async (req, res) => {
    const { id } = req.params
    try {
        const deletedRecipe = await deleteRecipe(id)
        res.status(200).json(deletedRecipe)
    }   catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/recipes", async (req, res) => {
    const { name, description, health_score, steps } = req.body
    try {
        const newRecipe = await createRecipe(name, description, health_score, steps)
        res.status(200).json(newRecipe)
    }   catch (error) {
        res.status(400).send(error.message)
    }
});

router.get("/diets", async (req, res) => {
    try {
        const diets = await getDiets()
        res.status(200).json(diets)
    }   catch (error) {
        res.status(404).send("There are no diets yet")
    }
});


module.exports = router;
