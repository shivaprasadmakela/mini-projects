import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import TodoApp from "./projects/TodoApp/TodoApp";
// import NotesApp from "./projects/NotesApp/NotesApp";
// import WeatherApp from "./projects/WeatherApp/WeatherApp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoApp />} />
        {/* <Route path="/notes" element={<NotesApp />} />
        <Route path="/weather" element={<WeatherApp />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
