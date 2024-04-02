import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [task, setTask] = useState({
        title: "",
        content: "",
        isComplete: false
    });
    //function trigger the input boxes title and content and encapsulate these two into object
    function handleChangeInput(event) {
        const { name, value } = event.target;

        setTask(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }
    //function trigger on add task "+" send the task to app.js 
    function submitTask(event) {
        props.addTask(task)
        setTask({
            title: "",
            content: "",
            isComplete: false
        });
        event.preventDefault();

    }

    function expand() {
        setExpanded(true);
    }

    return (
        <div>
            <form className="create-task">
                {isExpanded && (
                    <input
                        name="title"
                        onChange={handleChangeInput}
                        value={task.title}
                        placeholder="Title"
                    />
                )}

                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChangeInput}
                    value={task.content}
                    placeholder="Take a task..."
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitTask}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
