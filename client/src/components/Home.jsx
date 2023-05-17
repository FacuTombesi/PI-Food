import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterMyRecipes, filterByDiet, sort } from "../redux/actions"; 
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import { RecipeCard } from "./RecipeCard";
import styles from "./Home.module.css";
import defaultImg from "../img/defaultImg.jpg";
import titleImg from "../img/foodpiTitle.png";
import loader from "../img/loader.gif";

const Home = (props) => {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes)

  // paginado
  const [/*order*/, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, /*setRecipesPerPage*/] = useState(9)
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  
  const paginacion = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])
 
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

  const resetFilters = (e) => {
    e.preventDefault()
    document.getElementById("filter1").value = "NoSort"
    document.getElementById("filter2").value = "All"
    document.getElementById("filter3").value = "All"
    setCurrentPage(1)
    setOrder('')
    dispatch(getRecipes())
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
          <div className={styles.filtersCont}>
            {/* SORTS */}
            <div className={styles.filterType}>
              <span className={styles.filtersNames}> Sort by: </span>
              <select id="filter1" className={styles.filter1} onChange={(e) => {handlerSort(e)}}>
                <option value="NoSort"> No order </option>
                <option value="AlphAsc"> A - Z </option>
                <option value="AlphDesc"> Z - A </option>
                <option value="ScoreAsc"> Lowest Health Score </option>
                <option value="ScoreDesc"> Highest Health Score </option>
              </select>
            </div>
            {/* FILTERS */}
            <div className={styles.filterType}>
              <span className={styles.filtersNames}> Diet type: </span>
              <select id="filter2" className={styles.filter2} onChange={(e) => {handlerFilterByDiet(e)}}>
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
            </div>
            <div className={styles.filterType}>
              <span className={styles.filtersNames}> Display: </span>
              <select id="filter3" className={styles.filter3} onChange={(e) => {handlerFilterMyRecipes(e)}}>
                <option value="All"> All recipes </option>
                <option value="Created"> My recipes </option>
              </select>
            </div>
          </div>
          {/* BOTÓN PARA RESETEAR FILTROS */}
          <button className={styles.getAllBtn} onClick={resetFilters}> Reset filters </button>
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