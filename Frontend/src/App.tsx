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
import socket from "./socket";
import { NotificationProvider } from "./context/NotificationProvider";
import { useState, useEffect } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server!");
      setIsConnected(true);
    });

    socket.on("disconnect", () => setIsConnected(false));

    // Clean up the event listeners when the component is unmounted
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  if (!isConnected) {
    return <div></div>;
  }

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <SidebarProvider>
            <NotificationProvider />
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
