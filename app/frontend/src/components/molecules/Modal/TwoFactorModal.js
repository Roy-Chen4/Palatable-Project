import * as React from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    DialogContentText,
    TextField,
    createTheme
} 
from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';


// what happens when they click close? does it not register [Adam]?
export default function TwoFactorModal(props) {
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

    <Dialog open={props.open} onClose={() => props.onClose()} fullWidth='true' maxWidth='md'>
        <div className="confirmation_ui">
        <DialogTitle>
            <p1 className='conf_heading'>
                Account Confirmation
            </p1>
        </DialogTitle>
        <DialogContent>
        <DialogContentText>
            Please enter the five letter code that was emailed to you.
        </DialogContentText>
        <TextField
            margin="normal"
            placeholder='AAAAA'
            sx={{width:"70%"}}
        />
        </DialogContent>
        </div>
        <DialogActions>
            <Button 
            onClick={() => props.onClose()}
            variant="contained"
            theme={secondaryTheme}
            > 
            Close 
                </Button>
            <Button 
            onClick={() => props.onClose()}
            variant="contained"
            theme={primaryTheme}
            sx={{color:"white"}}
            > 
            Submit 
                </Button>
        </DialogActions>
    </Dialog> 
}


TwoFactorModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}