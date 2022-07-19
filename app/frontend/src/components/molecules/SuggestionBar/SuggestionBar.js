/* eslint-disable no-unused-vars */
import {
    AppBar, Box, FormControl, InputLabel, MenuItem,
    Select,
    Toolbar
} from "@material-ui/core";
import { Button, ButtonGroup } from "@mui/material";
import PropTypes from 'prop-types';
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import './FilterBar.css';

function SuggestionBar (props) {
    if (props.visible) {
        return (
            <Box sx={{"&&":{ flexGrow: 1 }}}>
                <AppBar position="static" className={"appbar"} color="#ffd4d8">
                    <Toolbar className="toolbar">
                        <ButtonGroup></ButtonGroup>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

SuggestionBar.propTypes = {
    visible: PropTypes.bool,
}


export default SuggestionBar;