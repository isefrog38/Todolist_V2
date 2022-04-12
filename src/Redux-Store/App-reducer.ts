export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type SetAppErrorMessageActionType = ReturnType <typeof setAppErrorMessageAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type AppActionsType =
    | SetAppErrorMessageActionType
    | SetAppStatusActionType;
export type AppInitialStateType = {
    status: RequestStatusType
    error: null | string
};

const APP_SET_STATUS = "APP_SET_STATUS",
      SET_APP_ERROR = "SET_APP_ERROR";

const initialState: AppInitialStateType = {
    status: 'succeeded',
    error: null,
}

export const AppReducer = (state = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case SET_APP_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status} as const );
export const setAppErrorMessageAC = (error: string | null) => ({type: SET_APP_ERROR, error} as const );
