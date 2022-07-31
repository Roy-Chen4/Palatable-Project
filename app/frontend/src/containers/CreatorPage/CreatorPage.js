/* eslint-disable no-unused-vars */
import { Button, ButtonGroup } from '@mui/material';
import * as React from 'react';
import CreatorForm from '../../components/molecules/CreatorForm/CreatorForm';
import "./CreatorPage.css"

function CreatorPage() {
    const [toggle, setToggle] = React.useState(true);

    return (
        <div className="creator-page">
            <ButtonGroup className="nav-buttons">
                <Button onClick={()=>{setToggle(true)}}>
                    Create Recipe
                </Button>
                <Button onClick={()=>{setToggle(false)}}>
                    My Recipes
                </Button>
            </ButtonGroup>
            <div 
                style={{display: toggle ? "block" : "none",}} 
                className="create-recipes"
            >
                <div className="help-text">
                    Enter Your Recipe Details Below
                </div>
                <CreatorForm />
            </div>
            <div style={{display: toggle ? "none" : "flex",}}>
                My Recipe: NOt Implemented
            </div>
        </div>
    );
}

  export default CreatorPage;
  