/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);

const recipe = {
  name: "Plato 1",
  summary: "El plato n°1",
  healthScore: 50
};

describe("Recipes routes", () => {
  
  describe("GET /recipes", () => {
    it("Should get status(200)", () =>
      agent.get('/recipes').expect(200)
    ).timeout(40000)
  })

  describe("GET /recipes/:id", () => {
    it("Should get status(200)", () => 
      agent.get("/recipes/716426").expect(200)
    ).timeout(40000)
    it("Should get status(404)", () => 
      agent.get("/recipes/abc123").expect(200)
    ).timeout(40000)
  })
  
  describe("POST /recipes/create", () => {
    it("Should get status(200)", () => {
      agent.post("recipes/create").send(recipe).expect(200)
    })
  })

});
