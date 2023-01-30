const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe("Recipe model", () => {
  // beforeAll(async () => {
  //   await conn.sync({ force: true })
  // })

  describe("Recipe Name", () => {
    it("Should throw an error if name is null", async () => {
      expect.assertions(1)
      try {
        await Recipe.create({ healthScore: 20 })
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })
    it("Should create a recipe if all required data is recibed", async () => {
      const recipe = await Recipe.create({
        name: "Plato 1",
        summary: "El plato n°1",
        healthScore: 50
      })
      expect(recipe.toJSON()).lessThanOrEqual({
        name: "Plato 1",
        image: null,
        summary: "El plato n°1",
        healthScore: 50,
        steps: null
      })
    })
  })

  describe("Recipe Health Score", () => {
    it("Should throw an error if health score is not a number", async () => {
      expect.assertions(1)
      try {
        await Recipe.create({ name: "Plato 2", summary: "El plato n°2", healthScore: "very healthy" })
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    it("Should create a recipe if all required data is recibed", async () => {
      const recipe = await Recipe.create({
        name: "Plato 3",
        summary: "El plato n°3",
        healthScore: 50
      })
      expect(recipe.toJSON()).lessThanOrEqual({
        name: "Plato 3",
        image: null,
        summary: "El plato n°3",
        healthScore: 50,
        steps: null
      })
    })
  })

  // afterAll(async () => {
  //   await conn.sync({ force: true })
  //   conn.close()
  // })
});
