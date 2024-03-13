import { useContext, useEffect, useRef } from "react";
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
  MdOutlineLibraryAdd,
  MdOutlineGrade,
  MdOutlineSettings
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

  
  const handleClickOutside = (event: any) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn" // I am mistaken here, will be fixed here
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
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <SiStudyverse size={18} />
                </span>
                <span className="menu-link-text">Course Enrollment</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <CiCalculator1 size={20} />
                </span>
                <span className="menu-link-text">Assignment Management</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGrade size={20} />
                </span>
                <span className="menu-link-text">Gradebook</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineCompress size={18} />
                </span>
                <span className="menu-link-text">Course Materials</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLeaderboard size={20} />
                </span>
                <span className="menu-link-text">My progress</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLibraryAdd size={20} />
                </span>
                <span className="menu-link-text">Library</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">To do list</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
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