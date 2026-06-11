import { Box, Button, Typography } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import DetailCard from "../shared/DetailCard";
import { ModalPopupFilesDetail } from "../shared/ModalPopup";
import logo from "@/utils/notFound.png";
import ImageHandler from "../shared/ImageHandler";

interface ChildProps {
  data: {
    image_url: string;
    orders: [
      {
        order_status: string;
        id: number;
        qty: number;
        total_amount: number;
        total_tax: number;
        merchant: { oauth: { fullname: string } };
        merchant_product: {
          id: number;
          name: string;
          price: any;
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

const Orders: React.FC<ChildProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  // const [errorOccurred, setErrorOccurred] = useState(false);

  // const handleImageError = () => {
  //   setErrorOccurred(true);
  // };

  // console.log("orderDoc", errorOccurred);

  const onViewImage = (file: string) => {
    setIsOpen(true);
    setFile(file);
  };

  const onCloseView = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DetailCard title="Orders">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "20px",
          }}
        >
          {data?.orders?.map((orders) => (
            <Box
              key={orders.id}
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "start",
                  borderRadius: "10px",
                  // padding: "10px",
                  width: "100%",
                }}
              >
                <Button
                  sx={{
                    width: "40%",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                    padding: 0,
                  }}
                  variant="contained"
                  size="small"
                  onClick={() =>
                    onViewImage(orders.merchant_product.images[0].image_url)
                  }
                >
                  <ImageHandler
                    borderRadius="10px"
                    src={orders.merchant_product.images[0].image_url}
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
                      {orders.merchant_product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "space-between",
                        marginBottom: "10px",
                        // gap: "10px",
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
                        {orders.merchant.oauth.fullname}
                      </Typography>
                      <Box
                        sx={{
                          fontSize: "2px",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "bold",
                          gap: "2px",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px" }}>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(orders.merchant_product.price)}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px", color: "#1D5882" }}
                        >{`(`}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "#1D5882" }}>
                          +{" "}
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(orders.total_tax)}{" "}
                          - Biaya Platform
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px", color: "#1D5882" }}
                        >{`)`}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: "12px" }}>
                        Qty: {orders.qty}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      Total:{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(orders.total_amount)}
                    </Typography>
                    <Link
                      href={{
                        pathname: "/ui-components/pages/product/info",
                        query: {
                          id: orders.merchant_product.id,
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
                        orders.order_status === "review"
                          ? "warning.main"
                          : orders.order_status === "canceled"
                          ? "error.main"
                          : "success.main"
                      }`,
                      textTransform: "capitalize",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {orders.order_status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
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

export default Orders;
