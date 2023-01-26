import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import detailBg from "../img/detailBg.jpg";
import titleImg from "../img/foodpiTitle.png";
import myPhoto from "../img/aboutImgs/myphoto.png";
import linkedin from "../img/aboutImgs/linkedin-logo.png";
import github from "../img/aboutImgs/github-logo.png";
import styled from "styled-components";

const About = (props) => {
    return (
        <AboutPage>
            <Header>
                <img src={titleImg} alt="title" width="140px" />
                <NavBar />
                
            </Header>

            <AboutCont>
                <AboutMe>
                    <img src={myPhoto} alt="That's me!" width="200px" />
                    <AboutMeInfo>
                        <AboutTitles> About me </AboutTitles>
                        <p> Hi! My name is Facundo Tombesi, from Argentina. By the time of writing (Friday 27 of January of 2023), I'm a Multimedia Designer and currently studying Fullstack 
                            Development at HENRY. I'm at the last stages of my first step as a Fullstack Developer and this project is part of that. </p>
                    </AboutMeInfo>
                </AboutMe>
                <AboutPi>
                    <AboutTitles> About this project </AboutTitles>
                    <p> This is a solo project which is part of individual project assignment for HENRY. The theme is food recipes and the goal is to create a catalog (kind of a recipe book) 
                        fetching data from an external API and a database made by me, adding filters find especific information and an option to sort that data, as well as an option to create 
                        your own recipe and add it to the database. </p>
                </AboutPi>
                <LinkCont>
                    <ExtLink>
                        <a href="https://www.linkedin.com/in/facundotombesi/" target="_blank" rel="noreferrer">
                            <img src={linkedin} alt="LinkedIN logo" width="150px" />
                        </a>
                        <a href="https://github.com/FacuTombesi" target="_blank" rel="noreferrer">
                            <img src={github} alt="GitHub logo" width="150px" />
                        </a>
                    </ExtLink>
                    <Link to="/home">
                        <BackBtn> Back to the recipe book </BackBtn>
                    </Link>
                </LinkCont>
            </AboutCont>
        </AboutPage>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

const AboutPage = styled.div `
    background-image: url(${detailBg});
    background-attachment: fixed;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    background-size: cover;
    min-height: 100vh;
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

const AboutMe = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5%;
    margin-inline: 5% 5%;
`

const AboutTitles = styled.h3 `
    color: #F18817;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 400;
    font-size: 140%;
    margin-bottom: -10px;
`

const AboutMeInfo = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5%;
`

const AboutPi = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 5%;
    margin-left: 5%;
`

const AboutCont = styled.div `
    background-color: white;
    border: 1px solid white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    height: 80%;
    margin-left: 3%;
    margin-top: 2%;
    padding-inline: 25px 25px;
`

const LinkCont = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 5%;
`

const ExtLink = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 3%;
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

export default About;