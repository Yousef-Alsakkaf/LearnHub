import { Outlet, Route } from "react-router-dom";

import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";
import TasksYaman from "../../pages/admin/ToDoList/TasksYaman";
import BaseLayout from "../../layout/instructor/BaseLayout";
import Leaderboard from "../../pages/admin/Leaderboard/Leaderboard";
import AnalyticsInstructor from "../../pages/instructor/Analytics/CharBar";
import ViewBooks from "../../pages/instructor/Library/ViewBooks";
import { LogOut } from "lucide-react";
import { CourseManagementDashboard } from "@/pages/admin/courses/management/courseManagement";
import ViewAllCourses from "@/pages/admin/courses/ViewAllCourses";
import { useAuth } from "@/context/AuthProvider";

const Admin = () => {
  const { userType } = useAuth();

  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />} path="/instructor">
          <Route path="/instructor" element={<DashboardScreen />} />
          <Route path="/instructor/to-do-list" element={<TasksYaman />} />
          <Route path="/instructor/Leader" element={<Leaderboard />}></Route>
          <Route path="/instructor/AnalyticsInstructor" element={<AnalyticsInstructor />}></Route>
          <Route path="/instructor/courses" element={<ViewAllCourses ></ViewAllCourses>}></Route>
          <Route path="/instructor/courseManagement/:courseName" element={<CourseManagementDashboard />} />
          {/* <Route path="/student/Libraryinstructor" element={<ViewBooks />}></Route> */}
        </Route>
        <Route path="/logout" element={<LogOut />}></Route>
      </Route>
    </>
  );
};

export default Admin;
