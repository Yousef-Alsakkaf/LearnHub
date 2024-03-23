import {
    MdOutlineMessage,
    MdOutlineLeaderboard,
    MdOutlineCompress,
    MdOutlineManageSearch,
    MdOutlineAnalytics,
    MdOutlineGrade,
    MdOutlineAnnouncement,
    MdOutlineLibraryBooks,
  } from "react-icons/md";
  import { SiStudyverse } from "react-icons/si";
  import { CiCalculator1 } from "react-icons/ci";
  export const SidebarInstructor = [
    {
      path: "/",
      icon: <SiStudyverse size={18} />,
      text: "Users Management",
      key: "users",
    },
    {
      path: "/",
      icon: <MdOutlineLibraryBooks size={18} />,
      text: "Library Management",
      key: "library",
    },
    {
      path: "/",
      icon: <CiCalculator1 size={20} />,
      text: "Course Management",
      key: "course",
    },
   
    {
      path: "/instructor/Leader",
      icon: <MdOutlineLeaderboard size={20} />,
      text: "LeaderBoard",
      key: "leaderboard",
    },
    {
      path: "/instructor/AnalyticsInstructor",
      icon: <MdOutlineAnalytics size={20} />,
      text: "Analytics",
      key: "analytics",
    },
   
    {
      path: "/",
      icon: <MdOutlineAnnouncement size={18} />,
      text: "Announcements",
      key: "announcement",
    },
    {
      path: "/instructor/to-do-list",
      icon: <MdOutlineManageSearch size={18} />,
      text: "To do list",
      key: "todo",
    },
  ];
  