import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppInitialStateType = {
    status: RequestStatusType
    error: null | string
    isFetching: boolean
};

const initialState: AppInitialStateType = {
    status: 'succeeded',
    error: null,
    isFetching: true,
}

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorMessageAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error;
        },
        setIsFetchingAC(state, action: PayloadAction<{ isFetching: boolean }>) {
            state.isFetching = action.payload.isFetching;
        },
    },
});

export const AppReducer = AppSlice.reducer;

export const {setIsFetchingAC, setAppStatusAC, setAppErrorMessageAC} = AppSlice.actions;
