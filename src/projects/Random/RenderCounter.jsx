import { useRef, useState } from "react";
import styles from "./Random.module.scss";

function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  return (
    <div className={styles.cardContent}>
      <div className={styles.actionRow}>
        <p>Clicks: <span className={styles.counterValue}>{count}</span></p>
        <p>Renders: <span className={styles.counterValue}>{renderCount.current}</span></p>
      </div>
      <button onClick={() => setCount(count + 1)}>Increment & Re-render</button>
    </div>
  );
}

export default RenderCounter;