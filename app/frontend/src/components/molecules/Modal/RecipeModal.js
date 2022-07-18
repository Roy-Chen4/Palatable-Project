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
    CardActions,
    IconButton,
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import './Modal.css';

export default function RecipeModal(props) {

    let instructions = props.recipe.instructions
    if (instructions.contains("<li>")) {
        instructions = instructions.replace(/['"]+/g, '')
    } else {
        //split into list
        instructions
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()} fullWidth='true' maxWidth="lg" overflow='scroll'>
            
            <DialogTitle>
                <Typography className="card-title" variant="h3" component="div">
                    {props.recipe.title}
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
                                image={props.recipe.image}
                            />
                        </Card>
                    </div>
                    <CardContent className="recipe-card-contents">
                        <Typography gutterBottom variant="h5" component="div">
                            Ingredients
                        </Typography>
                        <div className="instructions">
                            {props.recipe.extendedIngredients.map((item, index) => (
                                <div key={index}>
                                    &#8226;{" " + item.name}
                                </div>
                            ))}  
                        </div> 
                        <Typography gutterBottom variant="h5" component="div" className="instruction-title">
                            Instructions
                        </Typography>
                        <Typography gutterBottom variant="p1" component="div">
                            {instructions}
                        </Typography>
                    </CardContent>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => props.onClose()}
                    variant="contained"
                    theme={props.primaryTheme}
                    sx={{ "&&": {
                        backgroundColor: "white",
                        ":hover": {
                            backgroundColor: "#df7b84",
                            color: "white", 
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
    recipe: PropTypes.any,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
}