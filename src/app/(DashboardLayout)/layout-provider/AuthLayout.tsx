"use client";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { IconCopyright } from "@tabler/icons-react";
import React, { useState } from "react";
import Logo from "../layout/shared/logo/Logo";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
}));

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper className="mainwrapper">
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          fontSize: "20px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20px",
            // alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              backgroundColor: "transparent",
              gap: "15px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                backgroundColor: "transparent",
                // width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginLeft: "80px",
                  // marginTop: "50px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "50px",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: "40px",
                  }}
                >
                  <hr
                    style={{
                      width: "64px",
                      height: 0,
                      border: "1px solid black",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    justifyContent: "center",
                    gap: "150px",
                  }}
                >
                  <Box>
                    <Logo />
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        fontSize: "18px",
                        fontWeight: 500,
                        letterSpacing: "25.2px",
                        marginBottom: "15px",
                        color: "black",
                      }}
                    >
                      WELCOME
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "48px",
                          fontWeight: 800,
                          lineHeight: "normal",
                          // marginRight: "200px",
                          color: "black",
                        }}
                      >
                        Explore and manage your work here!
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      display: "flex",
                      // paddingLeft: "45px",
                      alignItems: "center",
                      gap: "5px",
                      color: "black",
                    }}
                  >
                    <IconCopyright /> 2024, Foodia
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              height: "100%",
              width: "60%",
              paddingY: "60px",
              paddingRight: "120px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                height: "auto",
                minWidth: "500px",
                width: "100%",
                background: "#168140",
                padding: "50px",
                gap: "15px",
                borderRadius: "40px",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </MainWrapper>
  );
}
