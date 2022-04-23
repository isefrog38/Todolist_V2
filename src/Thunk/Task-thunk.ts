import {todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {
    addTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    updateTaskAC
} from "../Redux-Store/tasks-reducer";
import {AppRootStateType} from "../Redux-Store/store";
import {RequestStatusType, setAppStatusAC} from "../Redux-Store/App-reducer";
import {changeTodolistEntityStatusAC} from "../Redux-Store/todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/Error-urils";
import {Dispatch} from "redux";

export const getTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.getTasks(todolistId);
        if (response.data.error === null) {
            let tasks = response.data.items.map(el => ({...el, entityTaskStatus: 'idle' as RequestStatusType}));
            dispatch(setTasksAC({tasks, todolistId}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

// export const updateTaskTC = createAsyncThunk<
//     unknown,
//     {todolistId: string, taskId: string, domainModel: UpdateTaskModelType},
//     { dispatch: Dispatch, state: AppRootStateType , getState: () => AppRootStateType}
//     >(
//     'upadate/Task',
//     async ({todolistId, taskId, domainModel}, {dispatch, getState}) => {
//
//         dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}));
//         dispatch(setAppStatusAC({status: 'loading'}));
//
//         const allTasksFromState = getState().tasksReducer;
//         const tasksForCurrentTodolist = allTasksFromState[todolistId]
//         const task = tasksForCurrentTodolist.find(t => t.id === taskId);
//
//         if (task) {
//             const apiModel = {
//                 title: task.title,
//                 startDate: task.startDate,
//                 priority: task.priority,
//                 description: task.description,
//                 deadline: task.deadline,
//                 status: task.status,
//                 ...domainModel
//             };
//
//             try {
//                 const response = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
//                 if (response.data.resultCode === 0) {
//                     dispatch(updateTaskAC({taskId, todolistId, model: response.data.data.item}));
//                     dispatch(setAppStatusAC({status: 'succeeded'}));
//                     dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'succeeded'}));
//                 } else {
//                     handleServerAppError(response.data, dispatch);
//                     dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
//                 }
//             } catch (error) {
//                 if (error instanceof Error) {
//                     handleServerNetworkError(error, dispatch);
//                     dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
//                 }
//             }
//         }
//
//     }
// );

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {

        dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}));
        dispatch(setAppStatusAC({status: 'loading'}));

        const allTasksFromState = getState().tasksReducer;
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
                    dispatch(updateTaskAC({taskId, todolistId, model: response.data.data.item}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                    dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'succeeded'}));
                } else {
                    handleServerAppError(response.data, dispatch);
                    dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
                }
            } catch (error) {
                if (error instanceof Error) {
                    handleServerNetworkError(error, dispatch);
                    dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
                }
            }
        }

    }


export const removeTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}));

    try {
        const response = await todolistsAPI.deleteTask(todolistId, taskId);
        if (response.data.resultCode === 0) {
            dispatch(removeTaskAC({taskId, todolistId}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'succeeded'}));
        } else {
            handleServerAppError(response.data, dispatch);
            dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
        }
    }
}

export const createTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {

    dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}));
    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.createTask(todolistId, title);
        if (response.data.resultCode === 0) {
            let task = {...response.data.data.item, entityTaskStatus: 'idle' as RequestStatusType};
            dispatch(addTaskAC({todolistId, task}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'succeeded'}));
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