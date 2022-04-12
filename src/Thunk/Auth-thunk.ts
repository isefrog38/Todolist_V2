import {AppThunk} from "../Redux-Store/store";
import {setAuthUserDataAC} from "../Redux-Store/Authorization-reducer";
import {AuthAPI} from "../api/todolists-api";

export const AuthMeTC = (): AppThunk => async dispatch => {
    const response = await AuthAPI.AuthUser()
    if (response.resultCode === 0) {
        let {login, email, id} = response.data
        dispatch(setAuthUserDataAC({id, email, login, isAuth: true}))
    }
}

export const LogOutTC = (): AppThunk => async dispatch => {
    const response = await AuthAPI.LogOut()
    if (response.resultCode === 0) {
        dispatch(setAuthUserDataAC({id: null, email: null, login: null, isAuth: false}))
    }
}

export const LoginTC = (values: {email: string, password: string, rememberMe: boolean, captcha: boolean}): AppThunk => async dispatch => {
    const response = await AuthAPI.Login(values.email, values.password, values.rememberMe,values.captcha);
    const responseAuthMe = await AuthAPI.AuthUser();
    if (response.resultCode === 0) {
    console.log(response)
        let {login, email, id} = responseAuthMe.data;
        dispatch(setAuthUserDataAC({id, email, login, isAuth: true}))
    }
}