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
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { dietChange } from "../../../reducers/isLogged";
import PropTypes from 'prop-types';
import './Modal.css';

export default function DietModal(props) {
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const userDiet = useSelector((state) => state.user.value.diet);
    
    const [newUserDiet, setNewDiet] = React.useState(userDiet);

    const handleChange = (event) => {
        setNewDiet(event.target.value);
    };

    const onDietSubmit = () => {
        setIsSubmitting(true);
        setTimeout(function() { 
            setIsSubmitting(false);
            dispatch(dietChange({newUserDiet}))
            props.onClose();
        }.bind(this), 1000)
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()} fullWidth='true' maxWidth='md'>
            <div className="modal-body">
                <DialogTitle>
                    <p1 className='conf_heading'>
                        My Dietary Requirements
                    </p1>
                </DialogTitle>
                <p2 className='user-diet-text'>
                    Current Diet: &nbsp;
                </p2>
                <p2>
                    {userDiet === '' ? ' None' : userDiet}
                </p2>
                <DialogContent>
                    <FormControl fullWidth>
                        <Select
                            id="user-diet"
                            value={newUserDiet}
                            label="diet"
                            onChange={handleChange}
                            sx={{width:"100%"}}
                        >
                            <MenuItem value={"vegetarian"}>Vegetarian</MenuItem>
                            <MenuItem value={"vegan"}>Vegan</MenuItem>
                            <MenuItem value={"pescatarian"}>Pescatarian</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => props.onClose()}
                        variant="contained"
                        theme={props.secondaryTheme}
                    > 
                        Close 
                    </Button>
                    <Button 
                        onClick={() => onDietSubmit()}
                        variant="contained"
                        disabled={isSubmitting}
                        theme={props.primaryTheme}
                        sx={{color:"white"}}
                    > 
                        Save
                    </Button> 
                </DialogActions>
            </div>
        </Dialog>
    )

}

DietModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
    secondaryTheme: PropTypes.func,
}