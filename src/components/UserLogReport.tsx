'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './UserLogReport.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function UserLogReport() {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  
  const fromCalendarRef = useRef<HTMLDivElement>(null);
  const toCalendarRef = useRef<HTMLDivElement>(null);

  // Sample user data - replace with your actual user data
  const users = [
    { id: 'USER001', name: 'USER001' },
    { id: 'USER002', name: 'USER002' },
    { id: 'USER003', name: 'USER003' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromCalendarRef.current && !fromCalendarRef.current.contains(event.target as Node)) {
        setShowFromCalendar(false);
      }
      if (toCalendarRef.current && !toCalendarRef.current.contains(event.target as Node)) {
        setShowToCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (!selectedUser) {
      alert('Please select a user');
      return;
    }
    console.log({ selectedUser, fromDate, toDate });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>User Log Report</h2>
        <button className={styles.closeButton}>×</button>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label>User Name</label>
          <div className={styles.selectWrapper}>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Value</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>From Date</label>
          <div className={styles.datePickerWrapper}>
            <input
              type="text"
              value={formatDate(fromDate)}
              readOnly
              className={styles.dateInput}
            />
            <button 
              className={styles.calendarButton}
              onClick={() => setShowFromCalendar(!showFromCalendar)}
            >
              📅
            </button>
            {showFromCalendar && (
              <div ref={fromCalendarRef} className={styles.calendarPopup}>
                <Calendar
                  onChange={(value) => {
                    if (value instanceof Date) {
                      setFromDate(value);
                    }
                  }}
                  value={fromDate}
                  className={styles.calendar}
                  tileClassName={({ date, view }) => 
                    view === 'month' && date.getTime() === fromDate.getTime() 
                      ? styles.calendarTileActive 
                      : date.getTime() === new Date().setHours(0,0,0,0) 
                        ? styles.calendarTileNow 
                        : ''
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>To Date</label>
          <div className={styles.datePickerWrapper}>
            <input
              type="text"
              value={formatDate(toDate)}
              readOnly
              className={styles.dateInput}
            />
            <button 
              className={styles.calendarButton}
              onClick={() => setShowToCalendar(!showToCalendar)}
            >
              📅
            </button>
            {showToCalendar && (
              <div ref={toCalendarRef} className={styles.calendarPopup}>
                <Calendar
                  onChange={(value) => {
                    if (value instanceof Date) {
                      setToDate(value);
                    }
                  }}
                  value={toDate}
                />
              </div>
            )}
          </div>
        </div>

        <button onClick={handleSubmit} className={styles.goButton}>
          Go <span>→</span>
        </button>
      </div>
    </div>
  );
}