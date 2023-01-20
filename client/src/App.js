import { Route, Switch } from 'react-router-dom';
import './App.css';
import landingPage from "./components/LandingPage";
import home from "./components/Home";
import createRecipe from "./components/CreateRecipe";
import recipeDetail from "./components/RecipeDetail";
import about from "./components/About";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={landingPage}></Route>
        <Route path="/home" component={home}></Route>
        <Route path="/recipes/create" component={createRecipe}></Route>
        <Route path="/recipes/:id" component={recipeDetail}></Route>
        <Route path="/about" component={about}></Route>
      </Switch>
    </>
  )
};

export default App;
