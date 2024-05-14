
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-1/2">
        <CardHeader className="border-b-2">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Reset Password link will be sent to regsitered email address
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
