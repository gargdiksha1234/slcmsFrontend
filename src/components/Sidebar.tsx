import { useState } from 'react';
import styles from './Sidebar.module.css';
import Link from 'next/link';

// Sidebar component with dropdown functionality
export default function Sidebar({ isOpen, onClose, onPageSelect }: { 
  isOpen: boolean; 
  onClose: () => void;
  onPageSelect: (page: string) => void;
}) {
  // State to track which dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Menu data structure
  const menuItems = [
    {
      title: "User Management",
      items: ["Group Master", "Seat Master", "User Master", "Reset User Password", "Change User Password"]
    },
    {
      title: "Role Management",
      items: ["Role Master", "Group Role Master", "Role Menu Master", "Seat Role Master", "Seat Permission Master"]
    },
    {
      title: "Log Management",
      items: [
        "User Profile",
        "User Log Report",
        "User Management Tree View",
        "Seat Role Audit Log Report",
        "Role Menu Audit Log Report",
        "User Audit Log Report",
        "Seat Permission Audit Log Report"
      ]
    },
    {
      title: "Setting",
      items: ["Hospital Master"]
    }
  ];

  const handleItemClick = (item: string) => {
    const pageName = item.toLowerCase().replace(/ /g, '-');
    onPageSelect(pageName);
  };

  return (
    <>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      
      {/* Main sidebar container */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {menuItems.map((menu, index) => (
          <div key={index} className={styles.menuItem}>
            <button 
              className={styles.menuTitle}
              onClick={() => setActiveDropdown(activeDropdown === menu.title ? null : menu.title)}
            >
              {menu.title}
              <span className={styles.arrow}>▼</span>
            </button>
            
            {/* Dropdown items */}
            <div className={`${styles.dropdown} ${activeDropdown === menu.title ? styles.active : ''}`}>
              {menu.items.map((item, idx) => (
                <Link 
                  key={idx} 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                  className={styles.dropdownItem}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
} 