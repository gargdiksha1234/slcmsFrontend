'use client';
import { useState, useEffect } from 'react';
import styles from './ChangeUserPassword.module.css';

export default function ChangeUserPassword() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'error'
  });

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate empty fields
    if (!formData.oldPassword) {
      setAlert({ show: true, message: 'Old password is required!', type: 'error' });
      return;
    }
    if (!formData.newPassword) {
      setAlert({ show: true, message: 'New password is required!', type: 'error' });
      return;
    }
    if (!formData.confirmPassword) {
      setAlert({ show: true, message: 'Confirm password is required!', type: 'error' });
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setAlert({ show: true, message: 'Passwords do not match!', type: 'error' });
      return;
    }

    // If validation passes, proceed with form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.container}>
      {alert.show && (
        <div className={`${styles.alert} ${styles[alert.type]}`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ ...alert, show: false })}>×</button>
        </div>
      )}

      <div className={styles.titleSection}>
        <h2>Change User Password</h2>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Old Password <span className={styles.required}>*</span></label>
            <input
              type="password"
              value={formData.oldPassword}
              onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>New Password <span className={styles.required}>*</span></label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password <span className={styles.required}>*</span></label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
} 