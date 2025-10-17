import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./todo.scss";
import shortUUID from "short-uuid";
import Toast from "./Toast";

function TodoApp() {
  const [todoName, setTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [allTask, setTask] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2600);
  };

  function addNewTodo() {
    if (!todoName.trim()) {
      showToast("Task name is required!", "error");
      return;
    }
    if (!dueDate) {
      showToast("Please select a due date!", "warning");
      return;
    }

    const newToDo = {
      id: shortUUID.generate(),
      name: todoName.trim(),
      completed: false,
      dueDate,
      priority,
      createdAt: new Date(),
    };

    setTask((prev) => [...prev, newToDo]);
    setTodo("");
    setDueDate("");
    setPriority("Medium");
    showToast("Task added successfully!", "success");
  }

  function toggleTodo(id) {
    setTask((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    showToast("Task updated!", "info");
  }

  function deleteTodo(id) {
    setTask((prev) => prev.filter((item) => item.id !== id));
    showToast("Task deleted!", "error");
  }

  function clearCompleted() {
    const hasCompleted = allTask.some((item) => item.completed);
    if (!hasCompleted) {
      showToast("No completed tasks to clear!", "warning");
      return;
    }
    setTask((prev) => prev.filter((item) => !item.completed));
    showToast("Completed tasks cleared!", "success");
  }

  const filteredTasks = useMemo(() => {
    let tasks = [...allTask];

    if (filter === "active") tasks = tasks.filter((t) => !t.completed);
    if (filter === "completed") tasks = tasks.filter((t) => t.completed);
    if (search)
      tasks = tasks.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );

    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    return tasks.sort(
      (a, b) =>
        priorityOrder[b.priority] - priorityOrder[a.priority] ||
        new Date(a.dueDate) - new Date(b.dueDate)
    );
  }, [allTask, filter, search]);

  return (
    <div className="mainTodoContainer">
      <h1>📝 Advanced Todo App</h1>

      {/* Input Section */}
      <div className="topTodoHeader">
        <input
          placeholder="Enter a task..."
          className="input-field"
          type="text"
          value={todoName}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`priority-${priority.toLowerCase()}`}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={addNewTodo}>Add</button>
      </div>

      {/* Filters + Search + Clear */}
      {allTask.length > 0 ? (
        <div className="todoActions">
          <div className="filters">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="searchInput"
          />

          <button className="clearBtn" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      ) : (
        <div className="noTasksMessage">
          <p>No tasks yet — start by adding one 👇</p>
        </div>
      )}

      {/* Tasks List */}
      <div className="todosContainer">
        <AnimatePresence>
          {filteredTasks.map((item) => {
            const isOverdue =
              item.dueDate && new Date(item.dueDate) < new Date() && !item.completed;

            return (
              <motion.div
                className={`todoItem priority-${item.priority.toLowerCase()} ${
                  isOverdue ? "overdue" : ""
                }`}
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodo(item.id)}
                />
                <div className="todoText">
                  <span className={item.completed ? "completed" : ""}>
                    {item.name}
                  </span>
                  <div className="todoMeta">
                    {item.dueDate && (
                      <small>
                        Due:{" "}
                        <span
                          className={isOverdue ? "due-overdue" : "due-normal"}
                        >
                          {item.dueDate}
                        </span>
                      </small>
                    )}
                    <small className={`tag-${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </small>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(item.id)}
                >
                  ❌
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Toast Message */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </div>
  );
}

export default TodoApp;
