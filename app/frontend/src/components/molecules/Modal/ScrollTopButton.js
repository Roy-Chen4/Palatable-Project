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
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from "@mui/material/IconButton";

/* function ScrollTopButton() {
    return (
        <Button variant = "contained">hi</Button>
    )
}

export default ScrollTopButton; */

/* function ScrollTopButton() { */

/* export const ScrollTopButton = () => {
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
    }, []);

    return (
        <div>
            <Button
                variant="outlined"
                onClick={scrollToTop}
            >
                HI
            </Button>
        </div>
    );

}; */

const ScrollTopButton = (showBelow) => {

    const handleClick = () => {
        window[`scrollTo`]({top: 0, behavior: `smooth`})
    }

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow (true)
        } else {
            if (show) setShow (false)
        }
    }

    useEffect (() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    const [show, setShow] = useState(showBelow ? false : true)

    return (
        <div>
            <IconButton onClick={handleClick}>
                <ExpandLessIcon/>
            </IconButton>
        </div>
    )

}

export default ScrollTopButton