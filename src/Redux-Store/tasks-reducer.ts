import { TasksStateType } from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskType, UpdateTaskModelType} from '../api/todolists-api';

export type TaskActionsType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | SetTodolistsActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    ]*/
};

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        }
        case 'UPDATE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)};
        }
        default:
            return state;
    }
}


export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const );
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const);
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', task} as const );
export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateTaskModelType) => ({type: 'UPDATE-TASK', todolistId, taskId, model} as const );

