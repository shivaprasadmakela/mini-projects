import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Toast.module.scss";

function Toast({ message, type, onClose }) {
  const getIcon = () => {
    switch (type) {
      case "success": return <i className="fa-solid fa-circle-check"></i>;
      case "error": return <i className="fa-solid fa-circle-exclamation"></i>;
      case "warning": return <i className="fa-solid fa-triangle-exclamation"></i>;
      default: return <i className="fa-solid fa-circle-info"></i>;
    }
  };

  return (
    <motion.div
      className={`${styles.toast} ${styles[type]}`}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <span className={styles.icon}>{getIcon()}</span>
      <span>{message}</span>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close notification">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </motion.div>
  );
}

export default function ToastWrapper({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <Toast message={message} type={type} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}
