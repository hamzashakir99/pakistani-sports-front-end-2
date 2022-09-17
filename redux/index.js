import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import progressSlice from './progress.slice'
import userSlice from './user.slice'

const rootReducer = combineReducers({
    progress: progressSlice.reducer,
    user: userSlice.reducer,
    // any other reducers here
})

export const store = configureStore({
    reducer: rootReducer
})