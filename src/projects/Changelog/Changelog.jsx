import React from 'react';
import styles from './Changelog.module.scss';
import { motion } from 'framer-motion';

const changelogData = [
  { date: 'September 3, 2024', title: 'Announcing Projects on Frontend Roadmap' },
  { date: 'August 28, 2024', title: 'Build your learning habits with learning streaks' },
  { date: 'August 25, 2024', title: 'Git and GitHub Roadmap' },
  { date: 'August 22, 2024', title: 'Submit your project solution and get feedback' },
  { date: 'August 15, 2024', title: 'Backend Project Ideas' },
  { date: 'August 10, 2024', title: 'Redis roadmap' },
  { date: 'August 1, 2024', title: 'Changelog page to help you stay in the loop' },
];

const Changelog = () => {
  return (
    <div className={styles.changelogContainer}>
      <motion.header 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Changelog</h1>
        <p>Here's everything we have shipped in the past few days</p>
      </motion.header>

      <div className={styles.timeline}>
        {changelogData.map((item, index) => (
          <motion.div 
            key={index} 
            className={styles.timelineItem}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.date}>{item.date}</div>
            <div className={styles.dot}></div>
            <div className={styles.content}>{item.title}</div>
          </motion.div>
        ))}
      </div>

      <motion.footer 
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button className={styles.btn}>
          Visit Complete Changelog
        </button>
      </motion.footer>
    </div>
  );
};

export default Changelog;
