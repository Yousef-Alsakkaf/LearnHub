import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../../constants/themeConstants";
import LogoBlue from "../../../../assets/images/logo_blue.png";
import LogoWhite from "../../../../assets/images/logo_white.png";
import { MdOutlineClose } from "react-icons/md";

import "../../../../styles/Sidebar.scss";
import { SidebarContext } from "../../../../context/SidebarContext";
import { sidebarStudentItems } from "../../../../constants/student/SidebarStudentItems";
import SidebarMenuItem from "../../../../templates/sidebar/SidebarMenuItem";
import { studentMenuItems } from "../../../../constants/student/StudentMenuItems";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [activeLink, setActiveLink] = useState("");
  const navbarRef = useRef<HTMLDivElement>(null);
  const handleActiveLink = (link: string) => {
    setActiveLink(link);
  };

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
          <img
            src={theme === LIGHT_THEME ? LogoBlue : LogoWhite}
            alt=""
            style={{ width: "2rem" }}
          />
          <span className="sidebar-brand-text">LearnHub</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            {sidebarStudentItems.map((item) => (
              <SidebarMenuItem
                key={item.key}
                path={item.path}
                icon={item.icon}
                activeLink={activeLink}
                onClick={handleActiveLink}
                text={item.text}
              />
            ))}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
          {studentMenuItems.map((item) => (
              <SidebarMenuItem
                key={item.key}
                path={item.path}
                icon={item.icon}
                activeLink={activeLink}
                onClick={handleActiveLink}
                text={item.text}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
