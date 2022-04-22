import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers} from 'redux';
import thunkMiddleware from "redux-thunk";
import {AuthorizationReducer} from "./Authorization-reducer";
import {AppReducer} from "./App-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasksReducer,
    todolistsReducer,
    AuthorizationReducer,
    AppReducer,
})


/*export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));*/

export const store = configureStore({
    reducer: {
        AuthorizationReducer,
        todolistsReducer,
        AppReducer,
        tasksReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;   // optimazed UseSelector


// @ts-ignore
window.store = store;
