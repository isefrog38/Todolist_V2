import {setAuthUserDataAC} from "../Redux-Store/Authorization-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/Error-urils";
import {Dispatch} from "redux";
import {setIsFetchingAC} from "../Redux-Store/App-reducer";
import {AuthAPI} from "../api/Auth-Api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "../Redux-Store/store";

export const AuthMeTC = createAsyncThunk<
    // Return type of the payload creator
    unknown,
    undefined,
    {
        dispatch: Dispatch
        state: AppRootStateType
    }
    >(
    'Auth/meTC',
    async(_,{dispatch}) => {
        dispatch(setIsFetchingAC({isFetching: true}));

        try {
            const response = await AuthAPI.AuthUser()
            if (response.resultCode === 0) {
                let {login, email, id} = response.data
                const payload = {id, email, login, isAuth: true}
                dispatch(setAuthUserDataAC(payload))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleServerNetworkError(error, dispatch);
            }
        } finally {
            dispatch(setIsFetchingAC({isFetching: false}));
        }
    }
)

/*export const AuthMeTC = () => async (dispatch: Dispatch) => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await AuthAPI.AuthUser()
        if (response.resultCode === 0) {
            let {login, email, id} = response.data
            dispatch(setAuthUserDataAC({id, email, login, isAuth: true}))
        }
    }
    catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
    finally {
        dispatch(setIsFetchingAC({isFetching: false}));
    }
}*/

export const LogOutTC = () => async (dispatch: Dispatch) => {
    const response = await AuthAPI.LogOut()
    if (response.resultCode === 0) {
        dispatch(setAuthUserDataAC({id: null, email: null, login: null, isAuth: false}))
    }
}

export const LoginTC = (values: {email: string, password: string, rememberMe: boolean, captcha: boolean}) => async (dispatch: Dispatch) => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await AuthAPI.Login(values.email, values.password, values.rememberMe,values.captcha);
        const responseAuthMe = await AuthAPI.AuthUser();
        if (response.resultCode === 0) {
            let {login, email, id} = responseAuthMe.data;
            dispatch(setAuthUserDataAC({id, email, login, isAuth: true}))
        }
        else {
            handleServerAppError(response, dispatch);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
    finally {
        dispatch(setIsFetchingAC({isFetching: false}));
    }
}