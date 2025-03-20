'use client';
import { useState } from 'react';
import styles from './RoleMenuAuditLogReport.module.css';

interface MenuAuditLogEntry {
  menus: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
}

export default function RoleMenuAuditLogReport() {
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [entries, setEntries] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [auditLogs, setAuditLogs] = useState<MenuAuditLogEntry[]>([]);

  // Sample data - replace with your actual data
  const modules = ['Slcms'];
  const roles = ['Admin_Slcms'];

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setAuditLogs([]); // Clear logs when module changes
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    if (selectedModule && value) {
      // Simulate fetching data - replace with actual API call
      setAuditLogs([
        {
          menus: 'Add Time Table',
          effectiveFrom: '06-Aug-2024',
          effectiveTo: '12-Dec-2024',
          status: 'InActive'
        },
        {
          menus: 'Agency Details - Year Wise',
          effectiveFrom: '06-Aug-2024',
          effectiveTo: '',
          status: 'Active'
        },
        {
          menus: 'Alumni Fee Configuration Master',
          effectiveFrom: '06-Aug-2024',
          effectiveTo: '',
          status: 'Active'
        }
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Role Menu Audit Log Report</h2>
        <button className={styles.closeButton}>×</button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Module</label>
          <select
            value={selectedModule}
            onChange={(e) => handleModuleChange(e.target.value)}
            className={styles.select}
          >
            <option value="">* Select Value</option>
            {modules.map((module) => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Role</label>
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className={styles.select}
          >
            <option value="">* Select</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
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
              <th>Menus</th>
              <th>Effective From</th>
              <th>Effective To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.length > 0 ? (
              auditLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.menus}</td>
                  <td>{log.effectiveFrom}</td>
                  <td>{log.effectiveTo}</td>
                  <td className={log.status === 'Active' ? styles.activeStatus : styles.inactiveStatus}>
                    {log.status}
                  </td>
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