import React, { useState, useMemo } from 'react';
import styles from './ProfileSetup.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validations = useMemo(() => {
    const v = {
      fullName: formData.fullName.trim().length > 0,
      email: validateEmail(formData.email),
      password: formData.password.length >= 6,
      confirmPassword: formData.password.length >= 6 && formData.password === formData.confirmPassword,
      updateProfile: isSubmitted
    };
    return v;
  }, [formData, isSubmitted]);

  const tasks = [
    { text: 'Create Account', completed: true },
    { text: 'Update Roadmap Progress', completed: true },
    { text: 'Setup Public Profile', completed: true },
    { text: 'Provide Full Name', completed: validations.fullName },
    { text: 'Enter valid Email', completed: validations.email },
    { text: 'Set Password (min 6 chars)', completed: validations.password },
    { text: 'Confirm Password', completed: validations.confirmPassword },
    { text: 'Update Profile', completed: isSubmitted },
  ];

  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (isSubmitted) setIsSubmitted(false); // Reset submission if they change something
  };

  const handleUpdateProfile = () => {
    if (validations.fullName && validations.email && validations.password && validations.confirmPassword) {
      setIsSubmitted(true);
    }
  };

  const canSubmit = validations.fullName && validations.email && validations.password && validations.confirmPassword;

  return (
    <div className={styles.pageWrapper}>
      <motion.div
        className={styles.setupCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Section */}
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              className={styles.inputControl}
              placeholder="What should we call you?"
              value={formData.fullName}
              onChange={handleInputChange}
              aria-required="true"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`${styles.inputControl} ${formData.email && !validations.email ? styles.hasError : ''}`}
              placeholder="john@doe.com"
              value={formData.email}
              onChange={handleInputChange}
              aria-invalid={formData.email && !validations.email}
              aria-describedby={formData.email && !validations.email ? "email-error" : undefined}
            />
            <AnimatePresence>
              {formData.email && !validations.email && (
                <motion.span
                  id="email-error"
                  className={styles.errorMessage}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  Please enter a valid email address
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Enter Password</label>
            <div className={styles.inputWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.inputControl}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                aria-required="true"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <AnimatePresence>
              {formData.password && !validations.password && (
                <motion.span
                  className={styles.errorMessage}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  Password must be at least 6 characters
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputWrapper}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`${styles.inputControl} ${formData.confirmPassword && !validations.confirmPassword ? styles.hasError : ''}`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                aria-required="true"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <AnimatePresence>
              {formData.confirmPassword && !validations.confirmPassword && (
                <motion.span
                  className={styles.errorMessage}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  Passwords do not match
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button
            className={styles.submitBtn}
            onClick={handleUpdateProfile}
            disabled={!canSubmit || isSubmitted}
            style={{ opacity: canSubmit ? 1 : 0.6, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
          >
            {isSubmitted ? 'Profile Updated!' : 'Update Profile'}
          </button>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          <div className={styles.progressContainer} role="status" aria-label={`Profile completeness: ${percentage}%`}>
            <svg width="160" height="160">
              <circle
                className={styles.circleBg}
                cx="80" cy="80" r={radius}
              />
              <motion.circle
                className={styles.circleProgress}
                cx="80" cy="80" r={radius}
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <span className={styles.percentageText}>{percentage}%</span>
          </div>

          <h2 className={styles.progressLabel}>Profile Completeness</h2>

          <div className={styles.taskList}>
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
              >
                <i className={`fa-solid ${task.completed ? 'fa-circle-check' : 'fa-circle-dot'}`}
                  style={{ color: task.completed ? 'var(--success-color)' : 'var(--text-muted)' }}></i>
                {task.text}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
