/* eslint-disable no-unused-vars */
import { Button } from '@mui/material';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {

    const [isLoading, setIsLoading] = React.useState(true);

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
    }
    else {
        return (
            <div>
                <h1>Digital Dummies WAHAAHA</h1>
                <NavLink to="/" className={"previous-page-button"}>
                    <Button>Return</Button>
                </NavLink>
            </div>
        );
    }
}

export default RecipePage;