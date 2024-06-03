"use client";

import React, { Suspense } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function page() {
  return (
    <Suspense fallback={null}>
      <AdminDashboard />
    </Suspense>
  );
}
