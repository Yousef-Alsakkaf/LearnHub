import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "@/socket";
import CourseDashboard from "./courseDashboard";
import CourseAssignments from "./courseAssignments";
import CourseRoster from "./CourseRoster";

export function CourseManagementDashboard({ location }: any) {
  const [courseName, setCourseName] = useState<string>(location?.state?.name);
  const [selectedTab, setSelectedTab] = useState<string>('Dashboard');

  useEffect(() => {
    socket.emit("getCourseDetails", { courseName: courseName });

    socket.on("getCourseDetails-response", (response: any) => {
      console.log(response);
    });

    return () => {
      socket.off("getCourseDetails-response");
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link 
            to="#" 
            onClick={() => setSelectedTab('Dashboard')} 
            className={`transition-colors hover:text-foreground ${selectedTab === 'Dashboard' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="#" 
            onClick={() => setSelectedTab('Roster')} 
            className={`transition-colors hover:text-foreground ${selectedTab === 'Roster' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Roster
          </Link>
          <Link 
            to="#" 
            onClick={() => setSelectedTab('Assignments')} 
            className={`transition-colors hover:text-foreground ${selectedTab === 'Assignments' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Assignments
          </Link>
          <Link 
            to="#" 
            onClick={() => setSelectedTab('Settings')} 
            className={`transition-colors hover:text-foreground ${selectedTab === 'Settings' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {selectedTab === 'Dashboard' && <CourseDashboard />}
        {selectedTab === 'Assignments' && <CourseAssignments />}
        {selectedTab == "Roster" && < CourseRoster/>}
      </main>
      
    </div>
  );
}
