import { LOAD_UNITS, ERROR_LOAD_UNITS, CLEAR_UNITS, ADD_UNIT, ERROR_ADD_UNIT, DELETE_UNIT, ERROR_DELETE_UNIT } from '../actions/types'

const initialState = {
    units: [],
    loading: true
}

export default (state=initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case ADD_UNIT:
        case DELETE_UNIT:
        case ERROR_ADD_UNIT: 
        case ERROR_DELETE_UNIT:
            return {
                ...state,
                loading: false
            }
        case LOAD_UNITS: 
            return {
                ...state,
                units: payload,
                loading: false
            }
            
        case ERROR_LOAD_UNITS:
        case CLEAR_UNITS:
            return {                
                ...state,
                units: [],
            }
        default: 
            return state
    }
    
}