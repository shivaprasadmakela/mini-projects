import { useState } from "react";
import "./todo.scss";
import shortUUID from "short-uuid";

function TodoApp() {
  const [todoName, setTodo] = useState("");
  const [allTask, setTask] = useState([]);

  function addNewTodo() {
    if (!todoName.trim()) return; 

    const newToDo = {
      id: shortUUID.generate(),
      name: todoName,
      completed: false,
    };

    setTask((prev) => [...prev, newToDo]);
    setTodo("");
  }

  function toggleTodo(id) {
    setTask((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <div className="mainTodoContainer">
      <div className="topTodoHeader">
        <input
          placeholder="Please enter a task"
          className="input-field"
          type="text"
          value={todoName}
          onChange={(event) => setTodo(event.target.value)}
        />

        <button onClick={addNewTodo}>Add</button>
      </div>

      <div className="todosContainer">
        {allTask.map((item) => (
          <div className="todoItem" key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item.id)}
            />
            <span className={item.completed ? "completed" : ""}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
