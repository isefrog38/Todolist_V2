import { TodolistType } from '../api/todolists-api';
import {RequestStatusType} from "./App-reducer";

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};
export type TodolistsActionsType =
    | SetTodolistsActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0}*/
];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{ id: action.todolistId, title: action.title, entityStatus: 'idle', filter: 'All', addedDate: '', order: 0}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'CHANGE_TODOLIST_ENTITY_STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state;
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const );
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const );
export const addTodolistAC = (title: string, todolistId: string) => ({type: 'ADD-TODOLIST', title: title, todolistId} as const );
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const );
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const );
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({type: 'CHANGE_TODOLIST_ENTITY_STATUS', id, entityStatus} as const );
