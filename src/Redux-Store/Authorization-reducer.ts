const SET_USER_DATA = "SET_USER_DATA",
    SET_FETCHING = "SET_FETCHING";

export type AuthActionType = ReturnType<typeof setIsFetchingAC> | ReturnType<typeof setAuthUserDataAC>;
type DataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};
export type initialStateAuthorizationType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
};
let initialStateAuthorization: initialStateAuthorizationType = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
};

export const AuthorizationReducer = (state = initialStateAuthorization, action: AuthActionType): initialStateAuthorizationType => {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                ...action.payload
            }
            case SET_FETCHING :
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const setAuthUserDataAC = (payload: DataType) => {
    return {type: SET_USER_DATA, payload} as const
}
export const setIsFetchingAC = (isFetching: boolean) => {
    return {type: SET_FETCHING, isFetching} as const
}