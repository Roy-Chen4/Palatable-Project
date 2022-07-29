/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import { Oval } from 'react-loader-spinner';

function CommunityPage() {

    return(
        <div>
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



export default CommunityPage;