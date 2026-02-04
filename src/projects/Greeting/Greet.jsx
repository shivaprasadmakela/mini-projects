import React, { useState } from "react";
import Greeting from "./Greeting";
import styles from "./Greet.module.scss";

function Greet() {
  const [name, setName] = useState("");

  const handleClear = () => setName("");

  return (
    <div className="page-wrapper">
      <div className={styles.greetContainer}>
        <h2>💬 Greeting with Props</h2>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            className="input-field"
            onChange={(e) => setName(e.target.value)}
          />
          <p className={styles.charCount}>Character count: {name.length}</p>
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleClear} disabled={!name}>
            Clear
          </button>
        </div>

        <div className={styles.greetingWrapper}>
          <Greeting name={name} />
        </div>
      </div>
    </div>
  );
}

export default Greet;
