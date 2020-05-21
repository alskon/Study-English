import { LOAD_UNITS, ERROR_LOAD_UNITS, CLEAR_UNITS, ADD_UNIT, ERROR_ADD_UNIT, DELETE_UNIT, ERROR_DELETE_UNIT } from './types'
import axios from 'axios'
import { setAlert } from './alerts'
import{ clearTest } from './test'
import { loadingUser } from './auth'

export const loadUnits = history => async dispatch => {
    try {
        const res = await axios.get('/api/unit')
        dispatch({
            type: LOAD_UNITS,
            payload: res.data
        })
        dispatch (clearTest())
    } catch (err) {
        dispatch({
            type: ERROR_LOAD_UNITS
        })   
        dispatch(loadingUser())
        history.push('/login')
    }
}

export const addUnit = (number, header, history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ number, header })
    try {
        await axios.post('/api/unit/add-unit', body, config)
        dispatch({
            type: ADD_UNIT
        })
        dispatch(setAlert('Unit added', 'success', 3000))
        dispatch(loadUnits())
        history.push('/units')
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)))
        dispatch({
            type: ERROR_ADD_UNIT
        })
    }
}

export const clearUnits = () => dispatch => {
    dispatch({
        type: CLEAR_UNITS
    })
}

export const deleteUnit = unitNumber => async dispatch => {
    if (window.confirm('Are you sure?')) 
    try {
        await axios.delete(`/api/unit/${unitNumber}`)
        dispatch({
            type: DELETE_UNIT
        })
        dispatch(loadUnits())
        dispatch(setAlert('Unit deleted', 'danger', 4000))
        try {
            window.scroll({
                top:'0',
                left:'0',
                behavior:'smooth'
            })
        } catch (err) {
            window.scrollTo(0, 0)
        }
    } catch (err) {
        dispatch({
            type: ERROR_DELETE_UNIT
        })
    }
}