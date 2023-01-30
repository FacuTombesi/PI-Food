import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createRecipe, getRecipes, getDiets } from "../redux/actions";
import NavBar from "./NavBar";
import styles from "./CreateRecipe.module.css";
import titleImg from "../img/foodpiTitle.png";

const validation = (input, recipes) => {
    const nameRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
    const scoreRegex = /^[0-9\b]+$/
    const summaryRegex = /^.{5,500}/
    const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i

    let errors = {}

    // ERRORS FOR NAME
    if (!input.name) errors.name = "Your recipe requires a name"
    else if (!nameRegex.test(input.name)) errors.name = "Please don't include special characters"
    else if (recipes.some((e) => e.name.toLowerCase() === input.name.toLowerCase())) errors.name = "This recipe is already in the recipe book"
    // ERRORS FOR SUMMARY
    else if (!input.summary) errors.summary = "A summary about the recipe is required"
    else if (!summaryRegex.test(input.summary)) errors.summary = "The summary must be between 5 and 500 charactes"
    // ERRORS FOR HEALTH SCORE
    else if (!input.healthScore) errors.healthScore = "Please tell us how healthy (or unhealthy) it is"
    else if (!scoreRegex.test(input.healthScore)) errors.healthScore = "Health Score must be a number"
    else if (input.healthScore < 0 || input.healthScore > 100) errors.healthScore = "The score must be between 0 and 100"
    //ERRORS FOR IMAGE
    else if (!imageRegex.test(input.image)) errors.image = "Invalid URL. An image is optional"
    return errors
};

const CreateRecipe = (props) => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.allRecipes)
    const diets = useSelector((state) => state.diets)
    const history = useHistory() // useNavigate
    
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: []
    })
    
    const [errors, setErrors] = useState({})
    
    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
    }, [dispatch])

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validation({
                ...input,
                [e.target.name]: e.target.value
            }, recipes)
        )
    }

    const handleSelect = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }   else {
            setInput({
                ...input, 
                diets: input.diets.filter(diet => diet !== e.target.value)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createRecipe(input))
        alert("Recipe added to the recipe book")
        setInput({
            name: "",
            summary: "",
            healthScore: "",
            steps: "",
            image: "",
            diets: []
        })
        history.push("/home")
    }

    return (
        <div className={styles.createPage}>
            <div className={styles.header}>
                <img src={titleImg} alt="title" width="140px" />
                <NavBar />
                <Link to="/home">
                    <button className={styles.backBtn}> Return to Home </button>
                </Link>
            </div> {/* Header */}

            <div className={styles.createCont}>
                <div className={styles.createForm}>
                    <div>
                        <h1 className={styles.createTitle}> Create your recipe </h1>
                    </div>
                    <div className={styles.formCont}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Name*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text"
                                        placeholder="Give your recipe a name"
                                        name="name" // Este debe llamarse igual que el que seteo en el estado, para después poder usarlo en el handleChange
                                        value={input.name}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Summary*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text"
                                        placeholder="A brief description about your recipe"
                                        name="summary"
                                        value={input.summary}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Health Score*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="number"
                                        placeholder="How healthy is it?"
                                        name="healthScore"
                                        min="1"
                                        max="100"
                                        value={input.healthScore}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Steps: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text"
                                        placeholder="Share how to make it"
                                        name="steps"
                                        value={input.steps}
                                        onChange={(e) => handleInputChange(e)}         
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Image: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text" 
                                        id="url"
                                        name="image"
                                        placeholder="Tell us where to find your image ( write an URL )"
                                        value={input.image}
                                        onChange={(e) => handleInputChange(e)}           
                                    />
                                    {/* <span className={styles.imageOpt}> or </span> */}
                                    {/* <input 
                                        className={styles.imageArea}
                                        type="file"
                                        id="file"
                                        name="image" 
                                        accept="image/*" 
                                        value={input.image}
                                        onChange={(e) => handleInputChange(e)} 
                                    /> */}
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Diet type: </label>
                                <div>
                                    {diets.map((diet) => {
                                        return (
                                            <span className={styles.checkboxSpan} key={diet.id}>
                                                <input
                                                    className={styles.inputCheckbox}
                                                    type="checkbox"
                                                    value={diet.id}
                                                    name={diet.name}
                                                    onChange={(e) => handleSelect(e)}
                                                />
                                                <p> {diet.name} </p>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.errorsCont}>
                                <span className={styles.checkboxItems}> * required information </span>
                                { errors.name && <p className={styles.inputError}>{errors.name}</p> }
                                { errors.summary && <p className={styles.inputError}>{errors.summary}</p> }
                                { errors.healthScore && <p className={styles.inputError}>{errors.healthScore}</p> }
                                {/* { errors.image && <p className={styles.inputError}>{errors.image}</p> } */}
                            </div>
                            <div className={styles.btnCont}>
                                <button className={styles.createBtn} type="submit" disabled={!input.name || !input.summary || !input.healthScore}> CREATE </button>
                            </div>
                        </form>
                    </div> {/* Form Container */}
                </div> {/* Create Form */}
            </div> {/* Create Container */}
        </div>
    )
};

export default CreateRecipe;