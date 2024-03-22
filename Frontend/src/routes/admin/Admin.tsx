import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/admin/BaseLayout";
import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";

import Leaderboard from "../../pages/admin/Leaderboard/Leaderboard";
import TasksYaman from "../../pages/admin/ToDoList/TasksYaman";
import Account from "../../pages/admin/settings/Account";
import AllUsers from "../../pages/admin/users/ViewAllUsers";
import AddUsers from "../../pages/admin/users/AddUsers";
import ViewItems from "../../pages/admin/Library/ViewItems";
import AddItems from "../../pages/admin/Library/AddItems";
import ViewRequestedItems from "../../pages/admin/Library/ViewRequestedItems";
import ViewAllCourses from "../../pages/admin/courses/ViewAllCourses";
import AddCourse from "../../pages/admin/courses/AddCourse";

const Admin = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />} path="/admin">
          <Route path="/admin" element={<DashboardScreen />} />
          <Route path="/admin/users" element={<AllUsers />}></Route>
          <Route path="/admin/AddUsers" element={<AddUsers />}></Route>

          <Route path="/admin/ViewItems" element={<ViewItems/>}></Route>
          <Route path="/admin/AddItems" element={<AddItems/>}></Route>
          <Route path="/admin/ViewRequestedItems" element={<ViewRequestedItems/>}></Route>
          

          <Route path="/admin/courses" element={<ViewAllCourses></ViewAllCourses>}></Route>
          <Route path="/admin/addCourse" element={<AddCourse/>}></Route>

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
