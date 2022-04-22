import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataUserAuthType} from "../Types/AythTypes";
import {AuthMeTC} from "../Thunk/Auth-thunk";

export type initialStateAuthorizationType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};
let initialState: initialStateAuthorizationType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setAuthUserDataAC, (state, {payload}: PayloadAction<DataUserAuthType>) => {
            return payload
        });
    },
});

export const AuthorizationReducer = AuthSlice.reducer;

export const setAuthUserDataAC = createAction<DataUserAuthType>('AUTH_ME');