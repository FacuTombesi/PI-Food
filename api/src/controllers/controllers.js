const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize")


// ------------------------------ RECIPE CONTROLLERS ------------------------------

const getRecipes = async () => {
    const recipes = await Recipe.findAll()
    if (!recipes.length) throw Error("The recipe book is empty")
    return recipes
};

const findRecipe = async (name) => {
    if (!name) throw Error("Please specify a name to search")
    const results = await Recipe.findAll({ where: { 
        name: { [Op.iLike]: `%${name}%` }
    }})
    if (!results) throw Error(`No recipes found with the name: ${name}`)
    return results
};

const getRecipeById = async (id) => {
    const recipe = await Recipe.findByPk(id)
    if (!recipe) throw Error(`There is no recipe with the ID: ${id}`)
    return recipe
};

const createRecipe = async (name, description, health_score, steps) => {
    if (!name || !description) throw Error("Missing required information")
    const newRecipe = await Recipe.create({ name, description, health_score, steps })
    return newRecipe
};

const deleteRecipe = async (id) => {
    const recipeToDelete = await Recipe.findByPk(id) 
    if (!recipeToDelete) throw Error(`Recipe with the ID: ${id} does not exist`)
    await recipeToDelete.destroy() 
    return recipeToDelete
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

const getDiets = async () => {
    const allDiets = await Diet.findAll()
    if (!allDiets.length) {
        const defaultDiets = await Diet.bulkCreate(diets)
        return defaultDiets
    }   else {
        throw Error("There are no diets yet")
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