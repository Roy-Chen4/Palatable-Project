/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
/* import * as React from 'react'; */
import {
    Button, Card, CardActions, CardContent,
    CardMedia, createTheme, Dialog, DialogActions, DialogTitle
} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import axios from 'axios';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import CommunityModal from '../Modal/CommunityModal';
import EditRecipeModal from '../Modal/EditRecipeModal';
import './UserCard.css';


export default function UserCard(props) {

    const [recipeOpen, setRecipeOpen] = useState(false);
    const [instructions, setInstructions] = React.useState([])
    const [ingredients, setIngredients] = React.useState([])
    const [confirmationModal, setConfirmationModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const userEmail = useSelector((state) => state.user.value.email);

    const primaryTheme = createTheme({
        palette: {
            primary: {
                main: '#df7b84',
            },
        },
    });

    function deleteRecipe () {
        setIsSubmitting(true)
        console.log("delete-recipe")
        const valuesToSend = {
            recipeid: props.id,
            email: userEmail,
        }
        axios
        .post("/deleterecipe/", valuesToSend)
        .then((res) => {
            console.log(res.data)
            // console.log(JSON.parse(res.data.data[0].recipe))
        }) .then (() => {
            setTimeout(function() { 
                setIsSubmitting(false);
                setConfirmationModal(false);
                props.remove()
            }.bind(this), 2000)
        })
        .catch((err) => {
            console.log(err.request);
            setIsSubmitting(false);
        }); 
    }


    React.useEffect(()=> {
            setInstructions(props.recipe.instructions
                .replace(/<[^>]+>/g, '')
                .split(",")
                .filter(function(e){return e}));
            setIngredients(props.recipe.ingredients
                .replace(/<[^>]+>/g, '')
                .split(",")
                .filter(function(e){return e}));
    }, [])


    return (
        <div className="recipe-cards">
            <Card classname="recipe-container" variant="outlined" sx={{ width: "48vw" }} >
                <CardHeader
                    title={props.recipe.title}
                    sx={{textAlign: "center", }}
                />
                <CardContent>
                <CardMedia
                    component="img"
                    width="48vw"
                    image={props.recipe.image ? props.recipe.image : ''}
                />
                </CardContent>
                <CardActions className = "explore-button">
                    <Button size="small" variant="outlined" onClick={()=>{setRecipeOpen(true)}} >Explore</Button>
                </CardActions>
                <Button size="small" variant="outlined" onClick={()=>{setConfirmationModal(true)}} sx={{margin: "10px"}}>Delete</Button>
                <Button size="small" variant="outlined" onClick={()=>{setEditModal(true)}} sx={{margin: "10px"}}>Edit</Button>
            </Card>
            <CommunityModal 
                open={recipeOpen}
                tags={props.recipe.tags}
                title={props.recipe.title}
                type={"redux"}
                id={props.id}
                image={props.recipe.image}
                ingredients={ingredients}
                instructions={instructions}
                onClose={() => setRecipeOpen(false)} 
                primaryTheme={primaryTheme} 
            />

            
            <Dialog 
                className="dialog-container" 
                open={editModal} 
                onClose={() => setEditModal(false)}
                fullWidth='true' 
                maxWidth='md'
            >
                <EditRecipeModal 
                    id = {props.id}
                    recipe={props.recipe}
                    onClose={() => setEditModal(false)}
                />  
            </Dialog>
            <Dialog 
                className="dialog-container" 
                open={confirmationModal} 
                onClose={() => setConfirmationModal(false)} 
                fullWidth='true' 
                maxWidth='md'
            >
                <DialogTitle>
                    <p1 className='category-heading'>
                        Are you sure you want to delete{": "+ props.recipe.title +"?"}
                    </p1>
                </DialogTitle>
                <DialogActions className="dialog-buttons" sx={{'&&':{justifyContent:"center"}}}>
                    <Button 
                        onClick={() => {
                            deleteRecipe();
                        }}
                        variant="contained"
                        sx={{ "&&": {
                            backgroundColor: "white",
                            color: "#df7b84",
                            ":hover": {
                                backgroundColor: "#df7b84",
                                color: "white", 
                            }
                        }}}
                        disabled={isSubmitting}
                    > 
                        Yes 
                    </Button>
                    <Button 
                        onClick={() => setConfirmationModal(false)}
                        variant="contained"
                        sx={{"&&":{
                            color:"white",
                            backgroundColor: "#df7b84",
                            ":hover": {
                                backgroundColor: "white",
                                color: "#df7b84", 
                            }
                        }}}
                    > 
                        No
                    </Button> 
                </DialogActions>
            </Dialog>
        </div>
    )

}

UserCard.propTypes = {
    key: PropTypes.number,
    recipe: PropTypes.any,
    id: PropTypes.any,
    remove: PropTypes.any,
}
