const { Router } = require('express');
const { getRecipes, getRecipeById, createRecipe, deleteRecipe, getDiets } = require('../controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipeById);
router.delete("/recipes/:id/delete", deleteRecipe);
router.post("/recipes/create", createRecipe);
router.get("/diets", getDiets);


module.exports = router;
