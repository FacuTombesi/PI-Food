import React from "react";
import styled from "styled-components";

const RecipeCard = ({ name, summary, healthScore, image, diets }) => {
    return (
        <>
            <h2> { name } </h2>
            <img src={image} alt="RecipeImage" />
            <p> { summary } </p>
            <h4> Health Score: { healthScore } </h4>
            <h4> Diet types: </h4>
            <ul>
                { diets?.map((diets) => {
                    return (
                        <li>
                            { diets }
                        </li>
                    )
                }) }
            </ul>
        </>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

export default RecipeCard;