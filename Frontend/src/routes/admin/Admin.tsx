import { ThemeContext, ThemeProvider } from "../../context/ThemeContext";
import { useContext, useEffect } from "react";
import { Outlet, Route } from "react-router-dom";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";
import MoonIcon from "../../assets/icons/moon.svg";
import SunIcon from "../../assets/icons/sun.svg";
import { SidebarProvider } from "../../context/SidebarContext";
import BaseLayout from "../../layout/BaseLayout";
import DashboardScreen from "../../screens/Dashboard/DashboardScreen";
import PageNotFound from "../../screens/error/PageNotFound";

const Admin = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(theme);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <ThemeProvider>
        <SidebarProvider>
          <Route element={<Outlet />}>
            <Route element={<BaseLayout />}>
              <Route path="/admin" element={<DashboardScreen />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
};
export default Admin;
