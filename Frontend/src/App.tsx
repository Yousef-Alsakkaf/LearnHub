import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import Admin from "./routes/admin/Admin";
import "./styles/App.scss";
import "./styles/Sidebar.scss";
import "./styles/AreaTob.scss";
import "./index.css";
import "./App.scss";
import Global from "./routes/global/Global";
import { Outlet, Route } from "react-router-dom";
import Student from "./routes/student/Student";
import Instructor from "./routes/Instructor/Instructor";
import { AuthProvider } from "./context/AuthProvider";
import socket from "./socket";
import { NotificationProvider } from "./context/NotificationProvider";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import BaseLayout from "./layout/admin/BaseLayout";
import InstructorBaseLayout from "./layout/instructor/BaseLayout";
import StudentBaseLayout from "./layout/student/BasyLayout";
import Leaderboard from "./pages/admin/Leaderboard/Leaderboard";
import TasksYaman from "./pages/admin/ToDoList/TasksYaman";
import ViewAllCourses from "./pages/admin/courses/ViewAllCourses";
import { CourseManagementDashboard } from "./pages/admin/courses/management/courseManagement";
import AnalyticsInstructor from "./pages/instructor/Analytics/CharBar";
import DashboardScreen from "./screens/admin/Dashboard/DashboardScreen";
import AddItems from "./pages/admin/Library/AddItems";
import ViewItems from "./pages/admin/Library/ViewItems";
import MainAdmin from "./pages/admin/Main/MainAdmin";
import Analytics from "./pages/admin/analytics/CharBar";
import AddCourse from "./pages/admin/courses/AddCourse";
import CourseVideoCall from "./pages/admin/courses/management/courseVideoCall";
import Account from "./pages/admin/settings/Account";
import AddUsers from "./pages/admin/users/AddUsers";
import AllUsers from "./pages/admin/users/ViewAllUsers";
import PageNotFound from "./screens/error/PageNotFound";
import ViewBooks from "./pages/student/Library/ViewBooks";
import StudentAnalytics from "./pages/student/analytics/Analytics";
import AccountStudent from "./pages/student/settings/AccountStudent";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server!");
      setIsConnected(true);
    });

    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  if (!isConnected) {
    return <div></div>;
  }

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <SidebarProvider>
            <NotificationProvider />
            <AuthProvider>
              <Routes>
                {Global()}
                <Route element={<Outlet />}>
                  <Route element={<StudentBaseLayout />}>
                    <Route path="/student" element={<DashboardScreen />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/student/courses" element={<ViewAllCourses></ViewAllCourses>}></Route>

                    <Route path="/student/settings" element={<AccountStudent />}></Route>
                    <Route path="/student/courseManagement/:courseName" element={<CourseManagementDashboard />} />

                    <Route path="/student/StudentAnalytics" element={<StudentAnalytics />}></Route>
                    <Route path="/student/Library" element={<ViewBooks />}></Route>
                    <Route path="/logout" element={<LogOut />}></Route>
                  </Route>
                </Route>
                
                <Route element={<Outlet />}>
                  <Route path="/logout" element={<LogOut />}></Route>
                  <Route element={<BaseLayout />} path="/admin">
                    {/* <Route path="/admin" element={<DashboardScreen />} /> */}
                    <Route path="/admin" element={<MainAdmin></MainAdmin>}></Route>
                    <Route path="/admin/users" element={<AllUsers />}></Route>
                    <Route path="/admin/AddUsers" element={<AddUsers />}></Route>

                    <Route path="/admin/ViewItems" element={<ViewItems />}></Route>
                    <Route path="/admin/AddItems" element={<AddItems />}></Route>

                    <Route path="/admin/courses" element={<ViewAllCourses></ViewAllCourses>}></Route>
                    <Route path="/admin/addCourse" element={<AddCourse />}></Route>

                    <Route path="/admin/settings" element={<Account></Account>}></Route>
                    <Route path="/admin/Leaderboard" element={<Leaderboard />}></Route>
                    <Route path="/admin/TasksYaman" element={<TasksYaman />}></Route>

                    <Route path="/admin/Analytics" element={<Analytics />}></Route>
                    <Route path="/admin/courseManagement/:courseName" element={<CourseManagementDashboard />} />
                    <Route path="/admin/videocall" element={<CourseVideoCall />}></Route>

                    {/* <Route path="/admin/courseDetails" element={<CourseDetails courses={null}/>}></Route> */}
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Route>

                <Route element={<Outlet />}>
                  <Route element={<InstructorBaseLayout />} path="/instructor">
                    <Route path="/instructor" element={<DashboardScreen />} />
                    <Route path="/instructor/to-do-list" element={<TasksYaman />} />
                    <Route path="/instructor/Leader" element={<Leaderboard />}></Route>
                    <Route path="/instructor/AnalyticsInstructor" element={<AnalyticsInstructor />}></Route>
                    <Route path="/instructor/courses" element={<ViewAllCourses></ViewAllCourses>}></Route>
                    <Route path="/instructor/courseManagement/:courseName" element={<CourseManagementDashboard />} />
                    {/* <Route path="/student/Libraryinstructor" element={<ViewBooks />}></Route> */}
                  </Route>
                  <Route path="/logout" element={<LogOut />}></Route>
                </Route>
              </Routes>
            </AuthProvider>
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
