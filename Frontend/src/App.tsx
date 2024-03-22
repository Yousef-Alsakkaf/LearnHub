import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import Admin from "./routes/admin/Admin";
import "./styles/App.scss";
import "./styles/Sidebar.scss";
import "./styles/AreaTob.scss";
import "./index.css";
import "./App.scss";
import Global from "./routes/global/Global";
import Student from "./routes/student/Student";
import Instructor from "./routes/Instructor/Instructor";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <SidebarProvider>
            <AuthProvider>
            <Routes>
              {Global()}
              {Student()}
              {Admin()}
              {Instructor()}
              
            </Routes>
            </AuthProvider>
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
