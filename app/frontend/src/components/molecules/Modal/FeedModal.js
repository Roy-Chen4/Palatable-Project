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
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { dietChange } from "../../../reducers/isLogged";
import PropTypes from 'prop-types';
import './Modal.css';
import ScrollTopButton from "./ScrollTopButton";

export default function FeedModal(props) {
    return (
        <Dialog open={props.open} onClose={() => props.onClose()} fullScreen='true' maxWidth='md'>
            <DialogContentText sx={{fontSize:'1000px'}}>Hello</DialogContentText>
            <Button 
                        onClick={() => props.onClose()}
                        variant="contained"
                        theme={props.secondaryTheme}
                    > 
                        Close 
            </Button>
            <ScrollTopButton/>
        </Dialog>





    )







}

FeedModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
    secondaryTheme: PropTypes.func,
}