import React, { Suspense } from "react";
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
    <Suspense fallback={null}>
      <div className="h-screen w-screen flex items-center justify-center">
        <Card className="w-11/12 md:w-1/2">
          <CardHeader className="border-b-2">
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
