import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbar">
                <div className="navbarDiv">
                    <Link className="navbar_link" to="/home">
                        Home
                    </Link>
                </div>
                <div className="navbarDiv">
                    <Link className="navbar_link" to="/recipes/create">
                        Create your recipe
                    </Link>
                </div>
                <div className="navbarDiv">
                    <Link className="navbar_link" to="/about">
                        About
                    </Link>
                </div>
            </div>
        </div>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

export default NavBar;