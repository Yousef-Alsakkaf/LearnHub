import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import socket from "@/socket";
import { useEffect, useState } from "react";
import * as React from "react";

interface LoginPageProps {
  changeState: React.Dispatch<React.SetStateAction<string>>;
}

function SignUp({ changeState }: LoginPageProps) {
  const [selectionMajors, setSelectionMajors] = useState<{ name: string }[] | null>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [letter, setLetter] = useState("");

  useEffect(() => {
    socket.emit("get-all-majors");

    socket.on("get-all-majors-response", (majors: { name: string }[]) => {
      majors.map((major) => console.log(major.name));
      setSelectionMajors(majors);
    });

    return () => {
      socket.off("get-all-majors-response");
    };
  }, []);

  const signUp = (e: any) => {
    e.preventDefault();

    socket.emit("apply", {
      email,
      username,
      major: "major",
      fName,
      lName,
      letter,
    });

    setTimeout(() => {
      changeState("login");
    }, 500);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">Enter your details below to create a new account</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="learnhub@example.com" onChange={(e) => setEmail(e.target.value)} required />

            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />

            <Label htmlFor="fName">First Name</Label>
            <Input id="fName" type="text" placeholder="First Name" onChange={(e) => setFName(e.target.value)} required />

            <Label htmlFor="lName">Last Name</Label>
            <Input id="lName" type="text" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} required />

            <Label htmlFor="letter">Letter</Label>
            <Input id="letter" type="text" placeholder="Letter" onChange={(e) => setLetter(e.target.value)} required />
          </div>
          <Button type="submit" onClick={signUp} className="w-full">
            Sign up!
          </Button>

          <Button type="submit" onClick={() => changeState("login")} className="w-full">
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
