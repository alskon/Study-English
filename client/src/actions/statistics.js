import axios from 'axios'
import { setAlert } from './alerts'
import { LOAD_STATISTICS, ERROR_LOAD_STATISTICS, CLEAR_STATISTICS, 
    PUT_RIGHT_ANSWER_STATS,PUT_WRONG_ANSWER_STATS, ERROR_PUT_RIGHT_ANSWER_STATS, ERROR_PUT_WRONG_ANSWER_STATS } from './types'

export const loadStatistics = () => async dispatch => {
    try {
        const res = await axios.get('/api/statistics')        
        dispatch({
            type: LOAD_STATISTICS,
            payload: res.data
        }) 
    } catch (err) {
        dispatch({
            type: ERROR_LOAD_STATISTICS
        })
    }    
}

export const clearStatistics = () => dispatch => {
    dispatch({
        type: CLEAR_STATISTICS
    })
}

export const putRightAnswer = (unitNumber, testChapter, questionId) => async dispatch => {
    try {
        const res = await axios.put(`/api/statistics/right-answer/${unitNumber}/${testChapter}/${questionId}`)
        dispatch({
            type: PUT_RIGHT_ANSWER_STATS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ERROR_PUT_RIGHT_ANSWER_STATS
        })
        dispatch(setAlert('Server error', 'danger', 3000))
    }
}

export const countWrongAnswer = (unitNumber, testChapter, questionId) => async dispatch => {
    try {
        const res = await axios.put(`/api/statistics/wrong-answer/${unitNumber}/${testChapter}/${questionId}`)
        dispatch({
            type: PUT_WRONG_ANSWER_STATS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ERROR_PUT_WRONG_ANSWER_STATS
        })
        dispatch(setAlert('Server error', 'danger', 3000))
    }
}