import { Outlet, Route } from "react-router-dom";


import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";
import BaseLayout from "../../layout/instructor/BaseLayout";

const Admin = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />} path="/instructor">
          <Route path="/instructor" element={<DashboardScreen />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </>
  );
};
export default Admin;
