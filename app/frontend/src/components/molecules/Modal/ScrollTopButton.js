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
import { useEffect, useState } from 'react';

/* function ScrollTopButton() {
    return (
        <Button variant = "contained">hi</Button>
    )
}

export default ScrollTopButton; */

/* export const ScrollTopButton = () => { */
function ScrollTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if(window.pageYOffset > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [])

    return (
        <div /* className="fixedButton" */>
            <Button
                variant="outlined"
                onClick={scrollToTop}
            >
                HI
            </Button>
        </div>
    )

}

export default ScrollTopButton;