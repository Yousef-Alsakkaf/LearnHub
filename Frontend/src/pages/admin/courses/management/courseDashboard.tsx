import { ArrowUpRight, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AuthProvider, useAuth } from "../../../../context/AuthProvider";
import React, { useEffect, useState } from "react";
import AnnoucementPopUp from "./AnnoucementPopUp";
import ViewAllStudents from "./viewAllStudents";
import socket from "@/socket";

type id = {
  id: number;
};
const CourseDashboard: React.FC<id> = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState(0);
  const [moduleName, setModuleName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleStudents, setModuleStudents] = useState([]);

  useEffect(() => {
    socket.emit("get-courses-info", { id });
    socket.emit("get-course-roaster", { id });

    socket.on("get-courses-info-response", (response: any) => {
      console.log(response[0]);
      setEnrolledStudents(response[0].no_of_enrolled);
      setModuleName(response[0].title);
      setModuleCode(response[0].course_code);
      setModuleDescription(response[0].description);
    });

    socket.on("get-course-roaster-response", (response: any) => {
      setModuleStudents(response.filter((student: any) => student.type === "student").slice(0, 5));
    })

    return () => {
      socket.off("get-courses-info-response");
      socket.off("get-course-roaster-response");
    };
  }, []);

  const tempAnnounce = {
    sender: "yousef",
    message: "nothing to write in here for now",
    email: "yousefmohammadalsakkaf",
    userType: "student",
    username: "yousef",
    attendance: 7,
    courses: 3,
  };

  return (
    <>
      <h1>
        <strong>
          {moduleCode}-{moduleName}
        </strong>
      </h1>
      <h2>{moduleDescription}</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrolled Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{enrolledStudents}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Students</CardTitle>
              <CardDescription>Recent students in this course</CardDescription>
            </div>

            <Sheet>
              <SheetTrigger className="ml-auto gap-1">
                <Button size="sm" className="ml-auto gap-1">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Course students</SheetTitle>
                  <SheetDescription>
                    {/* here i will render all students */}
                    <ViewAllStudents id={id} />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Students</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moduleStudents && moduleStudents.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="font-medium">{student.fName} {student.lName}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">{student.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                    </TableCell>
                  </TableRow>
                
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {/* here is the component for each message */}
            <div className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer" onClick={() => setShowModal(true)}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
              </div>
            </div>

            {/* here where we do call it */}
            <AnnoucementPopUp isVisible={showModal} onClose={() => setShowModal(false)} selectedAnnouncement={tempAnnounce} />
            <div className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer" onClick={() => setShowModal(true)}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer" onClick={() => setShowModal(true)}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer" onClick={() => setShowModal(true)}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">William Kim</p>
                <p className="text-sm text-muted-foreground">will@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer" onClick={() => setShowModal(true)}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CourseDashboard;
