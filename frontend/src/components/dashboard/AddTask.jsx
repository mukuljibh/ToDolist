import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Fab from "@material-ui/core/Fab";
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import { useDispatch } from 'react-redux'
import { CompleteTaskCenter } from "../../redux/features/todo/slice";
import DoneSharpIcon from '@mui/icons-material/DoneSharp';

function AddTask(props) {
    const dispatch = useDispatch();
    const [eventUpdateHandle, seteventUpdateHandle] = useState({ title: "", content: "", isComplete: false });
    const [mark, setMark] = useState(false);
    useEffect(() => {
        seteventUpdateHandle(props.tasks)
        setMark(props.tasks.isComplete)
    }, [props.tasks])

    async function deleteTask() {
        props.deleteTask(props.index)
    }

    function handlecontent(event) {
        let type = event.target.id;
        let name = event.target.innerText;
        seteventUpdateHandle((prev) => {
            return {
                ...prev, [type]: name
            }
        })
    }
    function completeTaskHandleHelper(updatedTaskObj, index) {
        return {
            type: 'COMPLETE_TASK',
            payload: { updatedTaskObj, index }
        }
    }
    async function completeTaskHandle() {
        let newMark = !mark;
        setMark(newMark);

        seteventUpdateHandle((prev) => {
            return {
                ...prev, isComplete: newMark
            }
        })
        const newObj = { ...eventUpdateHandle, isComplete: newMark }
        dispatch(CompleteTaskCenter(completeTaskHandleHelper(newObj, props.index)))


    }
    function editTask() {
        props.editTask(eventUpdateHandle, props.index)
    }
    return (
        <div className="a task">

            <form>
                {mark ? <TaskAltSharpIcon fontSize="large" className="bookmark" /> : null}

                <h1 id="title"
                    onInput={handlecontent}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                >{props.title}</h1>

                <p id="content"
                    onInput={handlecontent}
                    contentEditable={true}
                    suppressContentEditableWarning={true}>
                    {props.content}
                </p>

                <Fab onClick={editTask} size="large" color="inherit" aria-label="edit">
                    <EditIcon />
                </Fab>
                <Fab size="small" onClick={deleteTask}>

                    <DeleteIcon />

                </Fab>

                <Fab size="small" onClick={completeTaskHandle}>
                    <DoneSharpIcon />

                </Fab>

            </form>
        </div >
    );
}

export default AddTask;
