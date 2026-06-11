"use client";
import "@/app/global.css";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NextTopLoader from "nextjs-toploader";
import AppProvider from "./(DashboardLayout)/components/shared/Context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Foodia Admin</title>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <AppProvider>
            <NextTopLoader />
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
