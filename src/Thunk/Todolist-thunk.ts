import {todolistsAPI} from "../api/todolists-api";
import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../Redux-Store/todolists-reducer";
import {setAppStatusAC} from "../Redux-Store/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/Error-urils";
import {Dispatch} from "redux";

export const getTodolistsTC = () => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.getTodolists();
        if (response.status === 200) {
            dispatch(setTodolistsAC({todolists: response.data}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

export const updateTodolistTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'} ));

    try {
        const response = await todolistsAPI.updateTodolist(todolistId, title);
        if (response.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC({todolistId, title}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'succeeded'} ));
        } else {
            handleServerAppError(response.data, dispatch);
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'failed'}));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'failed'}));
        }
    }
}

export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch) => {

    dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'} ));
    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.deleteTodolist(todolistId);
        if (response.data.resultCode === 0) {
            dispatch(removeTodolistAC({todolistId}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'succeeded'} ));
        } else {
            handleServerAppError(response.data, dispatch);
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'failed'}));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'failed'}));
        }
    }
}

export const createTodolistTC = (title: string) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.createTodolist(title);
        if (response.data.resultCode === 0) {
            dispatch(addTodolistAC({title, todolistId: response.data.data.item.id}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}