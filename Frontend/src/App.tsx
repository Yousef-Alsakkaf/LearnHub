import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import BaseLayout from "./layout/BaseLayout";
import LoginPage from "./pages/Authentication/Login";
import SignupPage from "./pages/Authentication/Signup";
import Admin from "./routes/admin/Admin";
import DashboardScreen from "./screens/Dashboard/DashboardScreen";
import PageNotFound from "./screens/error/PageNotFound";
import "./styles/App.scss";
import "./styles/Sidebar.scss";
import "./styles/AreaTob.scss";
import "./index.css";
import "./App.scss";
import Global from "./routes/global/Global";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {Global()}
          {Admin()}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
