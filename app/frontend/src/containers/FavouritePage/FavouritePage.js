/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink, useLocation } from 'react-router-dom';
import RecipeCard from '../../components/molecules/RecipeCard/RecipeCard';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import FilterBar from '../../components/molecules/FilterBar/FilterBar';
import ScrollTopButton from '../../components/molecules/modal/ScrollTopButton';

function FavouritePage() {

    /* const MyComponent = (props) => {
        return ({props.title})
    } */

    /* const rname = useSelector((state) => state.favourited)
    console.log(rname.favourited) */

    /* const rname = useSelector(state => state.props.recipe.title) */

    const rname = useSelector(state => state.favourited)
    console.log(rname)
    
    return(
        <div>
            <h1>
                {/* {rname.favourited} */}
               {/*  {rname} */}
               hi
               {rname}
            </h1>   
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
                        Return</Button>
                    </NavLink>
        </div>
    )
}

export default FavouritePage;