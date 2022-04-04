import {Dispatch} from "redux";
import {todolistsAPI} from "../api/todolists-api";
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../state/todolists-reducer";

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    return todolistsAPI.getTodolists()
        .then(response => {
            dispatch(setTodolistsAC(response.data));
        });
}

export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    return todolistsAPI.updateTodolist(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title));
            }
        });
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.deleteTodolist(todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        });
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    return todolistsAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(title));
            }
        });
}