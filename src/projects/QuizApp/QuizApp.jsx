import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./QuizApp.module.scss";

const QUESTIONS = [
  {
    question: "Which hook is used to run side effects in React?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    answer: "useEffect",
  },
  {
    question: "What does the virtual DOM do?",
    options: [
      "Directly manipulates the browser DOM",
      "Acts as a lightweight copy of the real DOM to optimize updates",
      "Stores state globally",
      "Handles API requests",
    ],
    answer: "Acts as a lightweight copy of the real DOM to optimize updates",
  },
  {
    question: "Which method is used to update state in a class component?",
    options: ["this.state()", "setState()", "updateState()", "this.update()"],
    answer: "setState()",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "JavaScript Extension",
    ],
    answer: "JavaScript XML",
  },
  {
    question: "Which hook gives you a mutable ref that persists across renders?",
    options: ["useState", "useCallback", "useRef", "useContext"],
    answer: "useRef",
  },
  {
    question: "What is the correct way to pass data to a child component?",
    options: ["via state", "via props", "via context only", "via refs"],
    answer: "via props",
  },
  {
    question: "What does `key` prop help React with in lists?",
    options: [
      "Styling list items",
      "Efficiently identifying which items changed",
      "Sorting items",
      "Fetching data",
    ],
    answer: "Efficiently identifying which items changed",
  },
  {
    question: "Which hook should you use when state logic is complex?",
    options: ["useState", "useEffect", "useReducer", "useContext"],
    answer: "useReducer",
  },
];

const SCREEN = { START: "start", QUIZ: "quiz", RESULTS: "results" };

export default function QuizApp() {
  const [screen, setScreen] = useState(SCREEN.START);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const current = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;
  const score = answers.filter((a) => a.correct).length;

  const handleStart = () => {
    setScreen(SCREEN.QUIZ);
    setIndex(0);
    setSelected(null);
    setAnswers([]);
  };

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
  };

  const handleNext = () => {
    const record = { question: current.question, selected, correct: selected === current.answer };
    const newAnswers = [...answers, record];
    setAnswers(newAnswers);

    if (isLast) {
      setScreen(SCREEN.RESULTS);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const getOptionClass = (option) => {
    if (selected === null) return styles.option;
    if (option === current.answer) return `${styles.option} ${styles.correct}`;
    if (option === selected) return `${styles.option} ${styles.wrong}`;
    return `${styles.option} ${styles.dimmed}`;
  };

  const progress = ((index) / QUESTIONS.length) * 100;

  return (
    <div className="page-wrapper">
      <AnimatePresence mode="wait">

        {screen === SCREEN.START && (
          <motion.div
            key="start"
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.startIcon}>
              <i className="fa-solid fa-circle-question" />
            </div>
            <h1 className={styles.title}>React Quiz Arena</h1>
            <p className={styles.subtitle}>
              Test your React knowledge across {QUESTIONS.length} questions. No
              time limit — just think it through!
            </p>
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <i className="fa-solid fa-layer-group" />
                <span>{QUESTIONS.length} Questions</span>
              </div>
              <div className={styles.stat}>
                <i className="fa-solid fa-bolt" />
                <span>Instant feedback</span>
              </div>
              <div className={styles.stat}>
                <i className="fa-solid fa-trophy" />
                <span>Scored results</span>
              </div>
            </div>
            <button className={styles.startBtn} onClick={handleStart}>
              <i className="fa-solid fa-play" /> Start Quiz
            </button>
          </motion.div>
        )}

        {screen === SCREEN.QUIZ && (
          <motion.div
            key={`q-${index}`}
            className={styles.card}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.progressHeader}>
              <span className={styles.questionCount}>
                Question {index + 1} / {QUESTIONS.length}
              </span>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <h2 className={styles.questionText}>{current.question}</h2>

            <div className={styles.optionsGrid}>
              {current.options.map((option) => (
                <button
                  key={option}
                  className={getOptionClass(option)}
                  onClick={() => handleSelect(option)}
                >
                  {option === current.answer && selected !== null && (
                    <i className="fa-solid fa-check" />
                  )}
                  {option === selected && option !== current.answer && (
                    <i className="fa-solid fa-xmark" />
                  )}
                  <span>{option}</span>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  className={`${styles.feedback} ${selected === current.answer ? styles.feedbackCorrect : styles.feedbackWrong}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {selected === current.answer ? (
                    <><i className="fa-solid fa-circle-check" /> Correct!</>
                  ) : (
                    <><i className="fa-solid fa-circle-xmark" /> The answer was: <strong>{current.answer}</strong></>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className={styles.nextBtn}
              onClick={handleNext}
              disabled={selected === null}
            >
              {isLast ? "See Results" : "Next"}{" "}
              <i className={`fa-solid ${isLast ? "fa-flag-checkered" : "fa-arrow-right"}`} />
            </button>
          </motion.div>
        )}

        {screen === SCREEN.RESULTS && (
          <motion.div
            key="results"
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.scoreRing}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" className={styles.ringBg} />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  className={styles.ringFill}
                  strokeDasharray={`${(score / QUESTIONS.length) * 264} 264`}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${(score / QUESTIONS.length) * 264} 264` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className={styles.scoreLabel}>
                <span className={styles.scoreNumber}>{score}</span>
                <span className={styles.scoreTotal}>/ {QUESTIONS.length}</span>
              </div>
            </div>

            <h2 className={styles.resultsTitle}>
              {score === QUESTIONS.length
                ? "Perfect Score! 🏆"
                : score >= QUESTIONS.length * 0.7
                ? "Great Work! 🎉"
                : score >= QUESTIONS.length * 0.4
                ? "Keep Practicing! 💪"
                : "Don't Give Up! 🔥"}
            </h2>

            <div className={styles.breakdown}>
              {answers.map((a, i) => (
                <div key={i} className={`${styles.breakdownRow} ${a.correct ? styles.bCorrect : styles.bWrong}`}>
                  <i className={`fa-solid ${a.correct ? "fa-check" : "fa-xmark"}`} />
                  <span className={styles.bText}>{a.question}</span>
                </div>
              ))}
            </div>

            <button className={styles.startBtn} onClick={handleStart}>
              <i className="fa-solid fa-rotate-left" /> Retake Quiz
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
