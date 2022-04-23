import {TodolistType, UpdateTaskModelType} from '../api/todolists-api';
import {RequestStatusType} from "./App-reducer";
import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskTypeWithStatusEntity} from "../Types/TaskType";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskTypeWithStatusEntity>
}

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, entityTaskStatus: "idle" },
    ]*/
};

const TaskSlice = createSlice({
    name: "TaskSlice",
    initialState: initialState,
    reducers: {
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskTypeWithStatusEntity>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
             state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId);
        },
        addTaskAC(state, action: PayloadAction<{ todolistId: string, task: TaskTypeWithStatusEntity }>) {
            state[action.payload.todolistId] = [action.payload.task, ...state[action.payload.todolistId]];
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateTaskModelType }>) {
            state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t);
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                ...t,
                entityTaskStatus: action.payload.entityStatus
            } : t);
        },
    },
    extraReducers: (builder) => {

        /*TODOLIST AC*/
        builder.addCase(setTodolistsAC, (state, action) => {
            return action.payload.todolists.forEach((tl) => state[tl.id] = []);
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            let copyState = state;
            delete copyState[action.payload.todolistId];
            return copyState;
        });
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolistId] = [];
        });

        // /*TASK ActionCreators*/
        // builder.addCase(setTasksAC, (state, action: PayloadAction<{ tasks: Array<TaskTypeWithStatusEntity>, todolistId: string }>) => {
        //     state[action.payload.todolistId] = action.payload.tasks;
        // });
        // builder.addCase(removeTaskAC, (state, action) => {
        //      state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId);
        // });
        // builder.addCase(addTaskAC, (state, action: PayloadAction<{ todolistId: string, task: TaskTypeWithStatusEntity }>) => {
        //     state[action.payload.todolistId] = [action.payload.task, ...state[action.payload.todolistId]];
        // });
        // builder.addCase(updateTaskAC, (state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateTaskModelType }>) => {
        //     state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t);
        // });
        // builder.addCase(changeTaskEntityStatusAC, (state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) => {
        //     state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, entityTaskStatus: action.payload.entityStatus} : t);
        // });
    },
});


// export const setTasksAC = createAction<{ tasks: Array<TaskTypeWithStatusEntity>, todolistId: string }>("SET_TASKS");
// export const removeTaskAC = createAction<{ taskId: string, todolistId: string }, "REMOVE_TASK">("REMOVE_TASK");
// export const addTaskAC = createAction<{ todolistId: string, task: TaskTypeWithStatusEntity }>("ADD_TASK");
// export const updateTaskAC = createAction<{ taskId: string, todolistId: string, model: UpdateTaskModelType }>("UPDATE_TASK");
// export const changeTaskEntityStatusAC = createAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>("CHANGE_TASK_ENTITY_STATUS");


export const tasksReducer = TaskSlice.reducer;

export const {removeTaskAC, addTaskAC, changeTaskEntityStatusAC, updateTaskAC, setTasksAC} = TaskSlice.actions;