import React from 'react'
import FocusInput from './FocusInput'
import RenderCounter from './RenderCounter'
import styles from './Random.module.scss'

const MainRandom = () => {
  return (
    <div className="page-wrapper">
      <div className={styles.randomGrid}>
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3><i className="fa-solid fa-keyboard"></i> UseRef: Focus Demo</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.infoText}>Demonstrating how to access and control DOM elements directly using the <code>useRef</code> hook.</p>
            <FocusInput />
          </div>
        </div>

        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3><i className="fa-solid fa-calculator"></i> UseRef: Render Counter</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.infoText}>Tracking total component renders without triggering additional re-renders using a persistent ref.</p>
            <RenderCounter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainRandom