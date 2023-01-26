import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
    return (
        <div>
            <Nav>
                <StyledLink to="/home">
                    Home
                </StyledLink>
                <span> • </span>
                <StyledLink to="/recipes/create">
                    Create your recipe
                </StyledLink>
                <span> • </span>
                <StyledLink to="/about">
                    About
                </StyledLink>
            </Nav>
        </div>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

const Nav = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5%;
    margin-bottom: 5%;
`

const StyledLink = styled(Link)`
    padding-inline: 5px 5px;
    color: #F18817;
    text-decoration: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 110%;
    font-weight: 500;
    &:hover {
        color: black;
    }
`

export default NavBar;