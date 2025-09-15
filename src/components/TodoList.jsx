import React, { useState, useEffect } from "react";
import '../assets/TodoList.css'
import img1 from '../assets/images/icon.png'

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") {
      alert("You must write something!");
      return;
    }
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  return (
    <div className="container">
      <div className="todo">
        <h2>
          To-Do List <img src={img1}alt="icon" />
        </h2>

        <div className="row">
          <input
            type="text"
            value={input}
            placeholder="Add your text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "checked" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <span onClick={(e) => { e.stopPropagation(); deleteTask(index); }}>
                ×
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
