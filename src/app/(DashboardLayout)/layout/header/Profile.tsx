import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  Menu,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import {
  IconBell,
  IconChevronDown,
  IconCircle,
  IconCircle9Filled,
  IconCircleFilled,
  IconCreditCard,
  IconCurrencyDollar,
  IconShield,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [username, setUsername] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("USERNAME"));
  }, []);

  const onLogout = () => {
    setIsLoading(true);
    localStorage.clear();
    router.push("/ui-components/auth/login");
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const error = theme.palette.error.main;
  const errorlight = theme.palette.error.light;
  const success = theme.palette.success.main;
  const successlight = theme.palette.success.light;

  /*profile data*/
  const profiledata = [
    {
      href: "/",
      title: "My Profile",
      subtitle: "Account Settings",
      icon: <IconCurrencyDollar width="20" height="20" />,
      color: primary,
      lightcolor: primarylight,
    },
    {
      href: "/",
      title: "My Inbox",
      subtitle: "Messages & Emails",
      icon: <IconShield width="20" height="20" />,
      color: success,
      lightcolor: successlight,
    },
    {
      href: "/",
      title: "My Tasks",
      subtitle: "To-do and Daily Tasks",
      icon: <IconCreditCard width="20" height="20" />,
      color: error,
      lightcolor: errorlight,
    },
  ];

  return (
    <Box>
      {/* <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        // onClick={handleClick2}
      >
        <IconBell />
        <IconCircleFilled
          size={10}
          style={{
            backgroundColor: "red",
            color: "transparent",
            borderRadius: "100%",
            position: "absolute",
            marginLeft: "15px",
            marginBottom: "15px",
          }}
        />
      </IconButton> */}
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        {/* <Avatar
          src={"/images/users/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        /> */}
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            {username}
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        // anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        // transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
            p: 2,
            pb: 2,
            pt: 0,
          },
        }}
      >
        <Box pt={0}>
          <List>
            {/* <ListItemButton component="a" href="#">
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Account" />
            </ListItemButton> */}
            {/* <ListItemButton component="a" href="#">
              <ListItemText primary="Change Password" />
            </ListItemButton> */}
            {/* <ListItemButton component="a" href="#">
              <ListItemText primary="My Settings" />
            </ListItemButton> */}
          </List>
        </Box>
        {/* <Divider /> */}
        <Box mt={2}>
          <Button
            sx={{
              gap: "10px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
            onClick={() => onLogout()}
            fullWidth
            variant="contained"
            color="primary"
          >
            {isLoading ? (
              <CircularProgress size="20px" sx={{ color: "#fff" }} />
            ) : (
              ""
            )}
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
