import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "@/socket";
import CourseDashboard from "./courseDashboard";
import CourseAssignments from "./courseAssignments";
import CourseRoster from "./CourseRoster";
import { useParams } from "react-router-dom";

export function CourseManagementDashboard() {
  const { courseName } = useParams<{ courseName: string }>();
  const [courseId, setCourseName] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("Dashboard");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="#" onClick={() => setSelectedTab("Dashboard")} className={`transition-colors hover:text-foreground ${selectedTab === "Dashboard" ? "text-foreground" : "text-muted-foreground"}`}>
            Dashboard
          </Link>
          <Link to="#" onClick={() => setSelectedTab("Roster")} className={`transition-colors hover:text-foreground ${selectedTab === "Roster" ? "text-foreground" : "text-muted-foreground"}`}>
            Roster
          </Link>
          <Link
            to="#"
            onClick={() => setSelectedTab("Assignments")}
            className={`transition-colors hover:text-foreground ${selectedTab === "Assignments" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Assignments
          </Link>
          <Link to="#" onClick={() => setSelectedTab("Settings")} className={`transition-colors hover:text-foreground ${selectedTab === "Settings" ? "text-foreground" : "text-muted-foreground"}`}>
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {selectedTab === "Dashboard" && <CourseDashboard id={parseInt(courseName!)} />}
        {selectedTab === "Assignments" && <CourseAssignments id={parseInt(courseName!)} />}
        {selectedTab == "Roster" && <CourseRoster id={parseInt(courseName!)} />}
      </main>
    </div>
  );
}
