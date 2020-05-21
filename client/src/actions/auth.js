import axios from 'axios'
import { SUCCESS_REGISTER, ERROR_REGISTER, LOAD_USER, ERROR_LOAD_USER, LOGIN_USER, ERROR_LOGIN_USER, LOGOUT, DELETE_USER, ERROR_DELETE_USER } from './types'
import setAuthToken from '../tokenToHeader'
import { clearUnits } from './units' 
import { setAlert } from './alerts'
import { clearTest } from './test'
import { clearStatistics } from './statistics'

export const registerUser = (name, email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }    
    const body = JSON.stringify({
        name,
        email,
        password
    })
    try {
        const res = await axios.post('/api/users', body, config)
        dispatch ({
            type: SUCCESS_REGISTER,
            payload: res.data
        })
        localStorage.setItem('token', res.data.token)
        setAuthToken(localStorage.token)
        dispatch(loadingUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: ERROR_REGISTER
        })
    }
}
export const loadingUser = () => async dispatch => {
    if(localStorage.token) setAuthToken(localStorage.token)
    try {
        const res = await axios.get('/api/auth')
        if(res.data.admin) {
            localStorage.setItem('role', 'true')
        } else localStorage.removeItem('role')
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (err) {        
        dispatch({
            type:ERROR_LOAD_USER
        })
        dispatch(clearTest())
    }
}

export const loginUser = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    try {
        const res = await axios.post('/api/auth', body, config) 
        if(res.data.admin) {
            localStorage.setItem('role', 'true')
        } else localStorage.removeItem('role')
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        })
        localStorage.setItem('token', res.data.token)
        setAuthToken(localStorage.token)
        dispatch(loadingUser())
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: ERROR_LOGIN_USER
        })
    }    
}

export const logout = () => async dispatch => {
    localStorage.removeItem('role')
    dispatch ({
        type: LOGOUT
    })
    dispatch (clearUnits())
    dispatch(clearTest())
    dispatch(clearStatistics())
} 

export const deleteUser = () => async dispatch => {
    if (window.confirm('Are you sure?')) {
        try {
            await axios.delete('/api/users')
            dispatch({
                type: DELETE_USER
            })
            dispatch (clearUnits())
            dispatch(clearTest())
            dispatch(clearStatistics())
        } catch (err) {
            dispatch({
                type: ERROR_DELETE_USER
            })
            setAlert('Server error', 'danger', 3000)
        }
    }
}