import { useEffect, useState } from "react";
import "../commonStyles.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

function MainPage() {
  const [same, setSame] = useState(false);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");

  const projectData = [
    { name: "To do", link: "/todo" },
    { name: "Task Now", link: "/task" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);

    const saved = localStorage.getItem("same");
    if (saved === "true") setSame(true);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function removeSaved() {
    localStorage.removeItem("same");
    setSame(false);
    setInput("");
  }

  function handlecheckSameName(value) {
    if (value === "Hello World") {
      setSame(true);
      localStorage.setItem("same", true);
    } else {
      setSame(false);
      localStorage.removeItem("same");
    }
  }

  return (
    <div className="mainPageContainer">
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
      </button>

      {!same ? (
        <div>
          <p>Please Type "Hello World"</p>
          <input
            type="text"
            className="input-field"
            placeholder="Don’t be shy, type something 👀"
            value={input}
            onChange={(event) => {
              const value = event.target.value;
              setInput(value);
              handlecheckSameName(value);
            }}
          />
        </div>
      ) : (
        <div>
          <div className="topContainer">
            <h1>The Art -- The Artist</h1>
            <button onClick={removeSaved}>Hit Me!!</button>
          </div>
          <div className="projectContainer">
            {projectData.map((item) => (
              <Link
                to={item.link}
                key={item.name}
                className="mainProductContainer"
              >
                <h3>{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
