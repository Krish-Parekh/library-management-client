import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "@/components/forms/SignupForm";

export default function Signup() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-11/12 md:w-1/2">
        <CardHeader className="border-b-2">
          <CardTitle>Signup</CardTitle>
          <CardDescription>Signup to create an account</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
