import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Todo.module.scss";
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
    <div className="page-wrapper">
      <div className={styles.mainTodoContainer}>
        <h1 className={styles.title}>📝 Advanced Todo App</h1>

        {/* Input Section */}
        <div className={styles.topTodoHeader}>
          <input
            placeholder="What needs to be done?"
            className="input-field"
            type="text"
            value={todoName}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="date"
            className={styles.dateInput}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`${styles.prioritySelect} ${styles[`prioritySelector-${priority.toLowerCase()}`]}`}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button className={styles.addBtn} onClick={addNewTodo}>Add Task</button>
        </div>

        {/* Filters + Search + Clear */}
        {allTask.length > 0 ? (
          <div className={styles.todoActions}>
            <div className={styles.filters}>
              {["all", "active", "completed"].map((f) => (
                <button
                  key={f}
                  className={filter === f ? styles.active : ""}
                  onClick={() => setFilter(f)}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Filter tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />

            <button className={styles.clearBtn} onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        ) : (
          <div className={styles.noTasksMessage}>
            <p>Your task list is empty. Add a new task above!</p>
          </div>
        )}

        {/* Tasks List */}
        <div className={styles.todosContainer}>
          <AnimatePresence>
            {filteredTasks.map((item) => {
              const isOverdue =
                item.dueDate && new Date(item.dueDate) < new Date() && !item.completed;

              return (
                <motion.div
                  className={`${styles.todoItem} ${styles[`priority-${item.priority.toLowerCase()}`]} ${
                    isOverdue ? styles.overdue : ""
                  }`}
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTodo(item.id)}
                    />
                    <span className={styles.checkmark}></span>
                  </label>

                  <div className={styles.todoText}>
                    <span className={item.completed ? styles.completed : ""}>
                      {item.name}
                    </span>
                    <div className={styles.todoMeta}>
                      {item.dueDate && (
                        <small>
                          <i className="fa-regular fa-calendar"></i>
                          <span
                            className={isOverdue ? styles.dueOverdue : styles.dueNormal}
                          >
                            {item.dueDate}
                          </span>
                        </small>
                      )}
                      <small className={`${styles.tag} ${styles[`tag-${item.priority.toLowerCase()}`]}`}>
                        {item.priority}
                      </small>
                    </div>
                  </div>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteTodo(item.id)}
                    title="Delete task"
                  >
                    <i className="fa-solid fa-trash-can"></i>
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
    </div>
  );
}

export default TodoApp;
