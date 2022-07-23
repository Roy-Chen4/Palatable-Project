/* eslint-disable no-unused-vars */
import React from "react";
import { 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    Button,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Divider,
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './Modal.css';

export default function RecipeModal(props) {

    // console.log(props.recipe)
    // console.log(props.showInstructions)
    // if (props.showInstructions === true) {
    //     var instructions = props.recipe.instructions
    //         .replace(/<[^>]+>/g, '')
    //         .split(".")
    //         .filter(function(e){return e}); 
    //     var ingredients = props.recipe.extendedIngredients;
    // } else {
    //     instructions = []
    //     ingredients = [...props.recipe.missedIngredients, ...props.recipe.usedIngredients, ...props.recipe.unusedIngredients]
    // }
    const [instructions, setInstructions] = React.useState(props.instructions)

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+props.id+'/information',
        headers: {
            'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    function retrieveInstructions() {
        axios.request(options).then(function (response) {
            console.log(response.data);
            return setInstructions(response.data.instructions
                .replace(/<[^>]+>/g, '')
                .split(".")
                .filter(function(e){return e}));
        }).catch(function (error) {
            console.error(error);
            return []
        });
    }

    if (props.instructions.length === 0) {
        console.log("retrieved instructions")
        React.useEffect(() => {
            retrieveInstructions();
        }, []);
    }


    return (
        <Dialog open={props.open} onClose={() => props.onClose()} fullWidth='true' maxWidth="lg" overflow='scroll'>
            
            <DialogTitle>
                <Typography className="card-title" variant="h3" component="div">
                    {props.title}
                </Typography>

            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => props.onClose()}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent className="recipe-dialog-content">
                    <div className="modal-body">
                        <Card classname="recipe-container" sx={{ width: "100%" }}>
                            <CardMedia
                                component="img"
                                width="70vw"
                                image={props.image}
                            />
                        </Card>
                    </div>
                    <CardContent className="recipe-card-contents">
                        <Divider className="top-divider"></Divider>
                        <Typography gutterBottom variant="h5" component="div">
                            Ingredients
                        </Typography>
                        <Divider className="bottom-divider"></Divider>
                        <div className={`${"align-left"} ${"ingredient-list"}`}>
                            {props.ingredients.map((item, index) => (
                                <div key={index}>
                                    &#8226;{" " + item.name}
                                </div>
                            ))}  
                        </div> 
                        <Divider className="top-divider"></Divider>
                        <Typography gutterBottom variant="h5" component="div" className="instruction-title">
                            Instructions
                        </Typography>
                        <Divider className="bot-divider"></Divider>
                        <Typography gutterBottom variant="p1" component="div" className="instruction-list">
                            <div className="align-left">
                                {instructions.map((item, index) => (
                                    <div key={index}>
                                        {index+1 + ". "+item}
                                    </div>
                                ))}
                            </div>
                        </Typography>
                    </CardContent>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => props.onClose()}
                    variant="contained"
                    theme={props.primaryTheme}
                    sx={{ "&&": {
                        backgroundColor: "#df7b84",
                        color: "white", 
                        ":hover": {
                            backgroundColor: "white",
                            color: "#df7b84", 
                        }
                    }}}
                > 
                    Close 
                </Button>
            </DialogActions>
        </Dialog>
    )

}

RecipeModal.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.any,
    id: PropTypes.any,
    image: PropTypes.any,
    ingredients: PropTypes.any,
    instructions: PropTypes.any,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
    showInstructions: PropTypes.bool,
}