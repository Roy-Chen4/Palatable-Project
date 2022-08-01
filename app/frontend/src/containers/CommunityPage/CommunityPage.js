/* eslint-disable no-unused-vars */
import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function CommunityPage() {

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        axios
        .get("/community/")
        .then((res) => {
            // console.log("hi")
            console.log(res.data.data)
            // console.log(res.data.data.length)
            // console.log(res.data.data[0].recipe)
            console.log(JSON.parse(res.data.data[0].recipe))
            // const hello = JSON.parse((JSON.parse(JSON.stringify(res.data.data))))
            let allRecipes = [];
            for (let i=0; i<res.data.data.length; i++ ) {
                allRecipes = [...allRecipes, JSON.parse(res.data.data[i].recipe)]
                // console.log(allRecipes)
            }
            setRecipe([...allRecipes]);
            // setRecipe(hello)
            /* setRecipe(...res.data.data) */
            /* const new_recipe = JSON.parse([...res.data.data])
            console.log("hi")
            console.log(new_recipe) */
        })
        /* .catch((err) => {
            console.log(err.request);
    }); */
    },[])


    /* const v = JSON.parse(JSON.parse(a)) */
    
    console.log(recipe)
    /* console.log(recipe.recipe.title) */
    /* const newRE = JSON.parse(recipe.recipe)
    console.log(newRE) */
    /* console.log(recipe)
    console.log(recipe.title)
    console.log("hello")  */

    return(
        <div>
            {/* <h1>{recipe.instructions}</h1> */}
            {/* <Grid>

            </Grid> */}
            {/* <h1>{recipe.title}</h1> */}
            
            <NavLink to="/" className={"previous-page-button"}>
                <Button 
                variant="contained"
                sx={{"&&":{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    minWidth: "100%",
                    backgroundColor: "#df7b84", 
                    fontWeight: "700",
                    ":hover": {
                    backgroundColor: "white",
                    color: "#df7b84",
                    }
                }}}
                >
                    Return
                </Button>
                {/* <CommunityCard/> */}
            </NavLink>
        </div>
    )
}



export default CommunityPage;