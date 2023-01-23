import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeById } from "../redux/actions"; 
import defaultImg from "../img/defaultImg.jpg";
import styled from "styled-components";

const RecipeDetail = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipeById(props.match.params.id))
    }, [dispatch])

    const recipe = useSelector((state) => state.recipeDetail)

    return (
        <>
            {
                recipe?
                <div>
                    <h1> { recipe.name } </h1>
                    {
                        recipe.image?
                        <img src={recipe.image} alt="RecipeImage" /> :
                        <img src={defaultImg} alt="DefaultRecipeImg" />
                    }
                    <h3> Summary: { recipe.summary } </h3>
                    <h3> Health Score: { recipe.healthScore } </h3>
                    <h3> Diet type: { recipe.diets?.map((d) => <li> { d.name } </li>) } </h3>
                    <h3> Steps: { recipe.steps } </h3>
                </div>
                : <p> Preparing... </p>
            }
            <Link to="/home">
                <button> Return to home </button>
            </Link>
        </>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

export default RecipeDetail;