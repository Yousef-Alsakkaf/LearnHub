import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../../constants/themeConstants";
import LogoBlue from "../../../../assets/images/logo_blue.png"
import LogoWhite from "../../../../assets/images/logo_white.png";
import {
  MdOutlineClose,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlineLeaderboard,
  MdOutlineCompress,
  MdOutlineManageSearch,
  MdOutlineManageAccounts,
  MdOutlineAnalytics,
  MdOutlineGrade,
  MdOutlineAnnouncement
} from "react-icons/md";
import {SiStudyverse} from 'react-icons/si'
import {CiCalculator1} from 'react-icons/ci'

import { Link } from "react-router-dom";
import "../../../../styles/Sidebar.scss";
import { SidebarContext } from "../../../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [activeLink, setActiveLink] = useState("");

  const handleActiveLink = (link: string) =>{
    setActiveLink(link);
  }

  
  const handleClickOutside = (event: any) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn" // I am mistaken here
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" style={{'width': '2rem'}}/>
          <span className="sidebar-brand-text">LearnHub</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`} onClick={() => handleActiveLink('users')}>
                <span className="menu-link-icon">
                  <SiStudyverse size={18} />
                </span>
                <span className="menu-link-text">Users Management</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'course' ? 'active' : ''}`} onClick={() => handleActiveLink('course')}>
                <span className="menu-link-icon">
                  <CiCalculator1 size={20} />
                </span>
                <span className="menu-link-text">Course Management</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'grade' ? 'active' : ''}`} onClick={() => handleActiveLink('grade')}>
                <span className="menu-link-icon">
                <MdOutlineGrade size={18} />
                </span>
                <span className="menu-link-text">Gradebook Management</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'attendance' ? 'active' : ''}`} onClick={() => handleActiveLink('attendance')}>
                <span className="menu-link-icon">
                  <MdOutlineCompress size={18} />
                </span>
                <span className="menu-link-text">Attendance Tracking</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'progress' ? 'active' : ''}`} onClick={() => handleActiveLink('progress')}>
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">Progress Tracking</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/Leaderboard" className={`menu-link ${activeLink === 'leader' ? 'active' : ''}`} onClick={() => handleActiveLink('leader')}>
                <span className="menu-link-icon">
                  <MdOutlineLeaderboard size={20} />
                </span>
                <span className="menu-link-text">Leaderboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'ana' ? 'active' : ''}`} onClick={() => handleActiveLink('ana')}>
                <span className="menu-link-icon">
                  <MdOutlineAnalytics size={20} />
                </span>
                <span className="menu-link-text">Analytics</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'system' ? 'active' : ''}`} onClick={() => handleActiveLink('system')}>
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">System Maintenance</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/ToDoList" className={`menu-link ${activeLink === 'todo' ? 'active' : ''}`} onClick={() => handleActiveLink('todo')}>
                <span className="menu-link-icon">
                  <MdOutlineManageSearch size={18} />
                </span>
                <span className="menu-link-text">To do list</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'announce' ? 'active' : ''}`} onClick={() => handleActiveLink('announce')}>
                <span className="menu-link-icon">
                  <MdOutlineAnnouncement size={18} />
                </span>
                <span className="menu-link-text">Announcements</span>
              </Link>
            </li>
            
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin/settings" className={`menu-link ${activeLink === 'settings' ? 'active' : ''}`} onClick={() => handleActiveLink('settings')}>
                <span className="menu-link-icon">
                  <MdOutlineManageAccounts size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'logout' ? 'active' : ''}`} onClick={() => handleActiveLink('logout')}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;