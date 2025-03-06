'use client';
import { useState } from 'react';
import styles from './SeatRoleAuditLogReport.module.css';

interface AuditLogEntry {
  roles: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
}

export default function SeatRoleAuditLogReport() {
  console.log('SeatRoleAuditLogReport component mounted');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [entries, setEntries] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Sample data - replace with your actual data
  const groups = ['Aiims_Slcms_Bbsr'];
  const seats = ['2002272143'];

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
    setAuditLogs([]); // Clear logs when group changes
  };

  const handleSeatChange = (value: string) => {
    setSelectedSeat(value);
    if (selectedGroup && value) {
      // Simulate fetching data - replace with actual API call
      setAuditLogs([
        {
          roles: 'Warden_role',
          effectiveFrom: '09-Dec-2024',
          effectiveTo: '',
          status: 'Active'
        }
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Seat Role Audit Log Report</h2>
        <button className={styles.closeButton}>×</button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Group</label>
          <select
            value={selectedGroup}
            onChange={(e) => handleGroupChange(e.target.value)}
            className={styles.select}
          >
            <option value="">* Select Value</option>
            {groups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Seat</label>
          <select
            value={selectedSeat}
            onChange={(e) => handleSeatChange(e.target.value)}
            className={styles.select}
          >
            <option value="">* Select Value</option>
            {seats.map((seat) => (
              <option key={seat} value={seat}>{seat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.entriesControl}>
          Show 
          <select 
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          entries
        </div>
        <div className={styles.searchControl}>
          Search: 
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Roles</th>
              <th>Effective From</th>
              <th>Effective To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.length > 0 ? (
              auditLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.roles}</td>
                  <td>{log.effectiveFrom}</td>
                  <td>{log.effectiveTo}</td>
                  <td>{log.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.noData}>
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div>
          Showing {auditLogs.length ? '1' : '0'} to {auditLogs.length} of {auditLogs.length} entries
        </div>
        <div className={styles.paginationButtons}>
          <button disabled={true}>Previous</button>
          <button className={styles.active}>1</button>
          <button disabled={true}>Next</button>
        </div>
      </div>
    </div>
  );
}