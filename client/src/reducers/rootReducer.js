import { combineReducers } from 'redux'
import auth from './auth'
import alerts from './alerts'
import units from './units'
import test from './test'
import statistics from './statistics'

export const rootReducer = combineReducers({
    alerts,
    auth,
    units,
    test,
    statistics
})