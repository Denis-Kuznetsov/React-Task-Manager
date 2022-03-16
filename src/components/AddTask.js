import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()

        if (!text) {
            alert('Please add task')
            return
        }

        onAdd({text, day, reminder})
       
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type="text" placeholder="Add Task" 
                value={text} onChange={(e) => 
                    setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type="date" placeholder="Add Day & Time" 
                value={day ? new Date(day).toISOString().slice(0, 10) : ''} onChange={(e) => {
                    const date = new Date(e.target.value).toDateString()

                    setDay(date)
                }
            }/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type="checkbox" 
                checked={reminder}
                value={reminder} onChange={(e) => 
                setReminder(e.currentTarget.checked)}/>
            </div>

            <input type="submit" value="Save Task" 
            className="btn btn-block"/>
        </form>
    )
}

export default AddTask