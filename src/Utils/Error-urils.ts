import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';
import {setAppErrorMessageAC, setAppStatusAC} from "../Redux-Store/App-reducer";
import {SetAppStatusActionType} from "../Redux-Store/App-reducer";
import {SetAppErrorMessageActionType} from "../Redux-Store/App-reducer";


type ErrorUtilsDispatchType = Dispatch<SetAppErrorMessageActionType | SetAppStatusActionType>;


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessageAC(data.messages[0]))
    } else {
        dispatch(setAppErrorMessageAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorMessageAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
