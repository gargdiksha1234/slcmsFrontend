'use client';
import { useState } from 'react';
import styles from './SeatMaster.module.css';

interface SeatData {
  id: number;
  seatName: string;
  groupAssociated: string;
  effectiveDate: string;
}

export default function SeatMaster() {
  const [data] = useState<SeatData[]>([
    { id: 1, seatName: '2002272143', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '09-Dec-2024' },
    { id: 2, seatName: '2002272461', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '09-Dec-2024' },
    { id: 3, seatName: '2002272860', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '09-Dec-2024' },
    { id: 4, seatName: '2002272950', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '09-Dec-2024' },
    { id: 5, seatName: '2002347979', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '09-Dec-2024' },
    { id: 6, seatName: '219170010001', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '06-Dec-2024' },
    { id: 7, seatName: '219170010002', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '06-Dec-2024' },
    { id: 8, seatName: '219170010004', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '06-Dec-2024' },
    { id: 9, seatName: '219170010005', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '06-Dec-2024' },
    { id: 10, seatName: '219170010006', groupAssociated: 'Aiims_Slcms_Bbsr', effectiveDate: '06-Dec-2024' }
  ]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const filteredData = data.filter(item =>
    item.seatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.groupAssociated.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / parseInt(entriesPerPage));
  const indexOfLastEntry = currentPage * parseInt(entriesPerPage);
  const indexOfFirstEntry = indexOfLastEntry - parseInt(entriesPerPage);
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2>Seat Master</h2>
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
                <th>Seat Name ▼</th>
                <th>Group Associated ▼</th>
                <th>Effective Date ▼</th>
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
                  <td>{item.seatName}</td>
                  <td>{item.groupAssociated}</td>
                  <td>{item.effectiveDate}</td>
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
          <button className={styles.viewBtn}><span>👁</span> View</button>
          <button className={styles.reportBtn}><span>📄</span> Report</button>
        </div>
      </div>
    </div>
  );
} 