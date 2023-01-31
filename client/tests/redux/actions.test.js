import nodeFetch from 'node-fetch';

global.fetch = nodeFetch;

describe("Redux - Actions", () => {
  it("Debería declarar y exportar las variables GET_RECIPES, GET_DIETS y CREATE_RECIPE", () => {
    expect(types.GET_RECIPES).toBeDefined()
    expect(types.GET_DIETS).toBeDefined()
    expect(types.CREATE_RECIPE).toBeDefined()
    expect(types.GET_RECIPES).toEqual("GET_RECIPES")
    expect(types.GET_DIETS).toEqual("GET_DIETS")
    expect(types.CREATE_RECIPE).toEqual("CREATE_RECIPE")
  })
});
