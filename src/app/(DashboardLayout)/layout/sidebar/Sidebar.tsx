import { useMediaQuery, Box, Drawer, Typography } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";
import Upgrade from "./Updrade";
import { IconCopyright } from "@tabler/icons-react";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = "300px";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              display: "flex",
              justifyContent: "space-between",
              color: "back",
              backgroundColor: "white",
              width: sidebarWidth,
              boxSizing: "border-box",
              border: "0",
              boxShadow: "rgba(113, 122, 131, 0.11) 0px 7px 30px 0px",
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box>
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box py={5} justifyContent={"center"} display={"flex"}>
              <Logo />
            </Box>
            {/* ------------------------------------------- */}
            {/* Sidebar Items */}
            {/* ------------------------------------------- */}
            <Box>
              <SidebarItems />
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            <IconCopyright /> 2024, Foodia
          </Typography>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box py={5} justifyContent={"center"} display={"flex"}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
      {/* <Upgrade /> */}
    </Drawer>
  );
};

export default Sidebar;
