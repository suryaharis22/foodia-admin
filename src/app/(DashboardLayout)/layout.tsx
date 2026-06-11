"use client";
import { styled } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AuthLayout from "./layout-provider/AuthLayout";
import DashboardLayout from "./layout-provider/DashboardLayout";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <MainWrapper>
      {pathname.includes("auth") ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <DashboardLayout>{children}</DashboardLayout>
      )}
    </MainWrapper>
  );
}
