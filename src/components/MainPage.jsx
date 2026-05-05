import { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

function MainPage() {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");

  const projectData = [
    { name: "Counter App", link: "/counter", icon: "fa-solid fa-calculator", desc: "Basic state management demo" },
    { name: "To-do Suite", link: "/todo", icon: "fa-solid fa-list-check", desc: "Advanced task management" },
    { name: "Greeting Hub", link: "/greeting", icon: "fa-regular fa-comment-dots", desc: "Dynamic prop handling" },
    { name: "Pro Forms", link: "/form", icon: "fa-solid fa-wpforms", desc: "Validation & state tracking" },
    { name: "Utility Box", link: "/random", icon: "fa-solid fa-toolbox", desc: "Hooks & Ref demonstrations" },
    { name: "Quiz Arena", link: "/quiz", icon: "fa-solid fa-circle-question", desc: "State machines & conditional rendering" },
    { name: "Changelog", link: "/changelog", icon: "fa-solid fa-clock-rotate-left", desc: "Clean timeline presentation" },
    { name: "Profile Setup", link: "/profile-setup", icon: "fa-solid fa-user-gear", desc: "Accessible form & progress" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);

    const savedAuth = localStorage.getItem("authorized");
    if (savedAuth === "true") setAuthorized(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const logout = () => {
    localStorage.removeItem("authorized");
    setAuthorized(false);
    setInput("");
  };

  const handleCheckAuth = (value) => {
    if (value.toLowerCase() === "hello world") {
      setAuthorized(true);
      localStorage.setItem("authorized", "true");
    }
  };

  return (
    <div className={styles.mainPageContainer}>
      {!authorized ? (
        <div className={styles.gateContainer}>
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <i className={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
          </button>
          <div className={styles.heroSection}>
            <h1>Practice Suite</h1>
            <p>Mastering React one project at a time.</p>
          </div>
          <p className={styles.gateTitle}>Unlock the gallery with the Magic Secret...</p>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Type 'Hello World'..."
            value={input}
            onChange={(e) => {
              const val = e.target.value;
              setInput(val);
              handleCheckAuth(val);
            }}
            autoFocus
          />
        </div>
      ) : (
        <div className={styles.projectSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Featured Projects</h2>
              <p>Select a demonstration to explore.</p>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.themeToggleBtnInline}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                <i className={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
              </button>
              <button onClick={logout} className={styles.resetBtn}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Lock Suite
              </button>
            </div>
          </div>

          <div className={styles.projectGrid}>
            {projectData.map((project) => (
              <Link
                to={project.link}
                key={project.name}
                className={styles.projectCard}
              >
                <div className={styles.iconWrapper}>
                  <i className={project.icon}></i>
                </div>
                <div className={styles.projectInfo}>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
