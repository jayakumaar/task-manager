import React from 'react';

const TaskList = ({ tasks, onDeleteTask, onCompleteTask }) => {
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.name}
            </span>
            <button onClick={() => onCompleteTask(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
