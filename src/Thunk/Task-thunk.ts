import {Dispatch} from "redux";
import {todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from "../state/tasks-reducer";
import {AppRootStateType} from "../state/store";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId));
        });
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
                })
        }
    }


export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.deleteTask(todolistId, taskId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
            }
        });
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    return todolistsAPI.createTask(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, response.data.data.item));
            }
        });
}