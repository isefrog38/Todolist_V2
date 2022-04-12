import {todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "../Redux-Store/tasks-reducer";
import {AppRootStateType, AppThunk} from "../Redux-Store/store";
import {setAppStatusAC} from "../Redux-Store/App-reducer";

export const getTasksTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistsAPI.getTasks(todolistId);
    dispatch(setTasksAC(response.data.items, todolistId));
    dispatch(setAppStatusAC('succeeded'));
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
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

            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then((response) => {
                    dispatch(updateTaskAC(taskId, todolistId, response.data.data.item));
                    dispatch(setAppStatusAC('succeeded'));
                })
        }
    }


export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistsAPI.deleteTask(todolistId, taskId);
    if (response.data.resultCode === 0) {
        dispatch(removeTaskAC(taskId, todolistId));
        dispatch(setAppStatusAC('succeeded'));
    }
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistsAPI.createTask(todolistId, title);
    if (response.data.resultCode === 0) {
        dispatch(addTaskAC(todolistId, response.data.data.item));
        dispatch(setAppStatusAC('succeeded'));
    }
}