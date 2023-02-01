import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// Importamos variables/componentes
import Home from "../../src/components/Home";

configure({ adapter: new Adapter() })

describe('Componente "Home"', () => {
  const wrapperHome = shallow(<Home />)
  const divHome = wrapperHome.find("div")

  it("Renderiza el componente", () => {
    expect(wrapperHome).toBeTruthy()
  })

  it("Debe contener una única etiqueta 'div' que contenga todo lo demás", () => {
    expect(divHome).toHaveLength(1);
  })

  it("Debe renderizar el título con un tag 'img'", () => {
    const img = divHome.find("img")
    expect(img.length).toBe(1)
  })

  it("Debe renderizar una etiqueta 'button'", () => {
    const button = divHome.find("button")
    expect(button.length).toBe(1)
  })
});