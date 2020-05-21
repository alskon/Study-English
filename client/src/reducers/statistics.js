import { LOAD_STATISTICS, ERROR_LOAD_STATISTICS, CLEAR_STATISTICS, 
    PUT_RIGHT_ANSWER_STATS,PUT_WRONG_ANSWER_STATS, ERROR_PUT_RIGHT_ANSWER_STATS, ERROR_PUT_WRONG_ANSWER_STATS } from '../actions/types'

const initialState = {
    units: [],
    loading: true
}

export default (state=initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case LOAD_STATISTICS: 
            return {
                ...state,
                units: payload.units,
                loading: false
            } 
        case ERROR_LOAD_STATISTICS: 
        case ERROR_PUT_RIGHT_ANSWER_STATS:
        case ERROR_PUT_WRONG_ANSWER_STATS:
        case CLEAR_STATISTICS:
            return {
                ...state,
                units: [],
                loading: false
            }
            case PUT_RIGHT_ANSWER_STATS: 
            case PUT_WRONG_ANSWER_STATS:
                return {
                    ...state,
                    units: payload.units,
                    loading: true
                }
        default:
            return state
    }
}

 