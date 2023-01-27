import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import getRecipeById from "../redux/actions"; 
import NavBar from "./NavBar";
import defaultImg from "../img/defaultImg.jpg";
import detailBg from "../img/detailBg.jpg";
import titleImg from "../img/foodpiTitle.png";
import loader from "../img/loader.gif";
import styled from "styled-components";

const RecipeDetail = (props) => {
    // const dispatch = useDispatch()
    // const recipeDetail = useSelector((state) => state.recipeDetail)
    const { id } = useParams()
    const [recipeDetail, setRecipe] = useState({})
    
    // useEffect(() => {
    //     dispatch(getRecipeById(props.match.params.id))
    // }, [dispatch])
    useEffect(() => {
        fetch(`http://localhost:3001/recipes/${id}`)
            .then((response) => response.json())
            .then((data) => setRecipe(data))
            .catch((error) => window.alert(`${error.message}`))
        return () => setRecipe({})
    }, [id])

    return (
        <DetailPage>
            <Header>
                <img src={titleImg} alt="title" width="140px" />
                <NavBar />
                
            </Header>

            <DetailCont>
                {
                    recipeDetail[0]? (
                        <div>
                            <TitleImage>
                                <RecipeName> { recipeDetail[0].name } </RecipeName>
                                {
                                    recipeDetail[0].image?
                                        <img src={recipeDetail[0].image} alt={recipeDetail[0].name} width="300px" height="250px" /> :
                                        <img src={defaultImg} alt="Default Recipe" width="300px" height="250px" />
                                }
                            </TitleImage>
                            <InfoBox>
                                <InfoName> Summary: </InfoName>
                                <InfoContent> { recipeDetail[0].summary } </InfoContent>
                                <InfoName> Health Score: </InfoName>
                                <InfoContent> { recipeDetail[0].healthScore } </InfoContent>
                                <InfoName> Diet type: </InfoName>
                                {
                                    recipeDetail[0].diets.length?
                                        <InfoContent> { recipeDetail[0].diets.charAt(0).toUpperCase() + recipeDetail[0].diets.slice(1) } </InfoContent> :
                                        <InfoContent> There are no diets for this recipe yet </InfoContent>
                                }
                                {/* <InfoContent> { recipeDetail[0].diets.charAt(0).toUpperCase() + recipeDetail[0].diets.slice(1) } </InfoContent> */}
                                <InfoName> Steps: </InfoName>
                                <InfoContent> { recipeDetail[0].steps } </InfoContent>
                                <Link to="/home">
                                    <BackBtn> Back to the recipe book </BackBtn>
                                </Link>
                            </InfoBox>
                        </div>
                    ) : <LoaderCont>
                            <LoaderGif src={loader} alt="Loader" />
                            <Loader> Cooking... </Loader>
                        </LoaderCont>
                }
            </DetailCont>
        </DetailPage>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

const DetailPage = styled.div `
    background-image: url(${detailBg});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
`

const Header = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 0px;
    background-color: white;
    width: 30%;
    height: 100%;
    border-radius: 30px;
`

const DetailCont = styled.div `
    background-color: white;
    border: 1px solid white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    height: 80%;
    margin-left: 3%;
    margin-top: 2%;
    margin-bottom: 2%;
    padding-inline: 25px 25px;
`

const TitleImage = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
`

const RecipeName = styled.h1 `
    color: #F18817;
    text-decoration: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 130%;
    font-weight: 600;
    text-align: center;
`

const InfoBox = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`

const InfoName = styled.h3 `
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #F18817;
    font-weight: 400;
    margin-top: 0px;
    margin-bottom: -10px;
`

const InfoContent = styled.p `
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: black;
    font-size: 110%;
    font-weight: 500;
    text-align: left;
`

const BackBtn = styled.button `
    background-color: #F18817;
    border-radius: 5px;
    border-color: #F18817;
    color: white;
    font-weight: 600;
    font-size: 80%;
    padding: 1% 2%;
    margin-top: 5%;
    &:hover {
        color: black;
        background-color: #F1E217;
        border-color: #F1E217; 
    }
`

const LoaderCont = styled.div `
    background-color: white;
    border: 1px solid white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20%;
`

const LoaderGif = styled.img `
    margin-top: 20%;
    width: 200px;
`

const Loader = styled.p `
    color: #F18817;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 180%;
    font-weight: 600;
`

export default RecipeDetail;