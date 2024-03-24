import { ArrowDownWideNarrow, ArrowUpRight, Users, SquarePlus, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import socket from "@/socket";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditAssignment from "./EditAssignment";
import { Calendar as CalendarIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import AssignmentPopUp from "./AssignmentPopUp";
import { useAuth } from "@/context/AuthProvider";
import FuckYou from "./FuckYou";

function CourseAssignments({ id }: any) {
  const { userType } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState<Date>();
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [hoveredAssignment, setHoveredAssignment] = useState<any>(null);

  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    socket.emit("get-course-material", { id });

    socket.on("get-course-material-response", (response: any) => {
      if (userType == "student") {
        setAssignments(
          response.map((response: any) => {
            const weight = parseInt(response?.weight.split(" / ")[1]);
            const grade = response?.weight.split(" / ")[0];

            return { ...response, grade: grade == "-" ? null : parseInt(grade), type: weight == 0 ? "Course material" : "Assignment" };
          })
        );
      } else {
        setAssignments(
          response.map((response: any) => {
            return { ...response, weight: "-" + " / " + response?.weight, type: response?.weight == 0 ? "Course material" : "Assignment" };
          })
        );
      }

      console.log(assignments);
    });

    return () => {
      socket.off("get-course-material-response");
    };
  }, [triggerRefresh]);

  const handleAddAssignment = () => {
    socket.emit("add-course-material", {
      course_id: id,
      weight: weight,
      title: name,
      description: description,
      deadline: !date ? "" : date!.toString(),
    });

    setTriggerRefresh(!triggerRefresh);
  };

  const handleRemoveAssignment = (selectedAssignment: any, b: boolean) => {
    if (b) {
      socket.emit("delete-course-material", { id: selectedAssignment.id });
    } else {
      if (window.confirm("Are you sure you want to delete this course material?")) {
        socket.emit("delete-course-material", { id: selectedAssignment.id });
      }
    }

    socket.once("delete-course-material-response", () => {
      setTriggerRefresh(!triggerRefresh);
    });
  };
  const [showKhra, setShowKhra] = useState(false);

  const [selectedId, setId] = useState<number | null>(null);
  const [selectedcourseId, setCourse] = useState<number | null>(null);

  const [showPop, setShowPop] = useState(false);

  return (
    <>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Here are all the assignments</CardDescription>
            </div>

            <Sheet>
              <SheetTrigger className="ml-auto gap-1">
                <Button size="sm" className={`ml-auto gap-1 ${userType == "student" ? "hidden" : ""}`}>
                  Add assignment
                  <SquarePlus className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add a new assignment</SheetTitle>
                  <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                  <Input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick assignment due date</span>}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Input placeholder="Weight" onChange={(e) => setWeight(parseInt(e.target.value))} />
                  <Button onClick={handleAddAssignment}>Add</Button>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments &&
                  assignments
                    .sort((a: any, b: any) => {
                      if (a?.grade !== undefined && b?.grade === undefined) return -1;
                      if (a?.grade === undefined && b?.grade !== undefined) return 1;
                      return 0;
                    })
                    .map((assignment: any) => (
                      <TableRow
                        onClick={() => {
                          if (userType == "student") return;
                          setSelectedAssignment(assignment);
                          setShowModal(true);
                          setId(assignment.id);
                          setShowKhra(true);
                          setCourse(assignment.course_id);
                        }}
                        onMouseEnter={() => setHoveredAssignment(assignment)}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Trash2
                              className={`text-red-500 h-4 cursor-pointer w-4 ${hoveredAssignment == assignment ? "" : "hidden"} ${userType == "student" ? "hidden" : ""}`}
                              onClick={() => handleRemoveAssignment(assignment, assignment?.weight == 0 && assignment?.deadline == null)}
                            />
                            <Send
                              className={`h-4 cursor-pointer w-4 ${assignment?.grade || assignment?.submission ? "hidden" : assignment?.type == "Course material" ? "hidden" : ""} ${
                                hoveredAssignment == assignment ? "" : "hidden"
                              } ${userType !== "student" ? "hidden" : ""} ${assignment?.weight == 0 && assignment?.deadline == null && !assignment?.grade ? "hidden" : ""}`}
                              onClick={() => {
                                setShowPop(true);
                              }}
                            />
                            <div className="font-medium">{assignment?.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="hidden text-sm text-muted-foreground md:inline">{assignment?.description}</div>
                        </TableCell>
                        <TableCell className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <div
                            className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${
                              userType == "student" && assignment?.grade && assignment?.weight
                                ? (assignment?.grade / parseInt(assignment?.weight?.split(" / ")[1])) * 100 > 80
                                  ? "bg-green-600"
                                  : (assignment?.grade / parseInt(assignment?.weight?.split(" / ")[1])) * 100 > 50
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                                : assignment?.weight == 0 && assignment?.deadline == null
                                ? ""
                                : parseInt(assignment?.weight?.split(" / ")[1])
                                ? "bg-gray-600"
                                : ""
                            }`}
                          >
                            {userType == "student" && assignment?.grade ? "" : ""}
                            {parseInt(assignment?.weight?.split(" / ")[1]) == 0 ? "" : assignment?.weight}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            <Badge variant={assignment?.weight == 0 && assignment?.deadline == null ? "default" : "secondary"}>{assignment?.type}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foregrou¢nd">
                            {assignment?.grade !== null && userType == "student"
                              ? "Graded"
                              : assignment?.submission
                              ? "Submitted"
                              : assignment?.deadline !== null
                              ? formatDistanceToNow(new Date(assignment?.deadline), { addSuffix: true })
                              : ""}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                {}
                {showKhra && <AssignmentPopUp isVisible={showKhra} onClose={() => setShowKhra(false)} id={selectedId} course_id={selectedcourseId}></AssignmentPopUp>}
                {showPop && <FuckYou isVisible={showPop} onClose={() => setShowPop(false)}></FuckYou>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CourseAssignments;
