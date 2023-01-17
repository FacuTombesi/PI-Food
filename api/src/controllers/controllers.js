const { Recipe, Diet } = require("../db");

// -------------------- RECIPES GETTERS FROM API AND DATABASE -------------------- 
const getRecipesFromApi = async () => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=300`)
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
        throw Error("Couldn't retrieve recipes from API")
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
        throw Error("The recipe book is empty")
    }
};

const processInfoFromDb = async () => {
    try {
        const dataInDb = await getRecipesFromDb()
        const processedData = dataInDb.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            healthScore: recipe.healthScore,
            image: recipe.image,
            summary: recipe.summary,
            steps: recipe.steps,
            diets: recipe.diets.map((diet) => {
                return diet.name;
            }).join(", "),
            myRecipe: recipe.createdInDb
        }));
        return processedData;
    }   catch (error) {
        throw Error("Error processing data")
    }
};

const getAllRecipes = async () => {
    try {
        const apiRecipes = await getRecipesFromApi()
        const dbRecipes = await processInfoFromDb()
        const allRecipes = apiRecipes.concat(dbRecipes)
        return allRecipes
    }   catch (error) {
        throw Error(error)
    }
};

// ------------------------------ RECIPE CONTROLLERS ------------------------------
const getRecipes = async (req, res) => {
    try {
        let allRecipes = await getAllRecipes()
        const { name } = req.query
        if (name) {
            let findByName = await allRecipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(name.toLowerCase())
            )
            if (findByName.length) {
                return res.status(200).send(findByName)
            }   else {
                return res.status(404).send(`The recipe ${name} doesn't exist yet`)
            }
        }   else {
            return res.status(200).send(allRecipes)
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
            let findById = await allRecipes.filter((recipe) => recipe.id == id)
            if (findById.length) {
                return res.status(200).send(findById)
            }   else {
                return res.status(404).send(`The recipe with the ID: ${id} doesn't exist`)
            }
        }
    }   catch (error) {
        res.status(404).send(error)
    }
};

const createRecipe = async (req, res) => {
    try {
        const { name, summary, healthScore, image, steps, myRecipe, diets } = req.body
        const recipeCreated = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            steps,
            myRecipe,
            diets,
        })
        recipeCreated.addDiet(diets)
        res.status(200).send(`The recipe ${name} has been added to the recipe book`)
    }   catch (error) {
        res.status(404).send(`Missing important information`)
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const recipeToDelete = await Recipe.findByPk(id)
        if (recipeToDelete) {
            await recipeToDelete.destroy()
            res.status(200).json(recipeToDelete)
        }   else {
            throw Error(`Recipe with the ID: ${id} does not exist`)
        }
    }   catch (error) {
        res.status(400).send(error)
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
        if (!allDiets.length) {
            const defaultDiets = await Diet.bulkCreate(diets)
            return res.status(200).send(defaultDiets)
        }   else {
            return res.status(200).send(allDiets)
        }
    }   catch (error) {
        res.status(404).send("There are no diets yet")
    }
};


module.exports = {
    getRecipes,
    findRecipe,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    getDiets
};