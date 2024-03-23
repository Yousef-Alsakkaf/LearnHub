import { MdOutlineLogout, MdOutlineManageAccounts } from "react-icons/md";

export const SidebarSettingsItems = [
  {
    path: "/admin/settings",
    icon: <MdOutlineManageAccounts size={20} />,
    text: "Settings",
    key: "settings",
  },
  {
    path: "/logout",
    icon: <MdOutlineLogout size={20} />,
    text: "Logout",
    key: "logout", 
  },
];
