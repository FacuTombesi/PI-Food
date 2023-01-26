import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const RecipeCard = ({id, name, image, healthScore, diets }) => {
    return (
        <RecipeContainer>
            <NameImageContainer>
                <StyledLink to={`/recipes/${id}`}>
                    <RecipeName> {name} </RecipeName>
                    <img src={image} alt={name} width="300px" />
                </StyledLink>
            </NameImageContainer>
            <InfoContainer>
                <InfoName> Diet type: </InfoName> 
                <InfoContent> {diets.charAt(0).toUpperCase() + diets.slice(1)} </InfoContent>
            </InfoContainer>
            <InfoContainer>
                <InfoName> Health Score: </InfoName>
                <InfoContent> {healthScore} </InfoContent>
            </InfoContainer>
        </RecipeContainer>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

const RecipeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
    width: 20rem;
    height: 90%;
    border: white;
    border-radius: 10px;
    background-color: white;
`
const NameImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3%;
    margin-bottom: 3%;
    padding-inline: 8px 5px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

const RecipeName = styled.h1`
    /* padding-inline: 5px 5px; */
    color: #F18817;
    text-decoration: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 110%;
    font-weight: 500;
    text-align: center;
    &:hover {
        color: black;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3%;
    margin-bottom: 3%;
`

const InfoName = styled.span`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #F18817;
    font-weight: 400;
`

const InfoContent = styled.span`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: black;
    font-size: 110%;
    font-weight: 500;
    text-align: center;
`