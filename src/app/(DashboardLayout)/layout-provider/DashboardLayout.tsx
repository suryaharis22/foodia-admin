"use client";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { Box, CircularProgress, styled } from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../components/shared/Context";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  background: "#FFF",
}));

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isLoading, setIsLoading } = useAppContext();

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper>
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            height: "100%",
          }}
        >
          {children}
        </Box>
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}

        {/* ------------------------------------------- */}
        {/* Footer */}
        {/* ------------------------------------------- */}
        {/* <Footer /> */}
      </PageWrapper>
    </MainWrapper>
  );
}
