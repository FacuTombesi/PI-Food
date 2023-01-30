import React from 'react';
import styled from 'styled-components';

const Paginado = ({ recipesPerPage, allRecipes, currentPage, paginacion })  =>{
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) { 
        pageNumbers.push(i)
    } 

    const handlePrev = (e) => {
        e.preventDefault()
        paginacion(currentPage - 1)
    }

    const handleNext = (e) => {
        e.preventDefault()
        paginacion(currentPage + 1)
    }

    return (
        <PagContainer>
            <PageList>
                <PageNum>
                    <PageBtn onClick={handlePrev}  disabled={currentPage === pageNumbers[0]}> Prev </PageBtn>
                </PageNum>
                {
                    pageNumbers.map((num) => {
                        return (
                            <PageNum key={num} onClick={() => paginacion(num)} id={num}>
                                <PageBtn> {num} </PageBtn>
                            </PageNum>
                        )
                    }) 
                }
                <PageNum>
                    <PageBtn onClick={handleNext} disabled={currentPage === pageNumbers[pageNumbers.length - 1]}> Next </PageBtn>
                </PageNum>
            </PageList>
        </PagContainer>
    )
};

/* --------------------------------------------------- STYLES --------------------------------------------------- */

const PagContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 22%;
`

const PageList = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 60%;
`

const PageNum = styled.li`
    padding: 5px;
    display: flex;
    flex-direction: row;
`

const PageBtn = styled.button`
    background-color: #F18817;
    border: 1px solid #F18817;
    border-radius: 2px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 100%;
    font-weight: 500;
    color: white;
    &:hover {
        color: black;
        background-color: #F1E217;
        border-color: #F1E217;
    }
    &:focus {
        color: black;
        background-color: #F1E217;
        border: 2px solid black;
    }
    &:disabled {
        border: 1px solid #e9ccae;
        background-color: #999999;
        color: white;
    }
`

export default Paginado;