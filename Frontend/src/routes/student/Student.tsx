import { Outlet, Route } from "react-router-dom";

import BaseLayout from "../../layout/student/BasyLayout";
import DashboardScreen from "../../screens/student/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";
import AccountStudent from "../../pages/student/settings/AccountStudent";
import StudentAnalytics from "../../pages/student/analytics/Analytics";
import ViewBooks from "../../pages/student/Library/ViewBooks";

const Student = () => {
  return (
    <>
      <Route element={<Outlet />}>
        <Route element={<BaseLayout />}>
          <Route path="/student" element={<DashboardScreen />} />
          <Route path="*" element={<PageNotFound />} />
          
          <Route path="/student/settings" element={<AccountStudent/>}></Route>

          <Route path="/student/StudentAnalytics" element={<StudentAnalytics/>}></Route>
          <Route path="/student/Library" element={<ViewBooks/>}></Route>
        </Route>
      </Route>
    </>
  );
};
export default Student;
