import { MdOutlineLogout, MdOutlineManageAccounts } from "react-icons/md";

export const InstructorMenuItems = [
  {
    path: "/admin/settings",
    icon: <MdOutlineManageAccounts size={20} />,
    text: "Settings",
    key: "settings",
  },
  {
    path: "/",
    icon: <MdOutlineLogout size={20} />,
    text: "Logout",
    key: "logout",
  },
];
