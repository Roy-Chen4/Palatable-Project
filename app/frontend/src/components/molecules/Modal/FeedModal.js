/* eslint-disable no-unused-vars */
import React from "react";
import { 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContentText,
    makeStyles,
    Typography,
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { dietChange } from "../../../reducers/isLogged";
import PropTypes from 'prop-types';
import './Modal.css';
import ScrollTopButton from "./ScrollTopButton";
import { useEffect, useState, useRef } from 'react';
import IconButton from "@mui/material/IconButton";
import { Grid, Card, CardContent } from '@material-ui/core';

export default function FeedModal(props) {

    const getIngredientCard = (jsonResultsId) => {
        const {id, first_name} = jsonResults[`${jsonResultsId}`];
        return (
            <Grid item xs={4} sm={4} key={jsonResultsId}>
                <Card>
                    <CardContent>
                        <Typography>{`${id}. ${first_name}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    const [jsonResults, setJsonResults] = useState([]);

    const [ingredientName, setIngredientName] = useState([]);

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/players")
        .then((response) => response.json())
        .then((json) => setJsonResults(json.data))
        }, [])
        console.log(jsonResults);


    return (
        <div>
        <Dialog open={props.open} onClose={() => props.onClose()} fullScreen='true' maxWidth='md' >
            <Grid container spacing={2}>
                {/* {getIngredientCard()} */}
                {Object.keys(ingredientName).map((jsonResultsId) => 
                    getIngredientCard(jsonResultsId)
                )}
            </Grid>
            <Button 
                onClick={() => props.onClose()}
                variant="contained"
                theme={props.secondaryTheme}
            > 
                Close 
            </Button>
            <ScrollTopButton/>
        </Dialog>
        </div>
    )







}

FeedModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
    secondaryTheme: PropTypes.func,
}