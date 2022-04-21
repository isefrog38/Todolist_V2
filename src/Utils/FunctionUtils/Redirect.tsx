import {ComponentType} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux-Store/store";
import {Navigate} from "react-router-dom";

export function AuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: any) => {

        const isAuth = useSelector<AppRootStateType, boolean>(state => state.AuthorizationReducer.isAuth);
        if (!isAuth) return (<Navigate to={"/login"} />);

        return <Component {...props as T}/>

    }

    return RedirectComponent
}

export function RedirectToApp<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: any) => {

        const isAuth = useSelector<AppRootStateType, boolean>(state => state.AuthorizationReducer.isAuth);
        if (isAuth) return (<Navigate to={"/app"} />);

        return <Component {...props as T}/>

    }

    return RedirectComponent
}