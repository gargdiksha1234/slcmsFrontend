'use client';
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';

// Dynamic imports for all components
const GroupMaster = dynamic(() => import('@/components/GroupMaster'), { ssr: false });
const SeatMaster = dynamic(() => import('@/components/SeatMaster'), { ssr: false });
const UserMaster = dynamic(() => import('@/components/UserMaster'), { ssr: false });
const ChangeUserPassword = dynamic(() => import('@/components/ChangeUserPassword'), { ssr: false });
const RoleMaster = dynamic(() => import('@/components/RoleMaster'), { ssr: false });
const GroupRoleMaster = dynamic(() => import('@/components/GroupRoleMaster'), { ssr: false });
const UserLogReport = dynamic(() => import('@/components/UserLogReport'), { ssr: false });
const SeatRoleAuditLogReport = dynamic(() => import('@/components/SeatRoleAuditLogReport'), { ssr: false });
const RoleMenuAuditLogReport = dynamic(() => import('@/components/RoleMenuAuditLogReport'), { ssr: false });

export default function Home() {
  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  console.log('Rendering with currentPage:', currentPage);

  return (
    <div className={styles.layout}>
      {/* Header/Navbar */}
      <header className={styles.header}>
        {/* Hamburger menu button moved to header */}
        <button 
          className={styles.menuButton}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <div className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <h1 className={styles.siteTitle}>AIIMS Bhubaneswar</h1>
      </header>

      {/* Main content wrapper */}
      <div className={styles.contentWrapper}>
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onPageSelect={(page) => {
            console.log('Setting current page to:', page);
            setCurrentPage(page);
          }}
        />

        <main className={`${styles.mainContent} ${isSidebarOpen ? styles.shifted : ''}`}>
          <Suspense fallback={<div>Loading...</div>}>
            {currentPage === 'group-master' && <GroupMaster />}
            {currentPage === 'seat-master' && <SeatMaster />}
            {currentPage === 'user-master' && <UserMaster />}
            {currentPage === 'change-user-password' && <ChangeUserPassword />}
            {currentPage === 'role-master' && <RoleMaster />}
            {currentPage === 'group-role-master' && <GroupRoleMaster />}
            {currentPage === 'user-log-report' && <UserLogReport />}
            {currentPage === 'seat-role-audit-log-report' && <SeatRoleAuditLogReport />}
            {currentPage === 'role-menu-audit-log-report' && <RoleMenuAuditLogReport />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
