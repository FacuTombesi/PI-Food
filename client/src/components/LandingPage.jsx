import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import titleImg from "../img/foodpiTitle.png";
import image1 from "../img/bg1.jpg";
import image2 from "../img/bg2.jpg";
import image3 from "../img/bg3.jpg";
import image4 from "../img/bg4.jpg";

const LandingPage = (props) => {
    return (
        <BgContainer>
            <TitleContainer>
                <Subtitles> Welcome to my </Subtitles>
                <img src={titleImg} alt="title" width="300px" />
                <Subtitles> by Facundo Tombesi </Subtitles>
                <Link to="/home">
                    <EnterBtn> ENTER </EnterBtn>
                </Link>
            </TitleContainer>
        </BgContainer>
    )
};


/* --------------------------------------------------- STYLES --------------------------------------------------- */

// RANDOM BG
const pictureArray = [image1, image2, image3, image4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];

const BgContainer = styled.div`
    background-image: url(${selectedPicture});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    margin:0%;
    padding-top: 0%;   
    padding-bottom: 0%; 
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    float: right;
    background-color: white;
    width: 40%;
    height: 100%;
    border-radius: 30px;

    @media only screen and (max-width: 600px) {
        width: 100%;
        height: auto;
        border-radius: 0px;
        margin: 20% 0px;
        padding: 5% 0px;
    }
`

const EnterBtn = styled.button`
    background-color: #F18817;
    border-radius: 5px;
    border-color: #F18817;
    color: white;
    font-weight: 600;
    font-size: 100%;
    padding: 10% 25%;

    @media only screen and (max-width: 600px) {
        padding: 6% 15%;
        margin-bottom: 15%;
    }

    &:hover {
        color: black;
        background-color: #F1E217;
        border-color: #F1E217;
    }
`

const Subtitles = styled.h2`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 300;
    font-size: 140%;

    @media only screen and (max-width: 600px) {
        font-size: 100%;
    }
`

export default LandingPage;