
export type ResponseTypeAuth = {
    resultCode: number
    messages: Array<string>,
    data: {
        userId: number
    }
}

export type ResponseGetAuthType = {
    resultCode: number
    messages: string[]
    data: {
        id: number
        email: string
        login: string
    }
}

export type AuthRequestType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

export type DataUserAuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};