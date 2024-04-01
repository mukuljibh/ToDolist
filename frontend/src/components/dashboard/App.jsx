import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import { useSelector, useDispatch } from 'react-redux'
import { addTaskCenter, editTaskCenter, deleteTaskCenter, stateSavingCenter } from "../../redux/features/todo/slice";
import AddTask from "./AddTask";
import { StateLoading, StatesSaving } from "./StatesSaving";
function App() {
    //local state changer
    const [tasks, setTasks] = useState([]);
    const taskBase = useSelector((state) => state.task.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        //this function is for loading and therefore setting the prev state to the current state after browser refreshes.
        const load = StateLoading()
        if (load) dispatch(stateSavingCenter(load))
    }, [])//runs intially for the first time only 

    //due to asyc nature of redux, useffect is used here with an task base dependency array
    useEffect(() => {
        //this function is for saving the states inside the browser local storage
        StatesSaving(taskBase);
        setTasks([...taskBase])
    }, [taskBase])

    // receive object of task from  createArea component 
    // now this function passes it to center hub with the helpe of dispatch
    function addTask(task) {
        dispatch(addTaskCenter(task))
    }
    //for passing the task index 
    function editTaskHelper(updatedTaskObj, index) {
        return {
            type: 'EDIT_TASK',
            payload: { updatedTaskObj, index }
        }
    }
    //passing the index as well as updated objected to the centeral place inside slice.js(redux),
    function editTask(updatedTaskObj, index) {

        dispatch(editTaskCenter(editTaskHelper(updatedTaskObj, index)))
    }
    //passing the index to the centeral place inside slice.js(redux)
    function deleteTask(index) {
        dispatch(deleteTaskCenter(index))
    }
    return (
        <div >
            <Header />
            <CreateArea addTask={addTask} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {tasks.map((taskItem, index) => {
                    return (
                        <AddTask
                            key={index}
                            index={index}
                            title={taskItem.title}
                            content={taskItem.content}
                            editTask={editTask}
                            deleteTask={deleteTask}
                            isComplete={taskItem.isComplete}
                            tasks={taskItem}

                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
