/* eslint-disable no-unused-vars */
import {
    AppBar, Box, FormControl, InputLabel, MenuItem,
    Select,
    Toolbar
} from "@material-ui/core";
import { Button } from "@mui/material";
import PropTypes from 'prop-types';
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './FilterBar.css';

const dietType =[  
    'Vegetarian',
    'Vegan',
    'Pescatarian',
];


const cuisineType = [
    'Pasta',
    'Burger',
    'Pizza',
];


const getMealType = () => {
    var today = new Date();
    var time = Number(today.getHours());
    console.log(time);
    if (time >= 6 && time < 11) {
        return [
            'Breakfast',
            'Lunch',
            'Dinner',
            'Dessert',
            'Snacks',
            'Drinks',
        ];
    } else if (time >= 11 && time < 15) {
        return [
            'Lunch',
            'Dinner',
            'Dessert',
            'Snacks',
            'Drinks',
            'Breakfast',
        ];
    } else if (time >= 17 && time < 22) {
        return [
            'Dinner',
            'Dessert',
            'Snacks',
            'Drinks',
            'Breakfast',
            'Lunch',
        ];
    } else {
        return [
            'Dessert',
            'Snacks',
            'Drinks',
            'Breakfast',
            'Lunch',
            'Dinner',
        ];
    }
}



function FilterBar (props) {

    const [mealTypeName, setMealTypeName] = React.useState([]);
    const [cuisineName, setCuisineName] = React.useState([]);
    const [dietName, setDietName] = React.useState([]);

    const handleMealChange = (event) => {
        const {
            target: { value },
        } = event;
        setMealTypeName(
            [value.toString().toLowerCase()]
        );
    };
    const handleCuisinChange = (event) => {
        const {
            target: { value },
        } = event;
        setCuisineName(
            [value.toString().toLowerCase()]
        );
    };
    const handleDietChange = (event) => {
        const {
            target: { value },
        } = event;
        setDietName(
            [value.toString().toLowerCase()]
        );
    };

    function getFilter () {
        return [...mealTypeName, ...cuisineName, ...dietName];
    }

    let navigate = useNavigate();

    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

    if (props.visible) {
        return (
            <Box sx={{"&&":{ flexGrow: 1 }}}>
                <AppBar position="static" className={"appbar"} color="#ffd4d8">
                    <Toolbar className="toolbar">
                        <div className="select-contents">
                            <div className="filter-text">Filters:&nbsp;</div>
                            <FormControl variant="filled" className="dropdown" size="small">
                                <InputLabel>
                                    Meal
                                </InputLabel>
                                <Select
                                    id="user-meal"
                                    label="meal"
                                    value={mealTypeName}
                                    onChange={handleMealChange}
                                    renderValue={(selected) => selected}
                                >
                                    {getMealType().map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className="dropdown" size="small">
                                <InputLabel>
                                    Cuisine
                                </InputLabel>
                                <Select
                                    id="user-cuisine"
                                    label="cuisine"
                                    value={cuisineName}
                                    onChange={handleCuisinChange}
                                    // renderValue={(selected) => selected.join(', ')}
                                >
                                    {cuisineType.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" className="dropdown" size="small">
                                <InputLabel>
                                    Diet
                                </InputLabel>
                                <Select
                                    id="user-diet"
                                    label="diet"
                                    value={dietName}
                                    onChange={handleDietChange}
                                    // renderValue={(selected) => selected.join(', ')}
                                >
                                    {dietType.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="button-contents">
                        <NavLink 
                        to={{
                            pathname: "/recipes",
                        }}
                        state= {{
                            feed: true,
                            filter: getFilter(),
                        }}
                        onClick={()=> changeLocation('/recipes')}
                        className={"filter-button" }
                        >
                            <Button 
                                onClick={() => getFilter()}
                                variant="contained"
                                sx={{ "&&": {
                                    backgroundColor: "white",
                                    color: "#df7b84", 
                                    ":hover": {
                                        backgroundColor: "#df7b84",
                                        color: "white", 
                                    }
                                }}}
                            > 
                                Apply 
                            </Button>
                        </NavLink>
                            
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

FilterBar.propTypes = {
    visible: PropTypes.bool,
}


export default FilterBar;