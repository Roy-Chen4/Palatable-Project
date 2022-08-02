/* eslint-disable no-unused-vars */
import { Alert, AlertTitle, Box, Button, ButtonGroup, Dialog, Grid } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useSelector } from 'react-redux';
import CreatorForm from '../../components/molecules/CreatorForm/CreatorForm';
import UserCard from '../../components/molecules/UserCard/UserCard';
import "./CreatorPage.css";

function CreatorPage() {
    const [toggle, setToggle] = React.useState(true);
    const [successModalOpen, setSuccessModalOpen] = React.useState(false);
    const [userRecipe, setUserRecipe] = React.useState([])

    const userEmail = useSelector((state) => state.user.value.email);
    React.useEffect(() => {
        const valuesToSend = {
            email: userEmail,
        }
        axios
        .post("/getuserrecipes/", valuesToSend)
        .then((res) => {
            console.log(res.data)
            // console.log(JSON.parse(res.data.data[0].recipe))
            let allRecipes = [];
            for (let i=0; i<res.data.length; i++ ) {
                allRecipes = [...allRecipes, {id: res.data[i].id, recipe: JSON.parse(JSON.parse(res.data[i].recipe))}]
            }
            setUserRecipe([...allRecipes]);
            console.log(allRecipes)
        })
        .catch((err) => {
            console.log(err.request);
        }); 
    },[])
    const remove = (item) => {
        console.log(item);
        let filteredArr = userRecipe.filter((el) => el.id !== item.id);
        setUserRecipe(filteredArr);
    };

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
                                    id = {item.id}
                                    recipe={item.recipe}
                                    remove={() => {remove(item)}}
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
  