import {createContext} from 'react'

const f = () => {}

export const AuthContext = createContext({
    token: null,
    login: f,
    logout: f,
    userId: null,
    ready: false
})