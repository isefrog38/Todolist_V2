import {todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "../Redux-Store/tasks-reducer";
import {AppRootStateType, AppThunk} from "../Redux-Store/store";
import {setAppStatusAC} from "../Redux-Store/App-reducer";
import {changeTodolistEntityStatusAC} from "../Redux-Store/todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/Error-urils";

export const getTasksTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));

    /*const response = await todolistsAPI.getTasks(todolistId);
    dispatch(setTasksAC(response.data.items, todolistId));
    dispatch(setAppStatusAC('succeeded'));*/
    try {
        const response = await todolistsAPI.getTasks(todolistId);
        if (response.data.error === null) {
            dispatch(setTasksAC(response.data.items, todolistId));
            dispatch(setAppStatusAC('succeeded'));
        } /*else {
            handleServerAppError(response.data, dispatch);
        }*/
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'));

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId);

        if (task) {
            const apiModel = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            };

            try {
                const response = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, todolistId, response.data.data.item));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
            } catch (error) {
                if (error instanceof Error) {
                    handleServerNetworkError(error, dispatch);
                }
            }
            /* const response = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
             dispatch(updateTaskAC(taskId, todolistId, response.data.data.item));
             dispatch(setAppStatusAC('succeeded'));*/
        }

    }


export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));

    try {
        const response = await todolistsAPI.deleteTask(todolistId, taskId);
        if (response.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId));
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

export const createTaskTC = (todolistId: string, title: string): AppThunk => async dispatch => {

    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
    dispatch(setAppStatusAC('loading'));

    try {
        const response = await todolistsAPI.createTask(todolistId, title);
        if (response.data.resultCode === 0) {
            dispatch(addTaskAC(todolistId, response.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'));
        } else {
            handleServerAppError(response.data, dispatch);
            /*if (response.data.messages.length) {
                dispatch(setAppErrorMessageAC(response.data.messages[0]))
            } else {
                dispatch(setAppErrorMessageAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))*/
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}