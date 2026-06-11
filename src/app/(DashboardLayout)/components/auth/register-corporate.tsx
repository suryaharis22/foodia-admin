import {
  Box,
  Button,
  CircularProgress,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconAddressBook,
  IconFileDescription,
  IconLock,
  IconMail,
  IconPhone,
  IconUserFilled,
} from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterCorp = () => {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();
  const theme = useTheme();

  const onRegisterCorp = () => {
    setIsLoading(true);
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE + "/corporation/register",
        {
          user_id: parseInt(`${localStorage.getItem("USER_ID")}`),
          description,
          address,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      )
      .then((res) => {
        // setIsLoading(false);
        router.push("/ui-components/auth/login");
      })
      .catch((error) => {
        // if (error.code === "ERR_NETWORK") {
        //   AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
        // } else {
        //   AlertMessage(
        //     "Gagal",
        //     "Email atau Password Tidak Sesuai",
        //     "Coba Lagi",
        //     "error"
        //   );
        // }
        console.log("error");
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        borderRadius: "40px",
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
        Register New Account
      </Typography>
      <TextField
        onChange={(e) => setDescription(e.target.value)}
        // label="Username"
        placeholder="About Company"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              position="start"
            >
              <IconFileDescription />
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
        onChange={(e) => setAddress(e.target.value)}
        // label="Username"
        placeholder="Address"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              position="start"
            >
              <IconAddressBook />
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
        onClick={() => onRegisterCorp()}
        style={{
          width: "100%",
          height: "56px",
          background: "#00BE3A",
          fontSize: "16px",
          fontWeight: 600,
          color: "#fff",
          borderRadius: "15px",
          gap: "10px",
        }}
      >
        {isLoading ? (
          <CircularProgress size="20px" sx={{ color: "#333" }} />
        ) : (
          ""
        )}
        Submit
      </Button>
    </Box>
  );
};

export default RegisterCorp;
