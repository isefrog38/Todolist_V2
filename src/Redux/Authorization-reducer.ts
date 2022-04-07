let SET_USER_DATA = "SET_USER_DATA";

export type AuthActionType = SetUserDataAC;
export type initialStateAuthorizationType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
};
export type DataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};
type SetUserDataAC = ReturnType<typeof setAuthUserDataAC>;
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
        default:
            return state
    }
}

export const setAuthUserDataAC = (payload: DataType) => {
    return {type: SET_USER_DATA, payload} as const
}