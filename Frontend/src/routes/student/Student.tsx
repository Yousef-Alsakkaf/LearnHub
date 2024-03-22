import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/student/BasyLayout";
import DashboardScreen from "../../screens/student/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";
import AccountStudent from "../../pages/student/settings/AccountStudent";

const Student = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />}>
          <Route path="/student" element={<DashboardScreen />} />
          <Route path="*" element={<PageNotFound />} />
          
          <Route path="/student/settings" element={<AccountStudent/>}></Route>
        </Route>
      </Route>
    </>
  );
};
export default Student;
