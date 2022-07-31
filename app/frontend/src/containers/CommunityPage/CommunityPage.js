/* eslint-disable no-unused-vars */
import { Button, Grid, Box, CardHeader } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import { Oval } from 'react-loader-spinner';
import CommunityCard from './CommunityCard';
import { useState, useEffect } from "react";
import axios from 'axios';
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    CardActions, 
    IconButton, 
    Dialog,
} from '@mui/material';

function CommunityPage() {

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        axios
        .get("/community/")
        .then((res) => {
            setRecipe([...res.data.data])
        })
        .catch((err) => {
            console.log(err.request);
    });
    }, [])

    console.log(recipe)
    console.log(recipe.title)
    console.log("hello")

    function card() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        Hello
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return(
        <div>
            {/* <h1>{recipe.instructions}</h1> */}
            
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