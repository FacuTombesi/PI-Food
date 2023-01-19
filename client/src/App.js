import { Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from "./components/Landing";
import Home from "./components/Home";
import CreateRecipe from "./components/CreateRecipe";
import RecipeDetail from "./components/RecipeDetail";
import About from "./components/About";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/recipes/create" component={CreateRecipe}></Route>
        <Route path="/recipes/:id" component={RecipeDetail}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </>
  )
};

export default App;
