import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/admin/BaseLayout";
import DashboardScreen from "../../screens/admin/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";

const Admin = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />}>
          <Route path="/admin" element={<DashboardScreen />} />
          <Route path="*" element={<PageNotFound />} />
          
        </Route>
      </Route>
    </>
  );
};
export default Admin;
