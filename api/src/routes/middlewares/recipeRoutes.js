const { Router } = require("express");
const { getRecipes, getRecipeById, createRecipe } = require("../../controllers/controllers");

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/create", createRecipe);


module.exports = router;