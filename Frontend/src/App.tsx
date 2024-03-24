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
import Leaderboard from "./pages/admin/Leaderboard/Leaderboard";
import TasksYaman from "./pages/admin/ToDoList/TasksYaman";
import ViewAllCourses from "./pages/admin/courses/ViewAllCourses";
import { CourseManagementDashboard } from "./pages/admin/courses/management/courseManagement";
import AnalyticsInstructor from "./pages/instructor/Analytics/CharBar";
import DashboardScreen from "./screens/admin/Dashboard/DashboardScreen";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server!");
      setIsConnected(true);
    });

    socket.on("disconnect", () => setIsConnected(false));

    // Clean up the event listeners when the component is unmounted
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
                {Student()}
                {Admin()}
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
              </Routes>
            </AuthProvider>
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
