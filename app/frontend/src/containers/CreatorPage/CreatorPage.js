/* eslint-disable no-unused-vars */
import { AlertTitle, Button, ButtonGroup, Dialog } from '@mui/material';
import * as React from 'react';
import CreatorForm from '../../components/molecules/CreatorForm/CreatorForm';
import "./CreatorPage.css"
import { Alert } from '@mui/material';

function CreatorPage() {
    const [toggle, setToggle] = React.useState(true);
    const [successModalOpen, setSuccessModalOpen] = React.useState(false);

    return (
        <div className="creator-page">
            <ButtonGroup className="nav-buttons">
                <Button 
                    onClick={()=>{setToggle(true)}} 
                    sx={{"&&": toggle ? 
                        {
                            color:"white",
                            backgroundColor: "#df7b84",
                        } : {
                            backgroundColor: "white",
                            color: "#df7b84", 
                        }
                    }}
                >
                    Create Recipe
                </Button>
                <Button 
                    onClick={()=>{setToggle(false)}}
                    sx={{"&&": !toggle ? 
                        {
                            color:"white",
                            backgroundColor: "#df7b84",
                        } : {
                            backgroundColor: "white",
                            color: "#df7b84", 
                        }
                    }}
                >
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
                <CreatorForm 
                    openAlert = {() => {setSuccessModalOpen(true)}}
                    closeAlert = {() => {setSuccessModalOpen(false)}}
                />
            </div>
            <div style={{display: toggle ? "none" : "flex", }}>
                My Recipe: NOt Implemented
            </div>
            <Dialog open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>                
                <Alert severity="success" spacing={2}>
                    <AlertTitle>Recipe Added</AlertTitle>
                </Alert>
            </Dialog>
        </div>
    );
}

  export default CreatorPage;
  