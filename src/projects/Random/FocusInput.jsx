import { useRef } from "react";
import styles from "./Random.module.scss";

function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className={styles.actionRow}>
      <input 
        ref={inputRef} 
        className="input-field" 
        type="text" 
        placeholder="Focus on me..." 
      />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default FocusInput;