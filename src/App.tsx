import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from './Redux-Store/store';
import {initialStateAuthorizationType} from "./Redux-Store/Authorization-reducer";
import {AuthMeTC} from "./Thunk/Auth-thunk";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {SmallApp} from "./Components/SmallApp/SmallApp";
import {Loading} from "./Utils/Loding/Loading";
import {Routes, Route, Navigate} from "react-router-dom";

export const App = () => {

    const {isFetching} = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthMeTC());
    }, []);

    if (isFetching) return <Loading/>

    return  (
        <>
            <Routes>
                {/* Standard value */}
                <Route path={"/"} element={ <Navigate to={'/app'}/> } />
                <Route path={"*"} element={ <Navigate to={"/404"}/> } />

                <Route path={"/login"} element={ <LoginPage/> } />
                <Route path={"/app"} element={ <SmallApp/> } />
                <Route path={"/404"} element={ <h1>404 Page not found</h1> } />
            </Routes>
        </>
    )
};
