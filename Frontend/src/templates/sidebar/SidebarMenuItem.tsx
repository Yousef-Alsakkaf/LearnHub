import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SidebarMenuItemProps {
  path: string;
  icon: ReactNode;
  activeLink: string;
  onClick: (link: string) => void;
  text: string;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  path,
  icon,
  activeLink,
  onClick,
  text,
}) => {
  return (
    <li className="menu-item">
      <Link
        to={path}
        className={`menu-link ${activeLink === path ? "active" : ""}`}
        onClick={() => onClick(path)}
      >
        <span className="menu-link-icon">{icon}</span>
        <span className="menu-link-text">{text}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
