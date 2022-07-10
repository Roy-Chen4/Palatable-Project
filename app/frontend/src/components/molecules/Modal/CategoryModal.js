/* eslint-disable no-unused-vars */
import React from "react";
import { 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    Button,
    Tabs,
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import './Modal.css';
import { createTheme} from '@mui/material/styles';
import { add } from "../../../reducers/userIngredients";
import { setIn } from "formik";

export default function CategoryModal(props) {
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const onDietSubmit = () => {
        dispatch(add({ingredients: ingredientList}));
        setIsSubmitting(true);
        setTimeout(function() { 
            wipeColors();
            props.onClose();
            setIsSubmitting(false);
        }.bind(this), 1000)
    }

    
    // Primary colour theme for buttons
    const primaryTheme = createTheme({
        palette: {
            primary: {
                main: '#df7b84',
            },
        },
    });
    
    // Secondary colour theme for buttons
    const secondaryTheme = createTheme({
        palette: {
            primary: {
                main: '#E8E8E8',
            },
        },
    });

    const unselected = '#ffffff';
    const selected = '#ffe8e8';
    const preselected = '#c2c2c2';
    const userAddedIngredients = useSelector((state) => state.ingredients.ingredients);
    const [buttonColor, setButtonColor] = React.useState({});
    const [ingredientList, setIngredientList] = React.useState([]);

    function handleClick(i, ingredient) {
        const newColor = buttonColor[i] === selected ? unselected : selected;
        const newState ={...buttonColor,[i]:newColor}
        setButtonColor(newState);
        if (buttonColor[i] !== selected) {
            if (!(ingredientList.some(i => i === ingredient)) || userAddedIngredients.length === 0) {
                setIngredientList([...ingredientList, ingredient]);
            }
        } else {
            setIngredientList(ingredientList.filter(i => i !== ingredient));
        }
    }

    function wipeColors() {
        setButtonColor(false);
    }


    function setInitialColor(i, item) {
        if (userAddedIngredients.some(a => a === item)) {
            return preselected;
        } else {
            return buttonColor[i];
        }
    }

    return (
        <Dialog open={props.open} onClose={() => props.onClose()} fullWidth='true' maxWidth='md'>
            <div className="modal-body">
                <DialogTitle>
                    <p1 className='category-heading' style={{textTransform: 'uppercase'}}>
                        {props.category}
                    </p1>
                </DialogTitle>
                <DialogContent>
                    <Tabs
                        orientation={"vertical"}
                        variant="scrollable"
                    >
                        {props.list.map((item, i) => (
                            <Button
                                style={{ 
                                    backgroundColor: setInitialColor(i, item.name), 
                                    height:"50px",
                                    fontSize: "1rem",
                                    color: "#df7b84",
                                    fontWeight: "700",
                                }}
                                disabled={
                                    setInitialColor(i, item.name)===preselected ? true : false
                                }
                                key={i}
                                index={i}
                                onClick={() => handleClick(i, item.name)}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Tabs>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => {
                            wipeColors();
                            setIngredientList(userAddedIngredients);
                            props.onClose();
                        }}
                        variant="contained"
                        theme={secondaryTheme}
                    > 
                        Close 
                    </Button>
                    <Button 
                        onClick={() => onDietSubmit()}
                        variant="contained"
                        disabled={isSubmitting}
                        theme={primaryTheme}
                        sx={{color:"white"}}
                    > 
                        Add
                    </Button> 
                </DialogActions>
            </div>
        </Dialog>
    )

}

CategoryModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    category: PropTypes.string,
    list: PropTypes.any,
    // ingredientList: PropTypes.any,
    // setIngredientList: PropTypes.func,
}