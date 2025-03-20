'use client';
import { useState } from 'react';
import styles from './GroupMaster.module.css';

export default function GroupMaster() {
  const [data] = useState([
    { id: 1, groupName: 'Aiims_Slcms_Bbsr', effectiveDate: '05-Aug-2024' },
  ]);

  return (
    <div className={styles.container}>
      {/* Page Title */}
      <div className={styles.titleSection}>
        <h2>Group Master</h2>
      </div>

      {/* Table Section */}
      <div className={styles.tableContainer}>
        <div className={styles.tableControls}>
          <div className={styles.showEntries}>
            Show 
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            entries
          </div>
          <div className={styles.search}>
            Search: 
            <input type="text" />
          </div>
        </div>

        <table className={styles.table}>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col style={{ width: '60%' }} />
            <col style={{ width: '40%' }} />
          </colgroup>
          <thead>
            <tr>
              <th className={styles.checkboxHeader}><input type="checkbox" /></th>
              <th className={styles.groupNameHeader}>Group Name ▼</th>
              <th className={styles.dateHeader}>Effective Date ▼</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className={styles.checkboxCell}><input type="checkbox" /></td>
                <td className={styles.groupNameCell}>{item.groupName}</td>
                <td className={styles.dateCell}>{item.effectiveDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.tableFooter}>
          {/* <div>Showing 1 to 1 of 1 entries</div> */}
          <div className={styles.pagination}>
            <button disabled>Previous</button>
            <button className={styles.active}>1</button>
            <button disabled>Next</button>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.addBtn}><span>+</span> Add</button>
          <button className={styles.modifyBtn}><span>✎</span> Modify</button>
          <button className={styles.viewBtn}><span>👁</span> View</button>
          <button className={styles.reportBtn}><span>📄</span> Report</button>
        </div>
      </div>
    </div>
  );
} 