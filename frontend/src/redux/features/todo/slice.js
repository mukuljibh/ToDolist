import { createSlice } from '@reduxjs/toolkit'
export const todo = createSlice({
    name: 'todo',
    initialState: {
        tasks: [],
    },
    reducers: {
        stateSavingCenter: (state, action) => {
            state.tasks = [...action.payload]
        },
        addTaskCenter: (state, action) => {
            //recieved task object from app
            state.tasks = [...state.tasks, action.payload];
        },
        editTaskCenter: (state, action) => {
            const { updatedTaskObj, index } = action.payload.payload;
            // Create a copy of the tasks array (for avoided unexpected behaviour)
            const updatedTasks = [...state.tasks];
            // Update the task at the specified index with the updatedTaskObj
            updatedTasks[index] = updatedTaskObj;
            // Return a new state object with the updated tasks array
            return {
                ...state,
                tasks: updatedTasks,
            };
        },
        deleteTaskCenter: (state, action) => {
            const index = action.payload;
            const updatedTasks = [...state.tasks];
            updatedTasks.splice(index, 1);
            return {
                ...state,
                tasks: updatedTasks,
            };

        },
        CompleteTaskCenter: (state, action) => {
            const { updatedTaskObj, index } = action.payload.payload;
            // Create a copy of the tasks array (for avoided unexpected behaviour)
            const updatedTasks = [...state.tasks];
            // Update the task at the specified index with the updatedTaskObj
            updatedTasks[index] = updatedTaskObj;
            // Return a new state object with the updated tasks array
            return {
                ...state,
                tasks: updatedTasks,
            };
        },
    },
})
export const { addTaskCenter, editTaskCenter, deleteTaskCenter, stateSavingCenter, CompleteTaskCenter } = todo.actions

export default todo.reducer
