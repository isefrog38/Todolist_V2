import {TaskActionsType, tasksReducer} from './tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {AuthActionType, AuthorizationReducer} from "./Authorization-reducer";
import {AppActionsType, AppReducer} from "./App-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    AuthorizationReducer,
    AppReducer,
})


// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppGlobalActionsType = TaskActionsType | TodolistsActionsType | AuthActionType | AppActionsType;


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppGlobalActionsType> ;


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
