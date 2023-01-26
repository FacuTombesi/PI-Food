import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions"; 
import styled from "styled-components";

const SearchBar = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputName = (e) => {
        e.preventDefault() 
        setName(e.target.value) 
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        dispatch(getRecipeByName(name))
        setName("")
    }

    return (
        <SearchBarCont>
            <InputBar type="text" placeholder="Enter name / ingredient" onChange={ (e) => handleInputName(e) } />
            <SearchBtn type="submit" onClick={ (e) => handleSubmit(e) }> Search </SearchBtn>
        </SearchBarCont>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

const SearchBarCont = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5%;
`

const InputBar = styled.input`
    width: 100%;
    border: 1px solid #F18817;
    border-radius: 3px;
`

const SearchBtn = styled.button`
    background-color: #F18817;
    color: white;
    font-weight: 600;
    font-size: 80%;
    padding: 1% 2%;
    border: 1px solid #F18817;
    border-radius: 3px;
    &:hover {
        color: black;
        background-color: #F1E217;
        border-color: #F1E217;
    }
`

export default SearchBar;