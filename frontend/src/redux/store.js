import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todo/slice'
export default configureStore({
    reducer: {
        task: todoReducer,
    },
})