'use client';
import { useState } from 'react';
import styles from './GroupRoleMaster.module.css';

interface GroupRole {
  id: number;
  groupName: string;
  moduleName: string;
  roleName: string;
  selected: boolean;
}

export default function GroupRoleMaster() {
  const [entries, setEntries] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [groupRoles, setGroupRoles] = useState<GroupRole[]>([
    { id: 1, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Admin_Slcms', selected: false },
    { id: 2, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Warden_Role', selected: false },
    { id: 3, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Slcms_Faculty', selected: false },
    { id: 4, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Slcms_Deo_Role_Aiims', selected: false },
    { id: 5, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Student_Slcms', selected: false },
    { id: 6, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Sth_Role', selected: false },
    { id: 7, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Slcms_Deo_Itcell', selected: false },
    { id: 8, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Slcms_Deo_Role_Nursing', selected: false },
    { id: 9, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Slcms_Faculty_Hod', selected: false },
    { id: 10, groupName: 'Aiims_Slcms_Bbsr', moduleName: 'Slcms', roleName: 'Faculty_Incharge_Bch', selected: false },
  ]);

  const toggleSelectAll = (checked: boolean) => {
    setGroupRoles(groupRoles.map(role => ({ ...role, selected: checked })));
  };

  const toggleSelect = (id: number) => {
    setGroupRoles(groupRoles.map(role => 
      role.id === id ? { ...role, selected: !role.selected } : role
    ));
  };

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
                <input 
                  type="checkbox"
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
              <th>Group Name</th>
              <th>Module Name</th>
              <th>Role Name</th>
            </tr>
          </thead>
          <tbody>
            {groupRoles.map((role) => (
              <tr key={role.id}>
                <td>
                  <input 
                    type="checkbox"
                    checked={role.selected}
                    onChange={() => toggleSelect(role.id)}
                  />
                </td>
                <td>{role.groupName}</td>
                <td>{role.moduleName}</td>
                <td>{role.roleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tablePagination}>
        <div className={styles.paginationInfo}>
          Showing 1 to {entries} of {groupRoles.length} entries
        </div>
        <div className={styles.paginationControls}>
          <button disabled>Previous</button>
          <button className={styles.active}>1</button>
          <button>2</button>
          <button>Next</button>
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