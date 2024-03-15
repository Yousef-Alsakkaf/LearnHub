import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/admin/BaseLayout";
import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";
import Settings from "../../pages/admin/Settings";
import Leaderboard from "../../pages/admin/Leaderboard";
import TodoList from "../../pages/admin/TodoList";
import TasksYaman from "../../pages/admin/TasksYaman";

const Admin = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />} path="/admin">
          <Route path="/admin" element={<DashboardScreen />} />
          <Route path="/admin/settings" element={<Settings/>}></Route>
          <Route path="/admin/Leaderboard" element={<Leaderboard/>}></Route>
          <Route path="/admin/TasksYaman" element={<TasksYaman/>}></Route>
          <Route path="*" element={<PageNotFound />} />
          
        </Route>
      </Route>
    </>
  );
};
export default Admin;
