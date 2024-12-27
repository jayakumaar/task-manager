import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks && Array.isArray(storedTasks)) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Toggle dark and light mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Add a new task
  const addTask = (task) => {
    const newTask = { name: task, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Delete a task by index
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  // Toggle task completion
  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Task Manager</h1>
        <span className="task-count">{tasks.length} Tasks</span>
        <div className="theme-toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <AddTask onAddTask={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className={task.completed ? 'completed' : ''}>
              {task.name}
            </span>
            <div>
              <button onClick={() => completeTask(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
