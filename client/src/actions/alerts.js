import { SET_ALERT, DELETE_ALERT } from './types'

export const setAlert = (msg, styleAlert, timeout = 5000) => dispatch => {
    const idAlert = Math.floor(Math.random()*100000000000)
    dispatch({
        type: SET_ALERT,
        payload: {
            id: idAlert,
            msg,
            styleAlert
        }        
    })
    setTimeout(() => {
        dispatch({
            type:DELETE_ALERT,
            payload: idAlert
        })
    }, timeout)
}