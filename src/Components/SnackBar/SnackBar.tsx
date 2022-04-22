import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux-Store/store";
import {AppInitialStateType, setAppErrorMessageAC} from "../../Redux-Store/App-reducer";

type TypeErrorSnackbars = 'error' | 'warning';

type SnackbarsType = {
  typeError:  TypeErrorSnackbars
};

export const Snackbars = ({typeError}: SnackbarsType) => {

    const { error } = useSelector<AppRootStateType, AppInitialStateType>(state => state.AppReducer);
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorMessageAC({error: null}));
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
            <Alert onClose={handleClose} severity={typeError} sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    );
};




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});