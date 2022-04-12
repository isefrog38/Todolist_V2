import {todolistsAPI} from "../api/todolists-api";
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../Redux-Store/todolists-reducer";
import {AppThunk} from "../Redux-Store/store";
import {setAppStatusAC} from "../Redux-Store/App-reducer";

export const getTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(response.data));
    dispatch(setAppStatusAC('succeeded'));
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistsAPI.updateTodolist(todolistId, title);
    if (response.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todolistId, title));
        dispatch(setAppStatusAC('succeeded'));
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistsAPI.deleteTodolist(todolistId);
    if (response.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId));
        dispatch(setAppStatusAC('succeeded'));
    }
}

export const createTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistsAPI.createTodolist(title);
    if (response.data.resultCode === 0) {
        dispatch(addTodolistAC(title, response.data.data.item.id));
        dispatch(setAppStatusAC('succeeded'));
    }
}