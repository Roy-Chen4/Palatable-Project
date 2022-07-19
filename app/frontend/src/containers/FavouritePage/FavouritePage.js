/* eslint-disable no-unused-vars */
import { Button, Grid, Box } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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