/* eslint-disable no-unused-vars */
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent,
    DialogTitle, Divider, IconButton, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from "react";
import './Modal.css';

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
                        <Typography gutterBottom variant="h5" component="div" className="instruction-title">
                            Meal Type
                        </Typography>
                        <Divider className="bot-divider"></Divider>
                        <Typography>
                            <div className='tag-format'>
                                {props.tags}
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

CommunityModal.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.any,
    tags: PropTypes.any,
    id: PropTypes.any,
    image: PropTypes.any,
    ingredients: PropTypes.any,
    instructions: PropTypes.any,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
    showInstructions: PropTypes.bool,
}