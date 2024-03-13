import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/student/BasyLayout";
import DashboardScreen from "../../screens/student/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";

const Student = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />}>
          <Route path="/student" element={<DashboardScreen />} />
          <Route path="*" element={<PageNotFound />} />
          
        </Route>
      </Route>
    </>
  );
};
export default Student;
