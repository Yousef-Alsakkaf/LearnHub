import { Outlet, Route } from "react-router-dom";


import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";
import TasksYaman from "../../pages/admin/ToDoList/TasksYaman";
import BaseLayout from "../../layout/instructor/BaseLayout";
import Leaderboard from "../../pages/admin/Leaderboard/Leaderboard";
import AnalyticsInstructor from "../../pages/instructor/Analytics/CharBar";
import ViewBooks from '../../pages/instructor/Library/ViewBooks';
const Admin = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />} path="/instructor">
          <Route path="/instructor" element={<DashboardScreen />} />
          <Route path="/instructor/to-do-list" element={<TasksYaman />} />
          <Route path="/instructor/Leader" element={<Leaderboard />}></Route>
          <Route path="/instructor/AnalyticsInstructor" element={<AnalyticsInstructor/>}></Route>

          <Route path="/student/Libraryinstructor" element={<ViewBooks/>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </>
  );
};
export default Admin;
