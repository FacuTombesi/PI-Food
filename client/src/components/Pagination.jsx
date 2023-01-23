import React from 'react';

export const Pagination = ({ recipesPerPage, allRecipes, paginado })  =>{
    
    const pageNumbers = [];

    for (var i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
    } 

    return (
        <nav>
            <ul className='pagination'>
                {
                    pageNumbers && pageNumbers.map(num => (   
                        <li className='num' key = {num}>
                            <a onClick={() => paginado(num)}> {num} </a>
                        </li>
                    ))  
                }
            </ul>
        </nav>
    )
};