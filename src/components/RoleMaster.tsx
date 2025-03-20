'use client';
import { useState } from 'react';
import styles from './RoleMaster.module.css';

interface Role {
  id: number;
  roleName: string;
  moduleName: string;
}

export default function RoleMaster() {
  const [entries, setEntries] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Sample data - you can replace this with your actual data fetching logic
  const roles: Role[] = [
    { id: 1, roleName: 'Admin_Slcms', moduleName: 'Slcms' },
    { id: 2, roleName: 'Faculty_Incharge_Ant', moduleName: 'Slcms' },
    { id: 3, roleName: 'Faculty_Incharge_Bch', moduleName: 'Slcms' },
  ];

  return (
    <div className={styles.container}>
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
              <th>
                <input type="checkbox" />
              </th>
              <th>Role Name</th>
              <th>Module Name</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{role.roleName}</td>
                <td>{role.moduleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tablePagination}>
        <div className={styles.paginationInfo}>
          Showing 1 to {roles.length} of {roles.length} entries
        </div>
        <div className={styles.paginationControls}>
          <button disabled>Previous</button>
          <button className={styles.active}>1</button>
          <button disabled>Next</button>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.addButton}>
          <span>+</span> Add
        </button>
        <button className={styles.modifyButton}>
          <span>✎</span> Modify
        </button>
        <button className={styles.viewButton}>
          <span>👁</span> View
        </button>
        <button className={styles.reportButton}>
          <span>📄</span> Report
        </button>
      </div>
    </div>
  );
}