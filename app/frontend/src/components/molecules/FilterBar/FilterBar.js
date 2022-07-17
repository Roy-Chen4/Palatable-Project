/* eslint-disable no-unused-vars */
import React from "react";
import { 
    AppBar, 
    FormControl, 
    MenuItem, 
    Select, 
    Toolbar,
    Box,
    Checkbox,
    ListItemText,
    InputLabel,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import './FilterBar.css'
import { NavLink, useNavigate } from "react-router-dom";

const mealType = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Drinks',
    'Appetizer',
    'Dessert',
];

const cuisineType = [
    'Pasta',
    'Burger',
    'Pizza',
]

const dietType = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
]

function FilterBar (props) {

    const [mealTypeName, setMealTypeName] = React.useState([]);
    const [cuisineName, setCuisineName] = React.useState([]);
    const [dietName, setDietName] = React.useState([]);
    const [filter, setFilter] = React.useState([]);

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
                                    {mealType.map((name) => (
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