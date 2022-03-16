import { useState } from "react"
import Task from "./Task"

const Tasks = (props) => {
    
    return (
        <>
            {props.task.map((task) => (
                <Task key={task.id} task={task} onDelete={props.onDelete}
                  onToggle={props.onToggle}/>
            ))}
        </>
    )
}

export default Tasks