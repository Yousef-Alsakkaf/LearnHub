import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import socket from "@/socket";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  UID: string;
  accessToken: string;
  active: number;
  email: string;
  fName: string;
  id: number;
  lName: string;
  password: string;
  type: string;
  username: string;
}

interface LoginPageProps {
  changeState: React.Dispatch<React.SetStateAction<string>>;
}

function Login({ changeState }: LoginPageProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAuthentication = (e: any) => {
    e.preventDefault();
    console.log({
      username: formData.username,
      password: formData.password,
    });

    socket.emit("authenticate", {
      username: formData.username,
      password: formData.password,
    });

    socket.on("authenticate-response", (response: UserData) => {
      if (response.type === "student") {
        console.log("entered");
        navigate("/student/courses");
      } else if (response.type === "admin") {
        navigate("/admin");
      } else if (response.type === "instructor") {
        navigate("/instructor/courses");
      }

      localStorage.setItem("accessToken", response.accessToken);
    });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a onClick={() => changeState("forgot-password")} className="ml-auto inline-block text-sm underline cursor-pointer">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>
          <Button type="submit" onClick={handleAuthentication} className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a onClick={() => changeState("signup")} className="underline cursor-pointer">
            Apply for our university
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
