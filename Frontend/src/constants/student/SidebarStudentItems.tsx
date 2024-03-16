import {
  MdOutlineMessage,
  MdOutlineLeaderboard,
  MdOutlineCompress,
  MdOutlineLibraryAdd,
  MdOutlineGrade,
} from "react-icons/md";
import { SiStudyverse } from "react-icons/si";
import { CiCalculator1 } from "react-icons/ci";

export const sidebarStudentItems = [
  {
    path: "/",
    icon: <SiStudyverse size={18} />,
    text: "Course Enrollment",
    key: "course",
  },
  {
    path: "/",
    icon: <CiCalculator1 size={20} />,
    text: "Assignment Management",
    key: "assignment",
  },
  {
    path: "/",
    icon: <MdOutlineGrade size={20} />,
    text: "Gradebook",
    key: "grade",
  },
  {
    path: "/",
    icon: <MdOutlineCompress size={18} />,
    text: "Course Materials",
    key: "materials",
  },
  {
    path: "/",
    icon: <MdOutlineLeaderboard size={20} />,
    text: "My progress",
    key: "progress",
  },
  {
    path: "/",
    icon: <MdOutlineLibraryAdd size={20} />,
    text: "Library",
    key: "library",
  },
  {
    path: "/",
    icon: <MdOutlineMessage size={18} />,
    text: "To do list",
    key: "todo",
  },
];
