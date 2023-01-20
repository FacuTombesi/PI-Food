import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import image1 from "../img/bg1.jpg";
import image2 from "../img/bg2.jpg";
import image3 from "../img/bg3.jpg";
import image4 from "../img/bg4.jpg";

const landingPage = () => {
    return (
        <BgContainer>
            <TitleContainer>
                <h1>Welcome to my</h1>
                <h2>Food PI</h2>
                <h3>by Facundo Tombesi</h3>
                <Link to="/home">
                    <button>ENTER</button>
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
    display: flex;
    flex-direction: row;
    align-content: flex-end;
    margin: 0px;
    background-image: url(${selectedPicture});
    background-repeat: no-repeat;
    background-size: cover;
`

const TitleContainer = styled.div`
    /* display: flex;
    flex-direction: column; */
    position: relative;
    float: right;
    /* margin-right: 0%; */
    flex-direction: column;
    margin: 0px;
    background-color: white;
`


export default landingPage;