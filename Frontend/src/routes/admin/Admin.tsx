import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/admin/BaseLayout";
import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";

import Leaderboard from "../../pages/admin/Leaderboard/Leaderboard";
import TasksYaman from "../../pages/admin/ToDoList/TasksYaman";
import Account from "../../pages/admin/settings/Account";
import AllUsers from "../../pages/admin/users/ViewAllUsers";
import AddUsers from "../../pages/admin/users/AddUsers";

const Admin = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />} path="/admin">
          <Route path="/admin" element={<DashboardScreen />} />
          <Route path="/admin/users" element={<AllUsers />}></Route>
          <Route path="/admin/AddUsers" element={<AddUsers />}></Route>
          <Route path="/admin/settings" element={<Account></Account>}></Route>
          <Route path="/admin/Leaderboard" element={<Leaderboard />}></Route>
          <Route path="/admin/TasksYaman" element={<TasksYaman />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </>
  );
};
export default Admin;
