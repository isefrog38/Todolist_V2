import { Dispatch } from 'redux';
import { ResponseType } from '../Types/TodolistTypes';
import {setAppErrorMessageAC, setAppStatusAC} from "../Redux-Store/App-reducer";


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessageAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorMessageAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorMessageAC({error: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
