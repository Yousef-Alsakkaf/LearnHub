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
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";

function CourseAssignments({ id }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState<Date>();
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  useEffect(() => {
    socket.emit("get-course-material", { id });

    socket.on("get-course-material-response", (response: any) => {
      setAssignments(response);
    });

    return () => {
      socket.off("get-course-material-response");
    };
  }, []);

  const handleAddAssignment = () => {
    socket.emit("add-assignment", {
      course_id: id,
      weight: weight,
      title: name,
      deadline: dueDate,
    });
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

            <Button size="sm" className="ml-auto gap-1 bg-red-500 hover:bg-red-700">
              Remove assignment
              <SquarePlus className="h-4 w-4" />
            </Button>

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
                  <TableHead>Students</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments &&
                  assignments.map((assignment: any) => (
                    <TableRow
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowModal(true);
                      }}
                    >
                      <TableCell>
                        <div className="font-medium">{assignment?.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">{assignment?.description}</div>
                      </TableCell>
                      <TableCell>
                        {/* <div className="text-sm text-muted-foreground">2 days ago</div> */}
                        <div className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(assignment?.deadline), { addSuffix: true })}</div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <EditAssignment onClose={() => setShowModal(false)} isVisible={showModal}></EditAssignment>
      </div>
    </>
  );
}

export default CourseAssignments;
