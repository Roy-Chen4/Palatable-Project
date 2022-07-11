import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import './RecipePage.css'

function RecipePage() {
    return (
        <div>
            <h1>Digital Dummies WAHAAHA</h1>
            <NavLink to="/" className={"previous-page-button"}>
                <Button>Return</Button>
            </NavLink>
        </div>
    );
}

export default RecipePage;