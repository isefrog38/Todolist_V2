import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from './Redux-Store/store';
import {initialStateAuthorizationType} from "./Redux-Store/Authorization-reducer";
import {AuthMeTC} from "./Thunk/Auth-thunk";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {SmallApp} from "./Components/AppIsAuth/SmallApp";

const App = () => {

    const { isAuth } = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthMeTC());
    }, []);

    if (!isAuth) return <LoginPage/>;

    return (
        <SmallApp />
    );
};

export default App;
