import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import TodoApp from "./projects/TodoApp/TodoApp";
import CounterApp from "./projects/CounterApp/Counter";
import Greet from "./projects/Greeting/Greet";
import Form from "./projects/Form/Form"
import MainRandom from "./projects/Random/MainRandom"
import QuizApp from "./projects/QuizApp/QuizApp"
import Changelog from "./projects/Changelog/Changelog"
import ProfileSetup from "./projects/ProfileSetup/ProfileSetup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route path="/greeting" element={<Greet />} />
        <Route path="/form" element={<Form />} />
        <Route path="/random" element={<MainRandom />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
}

export default App;
