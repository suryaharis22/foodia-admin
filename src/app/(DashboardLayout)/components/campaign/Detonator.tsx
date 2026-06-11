import { Box, Button, Typography } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import DetailCard from "../shared/DetailCard";
import ImageHandler from "../shared/ImageHandler";
import { ModalPopupFilesDetail } from "../shared/ModalPopup";

interface ChildProps {
  data: {
    image_url: string;
    orders: [
      {
        id: number;
        order_status: string;
        qty: number;
        merchant: { oauth: { fullname: string } };
        merchant_product: {
          id: number;
          name: string;
          price: string;
          images: [{ image_url: string }];
        };
      }
    ];
    detonator: {
      id: number;
      status: string;
      self_photo: string;
      oauth: { fullname: string; email: string; phone: string };
    };
  };
}

// const products = [
//   {
//     id: "1",
//     name: "Selfi.jpg",
//     post: "2 MB",
//     pname: "Elite Admin",
//     priority: "Low",
//     pbg: "primary.main",
//     budget: "3.9",
//     img: img1,
//   },
//   {
//     id: "2",
//     name: "KTP.jpg",
//     post: "1 MB",
//     pname: "Real Homes WP Theme",
//     priority: "Medium",
//     pbg: "secondary.main",
//     budget: "24.5",
//     img: img2,
//   },
// ];

const Detonator: React.FC<ChildProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");

  const onViewImage = (file: string) => {
    setIsOpen(true);
    setFile(file);
  };

  const onCloseView = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DetailCard title="Detonator">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <Button
              sx={{
                width: "40%",
                borderRadius: "100%",
                backgroundColor: "transparent",
                padding: 0,
              }}
              variant="contained"
              size="small"
              onClick={() => onViewImage(data.detonator.self_photo)}
            >
              <ImageHandler
                borderRadius="100%"
                src={data.detonator.self_photo}
              />
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "10px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {data.detonator.oauth.fullname}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      alignItems: "center",
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_63_1850)">
                        <path
                          d="M9.625 0.875C9.85706 0.875 10.0796 0.967187 10.2437 1.13128C10.4078 1.29538 10.5 1.51794 10.5 1.75V12.25C10.5 12.4821 10.4078 12.7046 10.2437 12.8687C10.0796 13.0328 9.85706 13.125 9.625 13.125H4.375C4.14294 13.125 3.92038 13.0328 3.75628 12.8687C3.59219 12.7046 3.5 12.4821 3.5 12.25V1.75C3.5 1.51794 3.59219 1.29538 3.75628 1.13128C3.92038 0.967187 4.14294 0.875 4.375 0.875H9.625ZM4.375 0C3.91087 0 3.46575 0.184374 3.13756 0.512563C2.80937 0.840752 2.625 1.28587 2.625 1.75V12.25C2.625 12.7141 2.80937 13.1592 3.13756 13.4874C3.46575 13.8156 3.91087 14 4.375 14H9.625C10.0891 14 10.5342 13.8156 10.8624 13.4874C11.1906 13.1592 11.375 12.7141 11.375 12.25V1.75C11.375 1.28587 11.1906 0.840752 10.8624 0.512563C10.5342 0.184374 10.0891 0 9.625 0L4.375 0Z"
                          fill="#002660"
                        />
                        <path
                          d="M7 12.25C7.23206 12.25 7.45462 12.1578 7.61872 11.9937C7.78281 11.8296 7.875 11.6071 7.875 11.375C7.875 11.1429 7.78281 10.9204 7.61872 10.7563C7.45462 10.5922 7.23206 10.5 7 10.5C6.76794 10.5 6.54538 10.5922 6.38128 10.7563C6.21719 10.9204 6.125 11.1429 6.125 11.375C6.125 11.6071 6.21719 11.8296 6.38128 11.9937C6.54538 12.1578 6.76794 12.25 7 12.25Z"
                          fill="#002660"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_63_1850">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>{" "}
                    {data.detonator.oauth.phone}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      alignItems: "center",
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M0 3.5C0 3.03587 0.184374 2.59075 0.512563 2.26256C0.840752 1.93437 1.28587 1.75 1.75 1.75H12.25C12.7141 1.75 13.1592 1.93437 13.4874 2.26256C13.8156 2.59075 14 3.03587 14 3.5V10.5C14 10.9641 13.8156 11.4092 13.4874 11.7374C13.1592 12.0656 12.7141 12.25 12.25 12.25H1.75C1.28587 12.25 0.840752 12.0656 0.512563 11.7374C0.184374 11.4092 0 10.9641 0 10.5V3.5ZM1.75 2.625C1.51794 2.625 1.29538 2.71719 1.13128 2.88128C0.967187 3.04538 0.875 3.26794 0.875 3.5V3.68988L7 7.36487L13.125 3.68988V3.5C13.125 3.26794 13.0328 3.04538 12.8687 2.88128C12.7046 2.71719 12.4821 2.625 12.25 2.625H1.75ZM13.125 4.71012L9.0055 7.182L13.125 9.71687V4.71012ZM13.0952 10.7266L8.16025 7.6895L7 8.38513L5.83975 7.6895L0.90475 10.7257C0.954472 10.9119 1.06428 11.0765 1.21712 11.1939C1.36996 11.3113 1.55728 11.375 1.75 11.375H12.25C12.4426 11.375 12.6298 11.3115 12.7827 11.1943C12.9355 11.077 13.0454 10.9127 13.0952 10.7266ZM0.875 9.71687L4.9945 7.182L0.875 4.71012V9.71687Z"
                        fill="#002660"
                      />
                    </svg>
                    {data.detonator.oauth.email}
                  </Typography>
                </Box>
                <Link
                  href={{
                    pathname: "/ui-components/pages/detonator/info",
                    query: {
                      id: data.detonator.id,
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    color="info"
                    sx={{ padding: 0 }}
                  >
                    View
                  </Button>
                </Link>
              </Box>
              <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="30px"
                height="25px"
                padding="5px 10px"
                color="white"
                sx={{
                  backgroundColor: `${
                    data.detonator.status === "incoming"
                      ? "warning.main"
                      : data.detonator.status === "canceled"
                      ? "error.main"
                      : "success.main"
                  }`,
                  textTransform: "capitalize",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                {data.detonator.status}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DetailCard>
      <ModalPopupFilesDetail
        open={isOpen}
        image_url={file}
        handleClose={onCloseView}
      />
    </>
  );
};

export default Detonator;
