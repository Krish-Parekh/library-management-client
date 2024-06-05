
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ResetPassword() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-11/12 md:w-1/2">
        <CardHeader className="border-b-2">
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Forgot Password link will be sent to regsitered email address
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
