import {todolistsAPI} from "../api/todolists-api";
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../Redux/todolists-reducer";
import {AppThunk} from "../Redux/store";

export const getTodolistsTC = (): AppThunk => async dispatch => {
    const response = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(response.data));
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    const response = await todolistsAPI.updateTodolist(todolistId, title);
    if (response.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    const response = await todolistsAPI.deleteTodolist(todolistId);
    if (response.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId));
    }
}

export const createTodolistTC = (title: string): AppThunk => async dispatch => {
    const response = await todolistsAPI.createTodolist(title);
    if (response.data.resultCode === 0) {
        dispatch(addTodolistAC(title, response.data.data.item.id));
    }
}