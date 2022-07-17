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

const givenTags = [
    'Vegatarian',
    'Vegan',
    'Pescatarian',
    'GF',
    'etc',
];

function FilterBar (props) {

    const [tagName, setTagName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTagName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    if (props.visible) {
        return (
            <Box sx={{"&&":{ flexGrow: 1 }}}>
                <AppBar position="static" className={"appbar"} color="#ffd4d8">
                    <Toolbar className="toolbar">
                        <div className="select-contents">
                            <div className="filter-text">Filters:&nbsp;</div>
                            <FormControl variant="filled" className="dropdown" size="small">
                            <InputLabel>
                                Tags
                            </InputLabel>
                                <Select
                                    id="user-diet"
                                    label="diet"
                                    multiple
                                    value={tagName}
                                    onChange={handleChange}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {givenTags.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={tagName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="button-contents">
                            <Button 
                                // onClick={() => {
                                // }}
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