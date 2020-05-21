import { LOAD_TEST, ERROR_LOAD_TEST, CLEAR_TEST, DELETE_TEST, ERROR_DELETE_TEST, ADD_TEST, 
    ERROR_ADD_TEST, ADD_QUESTION, ERROR_ADD_QUESTION, DELETE_QUESTION, ERROR_DELETE_QUESTION } from '../actions/types'

const initialState = {
    test: '',
    allUnitTests:[],
    loading: true,
    errMessage:''
}

export default (state=initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LOAD_TEST:
            return {
                ...state,
                test: payload.test,
                allUnitTests:payload.arrayTestChapters,
                loading: false
            }
        case ADD_QUESTION:
        case DELETE_QUESTION:
        case ERROR_DELETE_QUESTION:
        case ERROR_ADD_QUESTION:
        case DELETE_TEST: 
        case ERROR_DELETE_TEST:
        case ADD_TEST:
        case ERROR_ADD_TEST:
            return {
                ...state,
                loading: false
            }
        case ERROR_LOAD_TEST:      
            return {
                ...state,
                test: '',
                errMessage: payload,
                loading: false
            }
        
        case CLEAR_TEST: {
            return {
                ...state,
                test: '',
                errMessage: ''
            }
        }
        default: 
            return state
    }
}

