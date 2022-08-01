/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
/* import * as React from 'react'; */
import {
    Button, Card, CardActions, CardContent,
    CardMedia, createTheme, Dialog, DialogActions, DialogTitle
} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import React, { useState } from "react";
import CommunityModal from '../Modal/CommunityModal';
import './UserCard.css';
import EditRecipeModal from '../Modal/EditRecipeModal';


export default function UserCard(props) {

    const [recipeOpen, setRecipeOpen] = useState(false);
    const [instructions, setInstructions] = React.useState([])
    const [ingredients, setIngredients] = React.useState([])
    const [confirmationModal, setConfirmationModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

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
        setTimeout(function() { 
            setIsSubmitting(false);
            location.reload();
        }.bind(this), 2000)
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
                recipe={props.recipe}
                title={props.recipe.title}
                type={"redux"}
                id={props.recipe.id}
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
}
