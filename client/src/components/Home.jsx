import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { getRecipes, filterMyRecipes, filterByDiet, sort } from "../redux/actions"; 
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import { RecipeCard } from "./RecipeCard";
import styles from "./Home.module.css";
import defaultImg from "../img/defaultImg.jpg";
import titleImg from "../img/foodpiTitle.png";
import loader from "../img/loader.gif";
import { Link } from "react-router-dom";

const Home = (props) => {
  // mapDispatchToProps
  const dispatch = useDispatch()

  // mapStateToProps
  const allRecipes = useSelector((state) => state.recipes)

  // paginado
  const [/*order*/, setOrder] = useState('') // order es un estado vacío, que sirve para que cuando seteo la página, me modifique el estado local y se renderice
  const [currentPage, setCurrentPage] = useState(1) // Muestra la página actual (1)
  const [recipesPerPage, /*setRecipesPerPage*/] = useState(9) // Muestra el máximo de recetas por página (9)
  const indexOfLastRecipe = currentPage * recipesPerPage // Define el índice de la última receta que es igual a = página actual * cantidad de recetas por página
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // Define el índice de la primera receta que es igual a = índice de la última receta - cantidad de recetas por página
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) // Guarda todas las recetas que voy a tener por página
  
  const paginacion = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch]) // El arreglo del segundo parámetro ( [dispatch] ) se usa cuando querés que el componente se monte siempre que pase algo antes, que dependa de algo para montarse
 
  const handlerClick = (e) => {
    e.preventDefault() // Cada vez que se cargue la página, se vuelven a montar las recetas para evitar que se rompa todo
    setCurrentPage(1)
    setOrder('')
    dispatch(getRecipes())
  }

  // FILTERS
  const handlerFilterByDiet = (e) => { 
    dispatch(filterByDiet(e.target.value)) 
  }

  const handlerFilterMyRecipes = (e) => {
    dispatch(filterMyRecipes(e.target.value))
  }

  // SORT
  const handlerSort = (e) => {
    e.preventDefault()
    dispatch(sort(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  return (
    <div className={styles.home}>

      <div className={styles.header}>

        <Link to="/">
          <img src={titleImg} alt="title" width="140px" />
        </Link>

        <NavBar />

        <div className={styles.searchFilter}>

          {/* SEARCH BAR */}
          <SearchBar/>

          {/* SORTS */}
          <span className={styles.filtersNames}> Sort by: </span>
          <select className={styles.filter1} onChange={(e) => {handlerSort(e)}}>
            <option value="NoSort"> No order </option>
            <option value="AlphAsc"> A - Z </option>
            <option value="AlphDesc"> Z - A </option>
            <option value="ScoreAsc"> Lowest Health Score </option>
            <option value="ScoreDesc"> Highest Health Score </option>
          </select>

          {/* FILTERS */}
          <span className={styles.filtersNames}> Diet type: </span>
          <select className={styles.filter2} onChange={(e) => {handlerFilterByDiet(e)}}>
            <option value="All"> All diets </option>
            <option value="gluten free"> Gluten Free </option>
            <option value="ketogenic"> Ketogenic </option>
            <option value="dairy free"> Dairy Free </option>
            <option value="lacto ovo vegetarian"> Lacto-Ovo-Vegetarian </option>
            <option value="vegan"> Vegan </option>
            <option value="pescatarian"> Pescatarian </option>
            <option value="paleolithic"> Paleo </option>
            <option value="primal"> Primal </option>
            <option value="fodmap friendly"> Low FODMAP </option>            
            <option value="whole 30"> Whole 30 </option>
          </select>

          <span className={styles.filtersNames}> Display: </span>
          <select className={styles.filter3} onChange={(e) => {handlerFilterMyRecipes(e)}}>
            <option value="All"> All recipes </option>
            <option value="Created"> My recipes </option>
          </select>

          {/* BOTÓN PARA TRAER TODAS LAS RECETAS */}
          <button className={styles.getAllBtn} onClick={(e) => {handlerClick(e)}}> Reload the recipes </button>

        </div> {/* searchFilter */}

      </div> {/* header */}

      <div className={styles.rContainer}>

        <div>

          <div className={styles.recipes}>

            {   
              Array.isArray(currentRecipe)?
                currentRecipe[0]?
                currentRecipe.map(recipe => {
                  return (
                    <div key={recipe.id}>
                      <RecipeCard 
                        id={recipe.id}
                        name = {recipe.name}
                        image = {recipe.image ? recipe.image : defaultImg}
                        diets = {recipe.diets}
                        healthScore = {recipe.healthScore}
                        // key = {recipe.id}
                      />
                    </div>
                  )
                }): <div className={styles.lContainer}>
                      <img className={styles.loaderGif} src={loader} alt="Loader" />
                      <p className={styles.loader}> Cooking... </p>
                    </div>
              : <div className={styles.eContainer}>
                  <p className={styles.error}> No recipes found with that name </p>
                </div>
            }
                
          </div> {/* recipes */}

          <div>

            <Paginado 
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              currentPage={currentPage}
              paginacion={paginacion}       
            />

          </div>

        </div>

      </div> {/* rContainer */}

    </div> 
  )
};

export default Home;