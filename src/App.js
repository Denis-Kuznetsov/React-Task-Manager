import React from 'react'
import Header from "./components/Header"
import Tasks from './components/Tasks'
import { useState, useEffect } from "react"
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()

    return data
  }

  // Fetch task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()

    return data
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => {return task.id !== id}))
  }

  // Toggel reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json()

    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: 
      !task.reminder} : task))
  }

  // Add Task
  const addTask = async (task) => {
    console.log(task)
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await response.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {
        tasks.length > 0 ? 
        <Tasks task={tasks} onDelete={deleteTask} 
        onToggle={toggleReminder}/> : 
        "No Tasks"
      }
    </div>
  );
}

export default App;
