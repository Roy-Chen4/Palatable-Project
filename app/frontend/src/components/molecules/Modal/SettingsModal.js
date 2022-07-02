import * as React from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    TextField,
    createTheme
} 
from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function SettingsModal(props) {


    const ptheme = createTheme({
        palette: {
            primary: {
                main: '#df7b84',
            },
        },
      });
    
    const btheme = createTheme({
        palette: {
            primary: {
                main: '#E8E8E8',
            },
        },
    });

    return (
        <Dialog open={props.open} fullWidth='true' maxWidth='md'>
            <div className="confirmation_ui">
                <DialogTitle>
                    <p1 className='conf_heading'>
                        User Settings
                    </p1>
                </DialogTitle>
                <DialogContent>
                    <TextField
                    margin="normal"
                    placeholder='Email'
                    sx={{width:"70%"}}
                    />
                    <TextField
                    margin="normal"
                    placeholder='Password'
                    sx={{width:"70%"}}
                    />
                </DialogContent>
            </div>
            <DialogActions>
                <Button 
                    onClick={props.onClose}
                    variant="contained"
                    theme={btheme}
                > 
                    Close 
                </Button>
                <Button 
                    onClick={props.onClose}
                    variant="contained"
                    theme={ptheme}
                    sx={{color:"white"}}
                > 
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

SettingsModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}