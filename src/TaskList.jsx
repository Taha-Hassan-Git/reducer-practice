import { useState } from "react";

export default function TaskList({ project, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {project.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            onChange({
              ...task,
              done: e.target.checked,
            });
          }}
        />
        <>
          <input
            value={task.text}
            onChange={(e) => {
              onChange({
                ...task,
                text: e.target.value,
              });
            }}
          />
        </>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </label>
    </div>
  );
}
