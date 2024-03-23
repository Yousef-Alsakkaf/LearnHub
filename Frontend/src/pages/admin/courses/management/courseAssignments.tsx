import { ArrowDownWideNarrow, ArrowUpRight, Users, SquarePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
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

function CourseAssignments({ courseName }: any) {
  useEffect(() => {
    socket.emit("get-course-assignments", { courseName: courseName });

    socket.on("get-course-assignments-response", (response: any) => {
      console.log(response);
    });

    return () => {
      socket.off("get-course-assignments-response");
    };
  }, []);

  const handleAddAssignment = () => {
    socket.emit("add-assignment", { courseName: courseName });
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
                  <Input placeholder="Name" />
                  <Input placeholder="Description" />
                  <Input placeholder="Due date" />
                  <Input placeholder="Weight" />
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
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">2 days ago</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CourseAssignments;
