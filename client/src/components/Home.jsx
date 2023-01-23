import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getRecipes, filterMyRecipes, filterByDiet, sortByName, sortByScore, getDiets } from "../redux/actions"; 
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import RecipeCard from "./RecipeCard";

const Home = () => {
    // mapDispatchToProps
    const dispatch = useDispatch()

    // mapStateToProps
    const allRecipes = useSelector(state => state.recipes) 
    const allDiets = useSelector(state => state.diets)

    const [order, setOrder] = useState("") // order es un estado vacío, que sirve para que cuando seteo la página, me modifique el estado local y se renderice
    const [currentPage, setCurrentPage] = useState(1) // Muestra la página actual (1)
    const [recipesPerPage, setRecipesPerPage] = useState(9) // Muestra el máximo de recetas por página (9)
    const indexOfLastRecipe = currentPage * recipesPerPage // Índice de la última receta que es igual a = página actual * cantidad de recetas por página
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // Índice de la primera receta que es igual a = índice de la última receta - cantidad de recetas por página
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) // Guarda todas las recetas que voy a tener por página

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
    }, [dispatch]); // el arreglo del 2ndo parametro se usa cuando queres que el componente se monte siempre que pase algo antes, que dependa de algo para montarse
    
    const handleClick = (e) => {
        e.preventDefault() // Cada vez que se cargue la página, se vuelven a montar las recetas para evitar que se rompa todo
        dispatch(getRecipes()) 
    };
    
    // Filters
    const handleFilterByDiet = (e) => { 
        dispatch(filterByDiet(e.target.value)) 
    };
    
    const handleFilterMyRecipes = (e) => {
        dispatch(filterMyRecipes(e.target.value))
    };
    
    // Sorts
    const handleSortByName = (e) => {
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)  
    };

    const handleSortByScore = (e) => {
        e.preventDefault()
        dispatch(sortByScore(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    };

    return (
        <div className="homeContainer">
            <div className="">
                <NavBar />

                {/* Botón para traer las recetas */}
                <button className="getRecipes" onClick={ e => { handleClick(e) } }> Get all the recipes </button>

                <div className="sortFilterContainer">
                    {/* Sorts */}
                    <select className="sorts" onChange={ (e) => { handleSortByName(e) } }>
                        <option value="noSort"> No order </option>
                        <option value="asc"> A - Z </option>
                        <option value="desc"> Z - A </option>
                    </select>

                    <select className="sorts" onChange={ (e) => { handleSortByScore(e) } }>
                        <option value="noSort"> No order </option>
                        <option value="ascScore"> Lowest Health Score </option>
                        <option value="descScore"> Highest Health Score </option>
                    </select>

                    {/* Filters */}
                    <select className="filters" onChange={ (e) => { handleFilterByDiet(e) } }>
                        <option value="all"> All diets </option>
                        {
                            allDiets?.map(diet => 
                                <option key={diet.id} value={diet.name}> {diet.name} </option>
                            )
                        } 
                    </select>

                    <select className="filters" onChange={ (e) => { handleFilterMyRecipes(e) } }>
                        <option value="all"> All recipes </option>
                        <option value="created"> My recipes </option>
                    </select>

                    {/* Paginado */}
                    <Pagination 
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        pagination={pagination}       
                    />

                    {/* Search Bar */}
                    <SearchBar/>
                </div>
            </div>

            <div className="recipesContainer">
            {   
                Array.isArray(currentRecipes)?
                    currentRecipes[0]?
                    currentRecipes.map(recipe => {
                        return (
                            <div>
                                <Link to = {"/recipes/" + recipe.id} >
                                    <RecipeCard 
                                        name = {recipe.name}
                                        image = {recipe.image? recipe.image : img}
                                        diets = {recipe.diets.map(diet => diet.name + " ")}
                                        healthScore = {recipe.healthScore}
                                        key = {recipe.id}
                                    />
                                </Link>
                            </div>
                        )
                    }) :
                    <div><p className="loader">Loading...</p></div>
                :
                <div><p className="errorByName"> No recipes found with that name </p></div>
            }
            </div>    
        </div>
    )
};

export default Home;