import { LOAD_TEST, ERROR_LOAD_TEST, CLEAR_TEST, DELETE_TEST, 
    ERROR_DELETE_TEST, ADD_TEST, ERROR_ADD_TEST, ADD_QUESTION, 
    ERROR_ADD_QUESTION, DELETE_QUESTION, ERROR_DELETE_QUESTION } from './types'
import axios from 'axios'
import { setAlert } from './alerts'
import { loadUnits } from './units'

export const loadTest = chapter => async dispatch => {

    try {
        const res = await axios.get (`/api/test/${chapter}`)      
        dispatch({
            type: LOAD_TEST,
            payload: res.data
        })
   
    } catch (err) {
        const error = err.response.data.msg
        dispatch({
            type: ERROR_LOAD_TEST,
            payload: error
        })        
    }
} 

export const clearTest = () => dispatch => {
    dispatch({ 
        type: CLEAR_TEST
     })
}

export const deleteTest = chapter => async dispatch => {

    try {
        const res = await axios.delete(`/api/test/${chapter}`)
        dispatch({
            type: DELETE_TEST
        })
        dispatch(setAlert(res.data.msg, 'danger', 2000))
        dispatch(loadUnits())
    } catch (err) {
        dispatch({
            type: ERROR_DELETE_TEST
        })
    }
}

export const createTest = (unitNumber, chapter, header, variation, history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ chapter, header, variation })
    try {
        await axios.post(`/api/test/unit-${unitNumber}`, body, config)
        dispatch({
            type: ADD_TEST
        })
        dispatch(setAlert('Test added', 'success', 2000))
        dispatch(loadUnits())
        history.push('/units')

    } catch (err) {
        const errors = err.response.data.errors
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)))
        dispatch({
            type: ERROR_ADD_TEST
        })
    }
} 

export const addQuestion = (testChapter, question, answer, history) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = {
        question,
        answer
    }
    try {
        await axios.put(`/api/test/${testChapter}/add-question`, body, config)
        dispatch({
            type: ADD_QUESTION
        })
        dispatch(loadTest(testChapter))
        dispatch(setAlert('Question added', 'success', 1500))
        history.push(`/test/${testChapter}`)
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 2000)))
        dispatch({
            type: ERROR_ADD_QUESTION
        })
    }
}

export const deleteQuestion = (idQuestion, testChapter) => async dispatch => {
    try {
        await axios.delete(`/api/test/delete-question/${testChapter}/${idQuestion}`)
        dispatch({
            type: DELETE_QUESTION
        })
        dispatch (loadTest(testChapter))
        dispatch(setAlert('Question deleted', 'danger', 1500))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 2000)))
        dispatch({
            type: ERROR_DELETE_QUESTION
        })
    }
}