import { SUCCESS_REGISTER, ERROR_REGISTER, LOAD_USER, ERROR_LOAD_USER, LOGOUT, LOGIN_USER, ERROR_LOGIN_USER, DELETE_USER, ERROR_DELETE_USER } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    admin: localStorage.getItem('role'),
    user: null,
    loading: true
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case SUCCESS_REGISTER:
        case LOGIN_USER:            
            return {
                ...state,
                ...payload,
                admin: payload.admin,
                isAuthenticated: true,
                loading: false,
            }
        case ERROR_REGISTER: 
        case ERROR_LOAD_USER:
        case ERROR_LOGIN_USER:
        case DELETE_USER:
        case ERROR_DELETE_USER:
        case LOGOUT:
            localStorage.clear()
            return {
                ...state,
                admin: false,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                admin: payload.admin,
                user: payload
            }
        default:
            return state
    }
}