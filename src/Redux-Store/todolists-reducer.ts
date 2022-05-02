import {RequestStatusType} from "./App-reducer";
import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../Types/TodolistTypes";

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
        // removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
        //     state.filter(tl => tl.id !== action.payload.todolistId);
        // },
        // addTodolistAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
        //     state = [
        //         {
        //             id: action.payload.todolistId,
        //             title: action.payload.title,
        //             entityStatus: 'idle',
        //             filter: 'All',
        //             addedDate: '',
        //             order: 0
        //         },
        //         ...state
        //     ];
        // },
        // changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
        //     state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
        // },
        // changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
        //     state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl);
        // },
        // changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
        //     state.map(tl => tl.id === action.payload.todolistId ? {
        //         ...tl,
        //         entityStatus: action.payload.entityStatus
        //     } : tl);
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return state = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}));
        });
        builder.addCase(removeTodolistAC, (state, action: PayloadAction<{ todolistId: string }>) => {
            return state.filter(tl => tl.id !== action.payload.todolistId);
        });
        builder.addCase(addTodolistAC, (state, action: PayloadAction<{ title: string, todolistId: string }>) => {
            return state = [
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
        });
        builder.addCase(changeTodolistTitleAC, (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
        });
        builder.addCase(changeTodolistFilterAC, (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl);
        });
        builder.addCase(changeTodolistEntityStatusAC, (state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) => {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl);
        });
    },
});

export const todolistsReducer = TodolistSlice.reducer;

export const setTodolistsAC = createAction<{ todolists: Array<TodolistType> }>('SET_TODOLISTS');
export const removeTodolistAC = createAction<{ todolistId: string }>('REMOVE_TODOLIST');
export const addTodolistAC = createAction<{ title: string, todolistId: string }>('ADD_TODOLIST');
export const changeTodolistTitleAC = createAction<{ todolistId: string, title: string }>('CHANGE_TODOLIST_TITLE');
export const changeTodolistFilterAC = createAction<{ todolistId: string, filter: FilterValuesType }>('CHANGE_TODOLIST_FILTER');
export const changeTodolistEntityStatusAC = createAction<{ todolistId: string, entityStatus: RequestStatusType }>('CHANGE_TODOLIST_ENTITY_STATUS');