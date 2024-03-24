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
import {JaaSMeeting} from "@jitsi/react-sdk";


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
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

  useEffect(() => {
    socket.emit("get-courses-info", { id });
    socket.emit("get-course-roaster", { id });
    socket.emit("get-announcements", { course_id: id });

    socket.on("get-courses-info-response", (response: any) => {
      setModuleName(response[0].title);
      setModuleCode(response[0].course_code);
      setModuleDescription(response[0].description);
    });

    socket.on("get-course-roaster-response", (response: any) => {
      setEnrolledStudents(response.filter((student: any) => student.type === "student").length);
      setModuleStudents(response.filter((student: any) => student.type === "student").slice(0, 5));
    });

    socket.on("get-announcements-response", (response: any) => {
      setAnnouncements(response);
    });

    return () => {
      socket.off("get-courses-info-response");
      socket.off("get-course-roaster-response");
      socket.off("get-announcements-response");
    };
  }, []);

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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Meeting</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Button size="sm" className="ml-auto gap-1">
                  JOIN
                  <ArrowUpRight className="h-4 w-4" />
                </Button></div>
          </CardContent>
        </Card>
      </div>

      {/* <JaaSMeeting
    appId = { "vpaas-magic-cookie-c5fe3f41ced041b2a410174bffd4a537" }
    roomName = moduleName
    jwt = { YOUR_VALID_JWT }
    configOverwrite = {{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5
    }}
    interfaceConfigOverwrite = {{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4
    }}
    spinner = { SpinnerView }
    onApiReady = { (externalApi) => { ... } }
/> */}

      

      

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
                </TableRow>
              </TableHeader>
              <TableBody>
                {moduleStudents &&
                  moduleStudents.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="font-medium">
                          {student.fName} {student.lName}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">{student.email}</div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-8">
            {announcements &&
              announcements.map((announcement: any) => (
                <div
                  className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer p-2 rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  onClick={() => {
                    setSelectedAnnouncement(announcement)
                    setShowModal(true)
                  }}
                >
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={announcement?.image} alt="Avatar" />
                    <AvatarFallback>{announcement?.name}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{announcement?.name}</p>
                    <p className="text-sm text-muted-foreground">{announcement?.subject}</p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <AnnoucementPopUp isVisible={showModal} onClose={() => setShowModal(false)} selectedAnnouncement={selectedAnnouncement} />
      </div>
    </>
  );
};

export default CourseDashboard;
