import {todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {
    addTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    updateTaskAC
} from "../Redux-Store/tasks-reducer";
import {AppRootStateType, AppThunk} from "../Redux-Store/store";
import {RequestStatusType, setAppStatusAC} from "../Redux-Store/App-reducer";
import {changeTodolistEntityStatusAC} from "../Redux-Store/todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/Error-urils";

export const getTasksTC = (todolistId: string): AppThunk => async dispatch => {

    dispatch(setAppStatusAC('loading'));

    try {
        const response = await todolistsAPI.getTasks(todolistId);
        if (response.data.error === null) {
            let itemsWithStatus = response.data.items.map(el => ({...el, entityTaskStatus: 'idle' as RequestStatusType}));
            dispatch(setTasksAC(itemsWithStatus, todolistId));
            dispatch(setAppStatusAC('succeeded'));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
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
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'));
                }
            } catch (error) {
                if (error instanceof Error) {
                    handleServerNetworkError(error, dispatch);
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'));
                }
            }
        }

    }


export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {

    dispatch(setAppStatusAC('loading'));
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));

    try {
        const response = await todolistsAPI.deleteTask(todolistId, taskId);
        if (response.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'));
        } else {
            handleServerAppError(response.data, dispatch);
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'));
        }
    }
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => async dispatch => {

    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
    dispatch(setAppStatusAC('loading'));

    try {
        const response = await todolistsAPI.createTask(todolistId, title);
        if (response.data.resultCode === 0) {
            let itemsWithStatus = {...response.data.data.item, entityTaskStatus: 'idle' as RequestStatusType };
            dispatch(addTaskAC(todolistId, itemsWithStatus));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'));
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