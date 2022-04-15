import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from './Redux-Store/store';
import {initialStateAuthorizationType} from "./Redux-Store/Authorization-reducer";
import {AuthMeTC} from "./Thunk/Auth-thunk";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {SmallApp} from "./Components/AppIsAuth/SmallApp";
import {Loading} from "./Utils/Loding/Loading";

export const App = () => {

    const {isAuth, isFetching} = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthMeTC());
    }, []);

    return  (
        <>
            {isFetching && <Loading />}
            {
                !isAuth
                    ? <LoginPage />
                    : <SmallApp />
            }
        </>
    )
};
