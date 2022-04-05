import {Dispatch} from "redux";
import {todolistsAPI} from "../api/todolists-api";
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../state/todolists-reducer";
import {AppGlobalActionsType, AppThunk} from "../state/store";

export const getTodolistsTC = (): AppThunk => (dispatch) => {
    return todolistsAPI.getTodolists()
        .then(response => {
            dispatch(setTodolistsAC(response.data));
        });
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    return todolistsAPI.updateTodolist(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title));
            }
        });
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    return todolistsAPI.deleteTodolist(todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        });
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    return todolistsAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(title));
            }
        });
}