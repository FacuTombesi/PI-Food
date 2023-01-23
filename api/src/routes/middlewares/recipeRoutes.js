const { Router } = require("express");
const { getAllRecipes, getRecipeById, createRecipe } = require("../../controllers/controllers");

const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query
    const allRecipes = await getAllRecipes()
    try {
        if (!name) return res.status(200).json(allRecipes)
        const filterByName = allRecipes.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()))
        if (!filterByName[0]) return res.status(200).json(`The are no recipes with the name: ${name}`)
        res.status(200).json(filterByName)
    } catch (error) {
        res.status(404).json(error.message)
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await getRecipeById(id)
        res.status(200).send(recipe)
    }   catch (error) {
        res.status(404).send(error)
    }
});

router.post("/create", async (req, res) => {
    const { name, summary, healthScore, image, steps, diets } = req.body
    try {
        await createRecipe(name, summary, healthScore, image, steps, diets);
        res.status(200).send(`Recipe "${name}" added to the recipe book`);
    }   catch (error) {
        res.status(404).send(error.message)
    }
});


module.exports = router;