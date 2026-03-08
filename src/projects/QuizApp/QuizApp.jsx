import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./QuizApp.module.scss";

// ─── Question Banks ────────────────────────────────────────────────────────────

const QUESTION_BANK = {
  beginner: [
    {
      question: "What does JSX stand for?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
      answer: "JavaScript XML",
    },
    {
      question: "Which hook is used to manage local state in a functional component?",
      options: ["useEffect", "useRef", "useState", "useContext"],
      answer: "useState",
    },
    {
      question: "What is the correct way to pass data to a child component?",
      options: ["via state", "via props", "via context only", "via refs"],
      answer: "via props",
    },
    {
      question: "Which method is used to update state in a class component?",
      options: ["this.state()", "setState()", "updateState()", "this.update()"],
      answer: "setState()",
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
      question: "What is a React component?",
      options: [
        "A function or class that returns HTML",
        "A CSS file",
        "A database model",
        "An API endpoint",
      ],
      answer: "A function or class that returns HTML",
    },
  ],
  intermediate: [
    {
      question: "Which hook is used to run side effects in React?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      answer: "useEffect",
    },
    {
      question: "Which hook gives you a mutable ref that persists across renders without triggering re-renders?",
      options: ["useState", "useCallback", "useRef", "useContext"],
      answer: "useRef",
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
      question: "Which hook should you use when state logic is complex?",
      options: ["useState", "useEffect", "useReducer", "useContext"],
      answer: "useReducer",
    },
    {
      question: "When does useEffect with an empty dependency array `[]` run?",
      options: [
        "On every render",
        "Only on mount",
        "Only on state change",
        "Never",
      ],
      answer: "Only on mount",
    },
    {
      question: "What is the purpose of React.memo?",
      options: [
        "To manage async state",
        "To memoize expensive calculations",
        "To prevent re-rendering a component when its props haven't changed",
        "To create global context",
      ],
      answer: "To prevent re-rendering a component when its props haven't changed",
    },
  ],
  advanced: [
    {
      question: "What is the difference between useMemo and useCallback?",
      options: [
        "useMemo memoizes a value; useCallback memoizes a function",
        "They are identical",
        "useCallback memoizes a value; useMemo memoizes a function",
        "useMemo is for class components only",
      ],
      answer: "useMemo memoizes a value; useCallback memoizes a function",
    },
    {
      question: "What triggers reconciliation in React?",
      options: [
        "Changes to the real DOM",
        "State or prop changes that cause a re-render",
        "Only useEffect calls",
        "CSS transitions",
      ],
      answer: "State or prop changes that cause a re-render",
    },
    {
      question: "Which pattern allows you to share stateful logic across multiple components without HOCs?",
      options: ["Render props", "Custom hooks", "Context API", "Both A and B"],
      answer: "Custom hooks",
    },
    {
      question: "What does `useLayoutEffect` differ from `useEffect` in terms of timing?",
      options: [
        "useLayoutEffect runs after paint; useEffect runs before paint",
        "useLayoutEffect runs synchronously after DOM mutations, before paint",
        "They are identical",
        "useLayoutEffect only runs on SSR",
      ],
      answer: "useLayoutEffect runs synchronously after DOM mutations, before paint",
    },
    {
      question: "In React's concurrent mode, what is a 'transition'?",
      options: [
        "A CSS animation",
        "A way to mark a state update as non-urgent",
        "A new hook",
        "A router feature",
      ],
      answer: "A way to mark a state update as non-urgent",
    },
    {
      question: "What is the purpose of the `useId` hook introduced in React 18?",
      options: [
        "To generate unique IDs stable across server and client renders",
        "To track component instance IDs",
        "To memoize component keys",
        "To create database record IDs",
      ],
      answer: "To generate unique IDs stable across server and client renders",
    },
  ],
};

// ─── Level Config ──────────────────────────────────────────────────────────────

const LEVELS = [
  {
    key: "beginner",
    label: "Beginner",
    icon: "fa-solid fa-seedling",
    desc: "Core concepts & fundamentals",
    color: "#10b981",
    rgb: "16, 185, 129",
  },
  {
    key: "intermediate",
    label: "Intermediate",
    icon: "fa-solid fa-fire-flame-simple",
    desc: "Hooks, effects & rendering",
    color: "#f59e0b",
    rgb: "245, 158, 11",
  },
  {
    key: "advanced",
    label: "Advanced",
    icon: "fa-solid fa-bolt-lightning",
    desc: "Performance, patterns & internals",
    color: "#8b5cf6",
    rgb: "139, 92, 246",
  },
];

const SCREEN = { START: "start", LEVEL: "level", QUIZ: "quiz", RESULTS: "results" };

// ─── Component ─────────────────────────────────────────────────────────────────

export default function QuizApp() {
  const [screen, setScreen] = useState(SCREEN.START);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const levelConfig = LEVELS.find((l) => l.key === selectedLevel);
  const questions = selectedLevel ? QUESTION_BANK[selectedLevel] : [];
  const current = questions[index];
  const isLast = index === questions.length - 1;
  const score = answers.filter((a) => a.correct).length;

  const startQuiz = (levelKey) => {
    setSelectedLevel(levelKey);
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setScreen(SCREEN.QUIZ);
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

  const progress = (index / questions.length) * 100;

  return (
    <div className="page-wrapper">
      <AnimatePresence mode="wait">

        {/* ── Start Screen ── */}
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
              Test your React knowledge. Pick a difficulty, answer{" "}
              {questions.length || 6} questions, and see how you stack up!
            </p>
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <i className="fa-solid fa-layer-group" />
                <span>3 Levels</span>
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
            <button className={styles.startBtn} onClick={() => setScreen(SCREEN.LEVEL)}>
              <i className="fa-solid fa-play" /> Choose Level
            </button>
          </motion.div>
        )}

        {/* ── Level Select Screen ── */}
        {screen === SCREEN.LEVEL && (
          <motion.div
            key="level"
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className={styles.levelTitle}>Choose Your Level</h2>
            <p className={styles.subtitle}>Each level targets a different depth of React knowledge.</p>

            <div className={styles.levelsGrid}>
              {LEVELS.map((level) => (
                <motion.button
                  key={level.key}
                  className={styles.levelCard}
                  style={{ "--level-color": level.color, "--level-rgb": level.rgb }}
                  onClick={() => startQuiz(level.key)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className={styles.levelIcon}>
                    <i className={level.icon} />
                  </div>
                  <div className={styles.levelInfo}>
                    <span className={styles.levelLabel}>{level.label}</span>
                    <span className={styles.levelDesc}>{level.desc}</span>
                  </div>
                  <i className="fa-solid fa-chevron-right" style={{ color: level.color, opacity: 0.7 }} />
                </motion.button>
              ))}
            </div>

            <button className={styles.backBtn} onClick={() => setScreen(SCREEN.START)}>
              <i className="fa-solid fa-arrow-left" /> Back
            </button>
          </motion.div>
        )}

        {/* ── Quiz Screen ── */}
        {screen === SCREEN.QUIZ && current && (
          <motion.div
            key={`q-${index}`}
            className={styles.card}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.quizTopBar}>
              <div
                className={styles.levelBadge}
                style={{ "--level-color": levelConfig.color, "--level-rgb": levelConfig.rgb }}
              >
                <i className={levelConfig.icon} />
                {levelConfig.label}
              </div>
              <span className={styles.questionCount}>
                {index + 1} / {questions.length}
              </span>
            </div>

            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                style={{ background: levelConfig.color }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
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
                    <><i className="fa-solid fa-circle-xmark" /> Answer: <strong>{current.answer}</strong></>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className={styles.nextBtn}
              style={{ "--level-color": levelConfig.color }}
              onClick={handleNext}
              disabled={selected === null}
            >
              {isLast ? "See Results" : "Next"}{" "}
              <i className={`fa-solid ${isLast ? "fa-flag-checkered" : "fa-arrow-right"}`} />
            </button>
          </motion.div>
        )}

        {/* ── Results Screen ── */}
        {screen === SCREEN.RESULTS && (
          <motion.div
            key="results"
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={styles.levelBadge}
              style={{ "--level-color": levelConfig.color, "--level-rgb": levelConfig.rgb }}
            >
              <i className={levelConfig.icon} />
              {levelConfig.label}
            </div>

            <div className={styles.scoreRing} style={{ "--level-color": levelConfig.color }}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" className={styles.ringBg} />
                <motion.circle
                  cx="50" cy="50" r="42"
                  className={styles.ringFill}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${(score / questions.length) * 264} 264` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className={styles.scoreLabel}>
                <span className={styles.scoreNumber}>{score}</span>
                <span className={styles.scoreTotal}>/ {questions.length}</span>
              </div>
            </div>

            <h2 className={styles.resultsTitle}>
              {score === questions.length
                ? "Perfect Score! 🏆"
                : score >= questions.length * 0.7
                ? "Great Work! 🎉"
                : score >= questions.length * 0.4
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

            <div className={styles.resultsActions}>
              <button className={styles.retryBtn} style={{ "--level-color": levelConfig.color }} onClick={() => startQuiz(selectedLevel)}>
                <i className="fa-solid fa-rotate-left" /> Retry Level
              </button>
              <button className={styles.backBtn} onClick={() => setScreen(SCREEN.LEVEL)}>
                <i className="fa-solid fa-list" /> Change Level
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
