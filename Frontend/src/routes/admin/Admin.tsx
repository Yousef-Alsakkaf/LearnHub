import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/admin/BaseLayout";
import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";

import Leaderboard from "../../pages/admin/Leaderboard";
import ToDoList from "../../pages/admin/ToDoList";

const Admin = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />} path="/admin">
          <Route path="/admin" element={<DashboardScreen />} />
          <Route path="/admin/settings" element={<Settings/>}></Route>
          <Route path="/admin/Leaderboard" element={<Leaderboard/>}></Route>
          <Route path="/admin/ToDoList" element={<ToDoList/>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </>
  );
};
export default Admin;
