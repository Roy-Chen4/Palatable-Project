import React from "react";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

const EditFieldButton = (props) => {
    const {
        onClick
    } = props;
    return (
        <Button 
            onClick={onClick}
            variant="outlined"
            sx={{
                "&&":{
                    color:"#df7b84",
                    // fontWeight: "",
                    width:"8%"
                }
            }}
        > 
            <EditIcon />
        </Button> 
    )
}

EditFieldButton.propTypes = {
    onClick: PropTypes.func,
}

export default EditFieldButton;