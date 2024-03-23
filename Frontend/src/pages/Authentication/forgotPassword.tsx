import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import socket from "@/socket";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  changeState: React.Dispatch<React.SetStateAction<string>>;
}

function ForgotPassword({ changeState }: LoginPageProps) {
  const [email, setEmail] = useState("");

  const forgotPassword = (e: any) => {
    e.preventDefault();

    socket.emit("forget-password", {
      email,
    });

    setTimeout(() => {
        changeState("login");
    }, 500);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Forgot password</h1>
          <p className="text-balance text-muted-foreground">Enter your email below to get your password</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="learnhub@example.com" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" onClick={forgotPassword} className="w-full">
            Get password!
          </Button>
          <Button type="submit" onClick={() => changeState("login")} className="w-full">
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
