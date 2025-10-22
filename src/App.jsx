import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import TodoApp from "./projects/TodoApp/TodoApp";
import CounterApp from "./projects/CounterApp/Counter";
import Greet from "./projects/Greeting/Greet";
import Form from "./projects/Form/Form"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route path="/greeting" element={<Greet />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
