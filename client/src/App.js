import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateRecipe from "./components/CreateRecipe";
import RecipeDetail from "./components/RecipeDetail";
import About from "./components/About";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route path="/recipes/create" component={CreateRecipe}></Route>
        <Route path="/recipes/:id" component={RecipeDetail}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </div>
  )
};

export default App;
