import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Counter.module.scss";

const RANKS = [
  { threshold: 0, name: "Iron Tapper", color: "#a1a1aa", rgb: "161, 161, 170", icon: "fa-solid fa-hammer" },
  { threshold: 10, name: "Bronze Clicker", color: "#cd7f32", rgb: "205, 127, 50", icon: "fa-solid fa-mouse-pointer" },
  { threshold: 25, name: "Silver Producer", color: "#c0c0c0", rgb: "192, 192, 192", icon: "fa-solid fa-gears" },
  { threshold: 50, name: "Gold Architect", color: "#ffd700", rgb: "255, 215, 0", icon: "fa-solid fa-city" },
  { threshold: 100, name: "Legendary Clicker", color: "#00f2ff", rgb: "0, 242, 255", icon: "fa-solid fa-crown" },
];

function CounterApp() {
  const [count, setCount] = useState(0);

  const currentRank = useMemo(() => {
    return [...RANKS].reverse().find(r => count >= r.threshold) || RANKS[0];
  }, [count]);

  const nextRank = useMemo(() => {
    return RANKS.find(r => count < r.threshold);
  }, [count]);

  const progress = useMemo(() => {
    if (!nextRank) return 100;
    const prevThreshold = RANKS.find(r => r.name === currentRank.name).threshold;
    return ((count - prevThreshold) / (nextRank.threshold - prevThreshold)) * 100;
  }, [count, currentRank, nextRank]);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="page-wrapper">
      <div className={styles.counterContainer}>
        <div className={styles.gameHeader}>
          <div className={styles.rankBadge} style={{ "--rank-color": currentRank.color, "--rank-rgb": currentRank.rgb }}>
            <i className={currentRank.icon}></i>
            <span>{currentRank.name}</span>
          </div>
          <h1 className={styles.title}>Click Odyssey</h1>
        </div>

        <div className={styles.displayWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={styles.countDisplay}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.progression}>
          <div className={styles.progressBarWrapper}>
            <motion.div 
              className={styles.progressBarFill} 
              animate={{ width: `${progress}%` }}
              style={{ backgroundColor: currentRank.color }}
            />
          </div>
          <div className={styles.rankTarget}>
            {nextRank ? (
              <p>Next: <strong>{nextRank.name}</strong> at {nextRank.threshold}</p>
            ) : (
              <p className={styles.maxRank}>Max Rank Achieved! 🏆</p>
            )}
          </div>
        </div>

        <div className={styles.controls}>
          <button className={`${styles.btn} ${styles.decrease}`} onClick={decrease} disabled={count === 0}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <button className={`${styles.btn} ${styles.reset}`} onClick={reset}>
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <button className={`${styles.btn} ${styles.increase}`} onClick={increase}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {count === 0 && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className={styles.message}
          >
            Start your journey!
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default CounterApp;