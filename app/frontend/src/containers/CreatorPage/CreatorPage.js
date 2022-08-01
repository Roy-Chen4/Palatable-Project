/* eslint-disable no-unused-vars */
import { AlertTitle, Box, Button, ButtonGroup, Dialog, Grid } from '@mui/material';
import * as React from 'react';
import CreatorForm from '../../components/molecules/CreatorForm/CreatorForm';
import { Alert } from '@mui/material';
import axios from 'axios';
import "./CreatorPage.css"
import UserCard from '../../components/molecules/UserCard/UserCard';

function CreatorPage() {
    const [toggle, setToggle] = React.useState(true);
    const [successModalOpen, setSuccessModalOpen] = React.useState(false);
    const [userRecipe, setUserRecipe] = React.useState([])

    React.useEffect(() => {
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
            setUserRecipe([...allRecipes]);
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
            <div>
                <Box className="grid-container" sx={{"&&":{ flexGrow: 1, marginTop: "3vh" }}}>
                    <Grid container spacing={1}>
                        {userRecipe.map((item, index) => (
                            <Grid key={index} item>
                                <UserCard
                                    recipe={item}
                                />
                            </Grid>
                        ))}     
                    </Grid>
                </Box>
            </div>
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
  