/* eslint-disable no-unused-vars */
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import CommunityCard from '../../components/molecules/CommunityCard/CommunityCard';


function CommunityPage() {

    const [isLoading, setIsLoading] = React.useState(true);
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
    
    setTimeout(function() {
        setIsLoading(false);
    }.bind(this), 2500)
    /* console.log(recipe.recipe.title) */
    /* const newRE = JSON.parse(recipe.recipe)
    console.log(newRE) */
    /* console.log(recipe)
    console.log(recipe.title)
    console.log("hello")  */
    if (isLoading) {
        return(
            <div className="loading-spinner"> 
                <Oval
                    color= "#df7b84"
                    secondaryColor='#ffd4d8'
                >
                </Oval>
            </div>
        )
    } else {
        return(
            <div>
                <Box className="grid-container" sx={{"&&":{ flexGrow: 1, marginTop: "3vh" }}}>
                    <Grid container spacing={1}>
                        {recipe.map((item, index) => (
                            <Grid key={index} item>
                                <CommunityCard
                                    recipe={item}
                                />
                            </Grid>
                        ))}     
                    </Grid>
                </Box>
    
                
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
                </NavLink>
            </div>
        )
    }
}



export default CommunityPage;