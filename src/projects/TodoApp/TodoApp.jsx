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

  // Calculate stats
  const totalTasks = allTask.length;
  const completedTasks = allTask.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Handle keyboard submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTodo();
    }
  };

  return (
    <div className="page-wrapper">
      <div className={styles.mainTodoContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>✨ Task Manager</h1>
          <span className={styles.subtitle}>Stay organized, stay productive</span>
        </div>

        {/* Stats Bar */}
        {allTask.length > 0 && (
          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{totalTasks}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{pendingTasks}</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{completedTasks}</span>
              <span className={styles.statLabel}>Done</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {allTask.length > 0 && (
          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Progress</span>
              <span className={styles.progressPercent}>{progressPercent}%</span>
            </div>
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className={styles.inputSection}>
          <div className={styles.topTodoHeader}>
            <input
              placeholder="What needs to be done?"
              className={styles.taskInput}
              type="text"
              value={todoName}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.addBtn} onClick={addNewTodo}>
              <i className="fa-solid fa-plus"></i>
              Add Task
            </button>
          </div>
          <div className={styles.inputRow}>
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
          </div>
        </div>

        {/* Filters + Search + Clear */}
        {allTask.length > 0 && (
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
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />

            <button className={styles.clearBtn} onClick={clearCompleted}>
              <i className="fa-solid fa-broom"></i>
              Clear Done
            </button>
          </div>
        )}

        {/* Tasks List or Empty State */}
        {allTask.length === 0 ? (
          <div className={styles.noTasksMessage}>
            <div className={styles.emptyIcon}>📋</div>
            <h3 className={styles.emptyTitle}>No tasks yet</h3>
            <p className={styles.emptyText}>
              Add your first task above to get started on your productivity journey!
            </p>
          </div>
        ) : (
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
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    layout
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
                              {new Date(item.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
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
        )}

        {/* Footer */}
        {allTask.length > 0 && (
          <div className={styles.footer}>
            <span className={styles.footerText}>
              Made with <i className="fa-solid fa-heart"></i> for productivity
            </span>
          </div>
        )}

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
