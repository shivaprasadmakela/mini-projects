import { useState } from "react";
import styles from "./Counter.module.scss";

function CounterApp() {
  const [count, setCount] = useState(0);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="page-wrapper">
      <div className={styles.counterContainer}>
        <h1 className={styles.title}>Counter App</h1>
        
        <div className={styles.countDisplay}>{count}</div>

        <div className={styles.controls}>
          <button className={`${styles.btn} ${styles.decrease}`} onClick={decrease} disabled={count === 0}>
            Decrease
          </button>
          <button className={`${styles.btn} ${styles.reset}`} onClick={reset}>
            Reset
          </button>
          <button className={`${styles.btn} ${styles.increase}`} onClick={increase}>
            Increase
          </button>
        </div>

        {count === 0 && <p className={styles.message}>Start clicking to count!</p>}
      </div>
    </div>
  );
}

export default CounterApp;