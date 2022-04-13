import {todolistsAPI} from "../api/todolists-api";
import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../Redux-Store/todolists-reducer";
import {AppThunk} from "../Redux-Store/store";
import {setAppStatusAC} from "../Redux-Store/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/Error-urils";
import {removeTaskAC} from "../Redux-Store/tasks-reducer";

export const getTodolistsTC = (): AppThunk => async dispatch => {

    dispatch(setAppStatusAC('loading'));

    try {
        const response = await todolistsAPI.getTodolists();
        if (response.status === 200) {
            dispatch(setTodolistsAC(response.data));
            dispatch(setAppStatusAC('succeeded'));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => async dispatch => {

    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC( todolistId, 'loading' ));

    try {
        const response = await todolistsAPI.updateTodolist(todolistId, title);
        if (response.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todolistId, title));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeTodolistEntityStatusAC( todolistId, 'succeeded' ));
        } else {
            handleServerAppError(response.data, dispatch);
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'));
        }
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {

    dispatch(changeTodolistEntityStatusAC( todolistId, 'loading' ));
    dispatch(setAppStatusAC('loading'));

    try {
        const response = await todolistsAPI.deleteTodolist(todolistId);
        if (response.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeTodolistEntityStatusAC( todolistId, 'succeeded' ));
        } else {
            handleServerAppError(response.data, dispatch);
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'));
        }
    }
}

export const createTodolistTC = (title: string): AppThunk => async dispatch => {

    dispatch(setAppStatusAC('loading'));

    try {
        const response = await todolistsAPI.createTodolist(title);
        if (response.data.resultCode === 0) {
            dispatch(addTodolistAC(title, response.data.data.item.id));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}