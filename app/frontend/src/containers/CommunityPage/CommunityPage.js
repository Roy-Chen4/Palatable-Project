/* eslint-disable no-unused-vars */
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import CommunityCard from '../../components/molecules/CommunityCard/CommunityCard';

/** 
* Community page container
*/
function CommunityPage() {

    const [isLoading, setIsLoading] = React.useState(true);
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        axios
        .get("/community/")
        .then((res) => {
            console.log(res.data.data)
            console.log(JSON.parse(res.data.data[0].recipe))
            let allRecipes = [];
            for (let i=0; i<res.data.data.length; i++ ) {
                allRecipes = [...allRecipes, JSON.parse(res.data.data[i].recipe)]
            }
            setRecipe([...allRecipes]);
        })
    },[])
    
    setTimeout(function() {
        setIsLoading(false);
    }.bind(this), 2500)
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