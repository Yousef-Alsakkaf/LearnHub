import {
  MdOutlineMessage,
  MdOutlineLeaderboard,
  MdOutlineCompress,
  MdOutlineLibraryAdd,
  MdOutlineGrade,
  MdOutlineAnalytics,
} from "react-icons/md";
import { SiStudyverse } from "react-icons/si";
import { CiCalculator1 } from "react-icons/ci";

export const sidebarStudentItems = [
  {
    path: "/",
    icon: <SiStudyverse size={18} />,
    text: "Course List",
    key: "courses",
  },
  // {
  //   path: "/",
  //   icon: <CiCalculator1 size={20} />,
  //   text: "Assignment Management",
  //   key: "assignment",
  // },

  // {
  //   path: "/",
  //   icon: <MdOutlineCompress size={18} />,
  //   text: "Course Materials",
  //   key: "materials",
  // },
  // {
  //   path: "/",
  //   icon: <MdOutlineLeaderboard size={20} />,
  //   text: "My progress",
  //   key: "progress",
  // },
  {
    path: "/",
    icon: <MdOutlineLibraryAdd size={20} />,
    text: "Library",
    key: "library",
  },
  {
    path: "/admin/Analytics",
    icon: <MdOutlineAnalytics size={20} />,
    text: "Analytics",
    key: "analytics",
  },
  {
    path: "/",
    icon: <MdOutlineMessage size={18} />,
    text: "To do list",
    key: "todo",
  },
];
