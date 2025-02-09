import { TLoading } from "./loading.type"

export interface IAuthState {
    user: {
        id?: number,
        name: string,
        surname: string,
        email: string,
        password: string,
        phone: number
    } | null
    accessToken: string | null,
    loading: TLoading,
    error: string | null
}

export type TRegister = {
    name: string,
    surname: string,
    email: string,
    password: string,
    phone: number
}

export type TLogin = {
    email: string,
    password: string,
}