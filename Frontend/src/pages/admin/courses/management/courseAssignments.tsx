import { ArrowDownWideNarrow, ArrowUpRight, Users, SquarePlus } from "lucide-react";
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

function CourseAssignments({ id }: any) {
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
      setAssignments(response);
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
      deadline: dueDate,
    });

    setTriggerRefresh(!triggerRefresh);
  };

  const handleRemoveAssignment = (assignmentId: any, b: boolean) => {
    console.log(assignmentId.course_id)
    
    if(b) {
      socket.emit("delete-course-material", { id: assignmentId.course_id });
    } else {
      if(window.confirm("Are you sure you want to delete this course material?")) {
        socket.emit("delete-course-material", { id: assignmentId.course_id });
      }
    }

    socket.once("delete-course-material-response", () => {
      setTriggerRefresh(!triggerRefresh);
    })
  };

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
                <Button size="sm" className="ml-auto gap-1">
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
                      if (a.weight !== 0 && b.weight === 0) return -1;
                      if (a.weight === 0 && b.weight !== 0) return 1;
                      return 0;
                    })
                    .map((assignment: any) => (
                      <TableRow
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setShowModal(true);
                        }}
                        onMouseEnter={() => setHoveredAssignment(assignment)}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Trash2 className={`text-red-500 h-4 cursor-pointer w-4 ${hoveredAssignment == assignment ? "": "hidden"}`} onClick={() => handleRemoveAssignment(assignment, assignment?.weight == 0 && assignment?.deadline == null)} />
                            <div className="font-medium">{assignment?.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="hidden text-sm text-muted-foreground md:inline">{assignment?.description}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">{parseInt(assignment?.weight) == 0 ? "" : assignment?.weight}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            <Badge variant={assignment?.weight == 0 && assignment?.deadline == null ? "default" : "secondary"}>
                              {assignment?.weight == 0 && assignment?.deadline == null ? "Course Material" : "Assignment"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">{assignment?.deadline == null ? "" : formatDistanceToNow(new Date(assignment?.deadline), { addSuffix: true })}</div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CourseAssignments;
