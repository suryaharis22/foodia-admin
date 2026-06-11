import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconLock, IconUserFilled } from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorHandling from "../api/shared/ErrorHandling";
import { AlertError401, AlertMessage } from "../shared/Alerts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onLogin = () => {
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_BASE + "/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const role = res?.data?.body.role;
        const email = res?.data?.body.email;
        const token = res?.data.body.token;
        const username = res?.data?.body.fullname;
        const user_id = res?.data?.body.user_id;
        Cookies.set("role", role);
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("USERNAME", username);
        localStorage.setItem("ROLE", role);
        localStorage.setItem("EMAIL", email);
        localStorage.setItem("USER_ID", user_id);
        localStorage.setItem("Session", "start");
        if (role === "superadmin") {
          router.refresh();
          router.push("/ui-components/pages/donator/individuals");
          // setIsLoading(false);
        } else if (role === "corporate") {
          router.refresh();
          router.push("/ui-components/pages/wallet/csr");
          // setIsLoading(false);
        } else {
          router.refresh();
          // setIsLoading(false);
        }
      })
      .catch((error) => {
        AlertMessage(
          "Login Failed",
          "Invalid Email or Password",
          "Try Again",
          "error"
        );
        ErrorHandling(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const session = localStorage.getItem("Session");
    if (session === "start") {
      router.push("/ui-components/pages/donator/individuals");
    } else {
      Cookies.remove("role");
      AlertError401();
    }
  }, [router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        // borderRadius: "40px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <g clipPath="url(#clip0_26_22)">
          <path
            d="M32 40C30.896 40 30 38.208 30 36C30 33.792 30.896 32 32 32C33.104 32 34 33.792 34 36C34 38.208 33.104 40 32 40Z"
            fill="#42E54E"
          />
          <path
            d="M43.312 0.487928C43.5283 0.675941 43.7017 0.908251 43.8204 1.16912C43.9391 1.42999 44.0004 1.71332 44 1.99993V3.99993H46C47.5913 3.99993 49.1174 4.63207 50.2426 5.75729C51.3679 6.88251 52 8.40863 52 9.99993V59.9999H58C58.5304 59.9999 59.0391 60.2106 59.4142 60.5857C59.7893 60.9608 60 61.4695 60 61.9999C60 62.5304 59.7893 63.0391 59.4142 63.4141C59.0391 63.7892 58.5304 63.9999 58 63.9999H6C5.46957 63.9999 4.96086 63.7892 4.58579 63.4141C4.21071 63.0391 4 62.5304 4 61.9999C4 61.4695 4.21071 60.9608 4.58579 60.5857C4.96086 60.2106 5.46957 59.9999 6 59.9999H12V5.99993C12.0001 5.51806 12.1741 5.05241 12.4901 4.68863C12.8061 4.32485 13.2429 4.08739 13.72 4.01993L41.72 0.0199283C42.0034 -0.0205438 42.2922 0.000293538 42.5668 0.0810322C42.8415 0.161771 43.0956 0.300529 43.312 0.487928ZM46 7.99993H44V59.9999H48V9.99993C48 9.4695 47.7893 8.96079 47.4142 8.58572C47.0391 8.21064 46.5304 7.99993 46 7.99993ZM16 7.73593V59.9999H40V4.30793L16 7.73593Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_26_22">
            <rect width="64" height="64" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <Typography
        color="textSecondary"
        variant="h6"
        style={{
          color: "white",
          width: "200px",
          display: "flex",
          justifyContent: "start",
          fontSize: "24px",
          padding: "20px 0 20px 0",
        }}
      >
        Login with your account
      </Typography>
      <TextField
        id="username"
        onChange={(e) => setEmail(e.target.value)}
        // label="Username"
        placeholder="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              position="start"
            >
              <IconUserFilled />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          background: "rgba(0, 0, 0, 0.16)",
          borderRadius: "15px",
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              border: "none", // Remove the border
            },
          },
        }}
      />
      <TextField
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? "password" : "text"}
        placeholder="Password"
        color="secondary"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              position="start"
            >
              <IconLock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          background: "rgba(0, 0, 0, 0.16)",
          borderRadius: "15px",
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              border: "none", // Remove the border
            },
          },
        }}
      />
      <Button
        onClick={() => onLogin()}
        style={{
          width: "100%",
          height: "56px",
          background: "#00BE3A",
          fontSize: "16px",
          fontWeight: 600,
          color: "#fff",
          borderRadius: "15px",
          gap: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress size="20px" sx={{ color: "#fff" }} />
        ) : (
          ""
        )}
        Login
      </Button>
      {/* <Link
        style={{
          display: "flex",
          fontSize: "16px",
          color: "white",
          justifyContent: "center",
          fontWeight: "bold",
        }}
        href="/ui-components/auth/register"
      >
        Register Corporation Account
      </Link> */}
    </Box>
  );
};

export default Login;
