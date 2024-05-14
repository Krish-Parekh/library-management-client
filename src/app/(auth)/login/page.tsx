
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-1/2">
        <CardHeader className="border-b-2">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account to access all the features of the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
