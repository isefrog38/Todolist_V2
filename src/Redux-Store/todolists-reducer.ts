import {TodolistType} from '../api/todolists-api';
import {RequestStatusType} from "./App-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type InitialStateTodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};

const initialState: Array<InitialStateTodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0}*/
];

const TodolistSlice = createSlice({
    name: "TodolistSlice",
    initialState: initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            state = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}));
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            state.filter(tl => tl.id !== action.payload.todolistId);
        },
        addTodolistAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            state = [
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    entityStatus: 'idle',
                    filter: 'All',
                    addedDate: '',
                    order: 0
                },
                ...state
            ];
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl);
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl);
        },
    },
});

export const todolistsReducer = TodolistSlice.reducer;

export const {
    changeTodolistFilterAC, setTodolistsAC, addTodolistAC,
    changeTodolistEntityStatusAC, changeTodolistTitleAC, removeTodolistAC
} = TodolistSlice.actions;

