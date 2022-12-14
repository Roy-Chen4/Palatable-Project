/* eslint-disable no-unused-vars */
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    ButtonGroup,
    Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent,
    DialogTitle, Divider, IconButton, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from "react";
import './Modal.css';

/** 
* @summary Handles the format and depiction of user contributed recipes to be displayed in
* the community card
* @param props
* @return Structure for the community card to display on the community page
*/
export default function CommunityModal(props) {

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
                                image={props.image ? props.image : ''}
                            />
                        </Card>
                    </div>
                    <CardContent className="recipe-card-contents">
                        <Divider className="top-divider"></Divider>
                        <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="div" 
                            className="instruction-title"
                            sx={{ '&&': {
                                display:props.tags ? "block": "none"
                            }
                        }}
                        >
                            Meal Type
                        </Typography>
                        <Divider className="bottom-divider"></Divider>
                        <ButtonGroup sx={{marginTop: "1vh"}}>
                            <Button
                                variant="outlined"
                                disabled
                                size="small"
                                sx={{ '&&': {
                                        color:"white",
                                        backgroundColor: "rgb(57 126 194)",
                                        marginBottom: "1vh",
                                        display:props.tags ? "inline": "none"
                                    }
                                }}
                            >
                                {props.tags ? props.tags:''}
                            </Button>
                            <Button
                                variant="outlined"
                                disabled
                                size="small"
                                sx={{ '&&': {
                                        color:"white",
                                        backgroundColor: "rgb(198 18 71)",
                                        marginBottom: "1vh",
                                        display:props.genre !== 'none' ? "inline": "none"
                                    }
                                }}
                            >
                                {props.genre ? props.genre:''}
                            </Button>
                        </ButtonGroup>
                        <Divider className="top-divider"></Divider>
                        <Typography gutterBottom variant="h5" component="div">
                            Ingredients
                        </Typography>
                        <Divider className="bottom-divider"></Divider>
                        <div className={`${"align-left"} ${"ingredient-list"}`}>
                            {props.ingredients.map((item, index) => (
                                <div key={index}>
                                    &#8226;{" " + item}
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
                                {props.instructions.map((item, index) => (
                                    <div key={index}>
                                        {index+1 + ". "+item}
                                    </div>
                                ))}
                            </div>
                        </Typography>
                        <Divider className="top-divider"></Divider>
                        
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

CommunityModal.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.any,
    tags: PropTypes.any,
    genre: PropTypes.any,
    id: PropTypes.any,
    image: PropTypes.any,
    ingredients: PropTypes.any,
    instructions: PropTypes.any,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
    showInstructions: PropTypes.bool,
}