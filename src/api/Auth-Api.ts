import {AuthRequestType, ResponseGetAuthType} from "../Types/AythTypes";
import axios, {AxiosResponse} from "axios";
import {ResponseType} from "../Types/TodolistTypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '46d03c13-5122-4b12-95a1-e807d8a6bece'
    }
});

export const AuthAPI = {
    AuthUser () {
        return instance.get<ResponseGetAuthType>(`auth/me`)
            .then(response => response.data);
    },

    LogOut () {
        return instance.delete<ResponseType>(`auth/login/`)
            .then(response => response.data);
    },

    Login (email: string, password: string, rememberMe: boolean, captcha: boolean) {
        return instance.post<AuthRequestType, AxiosResponse<ResponseType<{ userId: number }>>>(`auth/login/`, {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
}