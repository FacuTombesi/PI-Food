import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../redux/actions";

const validation = (input) => {
    let errors = {}
    if (!input.name) errors.name = "A name is required for your recipe"
    else if (!input.summary) errors.summary = "A summary about the recipe is required"
    else if (!input.healthScore) errors.healthScore = "Please tell us how healthy it is"
    else if (input.healthScore < 0 || input.healthScore > 100) errors.healthScore = "The score must be between 0 and 100"
    return errors
};

const CreateRecipe = (props) => {
    const dispatch = useDispatch()
    const history = useHistory() // useNavigate
    const diets = useSelector((state) => state.diets)

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        image: "",
        diets: []
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validation({
            ...input, 
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            diets: [...input.diets, { name: e.target.value }]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createRecipe(input))
        alert("Recipe created")
        setInput({
            name: "",
            summary: "",
            healthScore: "",
            steps: [],
            image: "",
            diets: []
        })
        history.push("/home")
    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            diets: input.diets.filter(d => d.name !== el.name)
        })
    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    return (
        <div>
            <Link to="/home">
                <button> Return to Home </button>
            </Link>
            <div>
                <h1> Create your recipe </h1>
            </div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label> Name: </label>
                        <input
                        type="text"
                        value={input.name}
                        name="name" // Este debe llamarse igual que el que seteo en el estado, para después poder usarlo en el handleChange
                        onChange={(e) => handleInputChange(e)}
                        />
                        {
                            errors.name && ( 
                                <p className="error">{errors.name}</p>
                            )
                        }
                    </div>
                    <div>
                        <label> Summary: </label>
                        <input
                        type="text"
                        value={input.dishSummary}
                        name="dishSummary"
                        onChange={(e) => handleInputChange(e)}
                        />
                        {
                            errors.summary && ( 
                                <p className="error">{errors.summary}</p> 
                            )
                        }
                    </div>
                    <div>
                        <label> Health Score: </label>
                        <input
                        type="number"
                        value={input.healthScore}
                        name="healthScore"
                        onChange={(e) => handleInputChange(e)}
                        />
                        {
                            errors.healthScore && ( 
                                <p className="error">{errors.healthScore}</p> 
                            )
                        }
                    </div>
                    <div>
                        <label> Steps: </label>
                        <input
                        type="text"
                        value={input.steps}
                        name="steps"
                        onChange={(e) => handleInputChange(e)}         
                        />
                    </div>
                    <div>
                        <label> Image: </label>
                        <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => handleInputChange(e)}           
                        />
                    </div>
                    <select onChange={((e) => handleSelect(e))}>
                        {  
                            diets?.map((diet) => (
                                <option key = {diet.id} value = {diet.name}> {diet.name} </option>     
                            ))
                        }
                    </select>
                    <div>
                    {
                        input.diets.map(el =>
                            <div>
                                <p> {el.name} </p>
                                <button type = "button" onClick={() => handleDelete(el)}> X </button>
                            </div>                        
                        )
                    }
                    </div>
                    <button type="submit" disabled={errors.name || errors.dishSummary || errors.healthScore}> CREATE </button>
                </form>
            </div>
        </div>
    )
};

export default CreateRecipe;