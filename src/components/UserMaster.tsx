'use client';
import { useState } from 'react';
import styles from './UserMaster.module.css';

interface UserData {
  id: number;
  userId: string;
  seatAssociates: string;
  expiryDate: string;
  lockStatus: string;
  hospital: string;
}

export default function UserMaster() {
  const [data] = useState<UserData[]>([
    { id: 1, userId: '2002272143', seatAssociates: '2002272143', expiryDate: '31-Aug-2029', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 2, userId: '2002272461', seatAssociates: '2002272461', expiryDate: '31-Aug-2029', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 3, userId: '2002272860', seatAssociates: '2002272860', expiryDate: '31-Aug-2029', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 4, userId: '2002272950', seatAssociates: '2002272950', expiryDate: '31-Aug-2029', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 5, userId: '2002347979', seatAssociates: '2002347979', expiryDate: '31-Aug-2029', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 6, userId: '219170010001', seatAssociates: '219170010001', expiryDate: '31-Dec-2026', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 7, userId: '219170010002', seatAssociates: '219170010002', expiryDate: '31-Dec-2026', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 8, userId: '219170010004', seatAssociates: '219170010004', expiryDate: '31-Dec-2026', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 9, userId: '219170010005', seatAssociates: '219170010005', expiryDate: '31-Aug-2029', lockStatus: 'Locked', hospital: 'AIIMSBBSR' },
    { id: 10, userId: '219170010006', seatAssociates: '219170010006', expiryDate: '01-Jan-2027', lockStatus: 'Locked', hospital: 'AIIMSBBSR' }
  ]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const filteredData = data.filter(item =>
    Object.values(item).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / parseInt(entriesPerPage));
  const indexOfLastEntry = currentPage * parseInt(entriesPerPage);
  const indexOfFirstEntry = indexOfLastEntry - parseInt(entriesPerPage);
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2>User Master</h2>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableControls}>
          <div className={styles.showEntries}>
            Show 
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            entries
          </div>
          <div className={styles.statusFilter}>
            Status: 
            <select defaultValue="Active">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className={styles.search}>
            Search: 
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox"
                    checked={selectedItems.length === currentEntries.length && currentEntries.length > 0}
                    onChange={(e) => {
                      setSelectedItems(e.target.checked ? currentEntries.map(item => item.id) : []);
                    }}
                  />
                </th>
                <th>User Id ▼</th>
                <th>Seat Associates ▼</th>
                <th>Expiry Date ▼</th>
                <th>Lock Status ▼</th>
                <th>Hospital ▼</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        setSelectedItems(e.target.checked 
                          ? [...selectedItems, item.id]
                          : selectedItems.filter(id => id !== item.id)
                        );
                      }}
                    />
                  </td>
                  <td>{item.userId}</td>
                  <td>{item.seatAssociates}</td>
                  <td>{item.expiryDate}</td>
                  <td>{item.lockStatus}</td>
                  <td>{item.hospital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <div>
            Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className={styles.pagination}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? styles.active : ''}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.addBtn}><span>+</span> Add</button>
          <button className={styles.modifyBtn}><span>✎</span> Modify</button>
          <button className={styles.deleteBtn}><span>×</span> Delete</button>
          <button className={styles.viewBtn}><span>👁</span> View</button>
          <button className={styles.reportBtn}><span>📄</span> Report</button>
        </div>
      </div>
    </div>
  );
} 