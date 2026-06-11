"use client";
import { Approvals } from "@/app/(DashboardLayout)/components/api/Approvals";
import { getProductDetail } from "@/app/(DashboardLayout)/components/api/Product";
import Attachment from "@/app/(DashboardLayout)/components/product/Attachment";
import Info from "@/app/(DashboardLayout)/components/product/Info";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { ModalPopupApprovals } from "@/app/(DashboardLayout)/components/shared/ModalPopup";
import { Box, Button, Stack, Typography } from "@mui/material";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  name: string;
  price: string;
  status: string;
  qty: string;
  note: string;
  description: string;
  merchant: {
    id: number;
    merchant_name: string;
    self_photo: any;
    merchant_photo: any;
    status: string;
    oauth: { id: number; email: string; phone: string };
  };
  images: [{ id: number; image_url: string }];
};

const ProductInfo = () => {
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [data, setData] = useState<Props>({
    id: 0,
    name: "",
    price: "",
    status: "",
    qty: "",
    note: "",
    description: "",
    merchant: {
      id: 0,
      merchant_name: "",
      self_photo: "",
      merchant_photo: "",
      status: "",
      oauth: { id: 0, email: "", phone: "" },
    },
    images: [{ id: 0, image_url: "" }],
  });
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const handleOpen = (id: number, status: string, name: string) => {
    setIsOpen(true);
    setName(name);
    setId(id);
    setStatus(status);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getProductDetail(searchParams.get("id"), setData, setIsLoading);
  }, [searchParams, setIsLoading]);

  const breadcrumbs = [
    <Button
      key={0}
      sx={{
        p: 0,
        fontSize: "13px",
        color: "#000",
        fontWeight: 400,
        ":hover": { color: "blue" },
      }}
      href="/ui-components/pages/product"
    >
      Product List
    </Button>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Product Detail
    </Typography>,
  ];

  return (
    <>
      <DashboardCard title="Product Detail" breadcrumb={breadcrumbs}>
        <>
          <Info data={data} />
          <Attachment data={data} />
          <Box
            paddingBottom="70px"
            paddingTop="20px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            color="white"
          >
            <Stack
              display="flex"
              justifyContent="center"
              spacing={1}
              direction="row"
            >
              <Button
                variant="contained"
                size="large"
                disabled={data.status === "approved"}
                onClick={() => handleOpen(data.id, "approved", data.name)}
                color="success"
              >
                <IconCircleCheck size={18} /> Approve
              </Button>
              <Button
                variant="contained"
                size="large"
                disabled={data.status === "rejected"}
                onClick={() => handleOpen(data.id, "rejected", data.name)}
                color="error"
              >
                <IconBan size={16} /> Reject
              </Button>
            </Stack>
          </Box>
        </>
      </DashboardCard>

      <ModalPopupApprovals
        isLoading={isLoadingModal}
        open={isOpen}
        handleClose={handleClose}
        status={status}
        name={name}
        // errs={errorNotes}
        note={note}
        onChange={(e: any) => setNote(e.target.value)}
        handleSubmit={() => {
          setIsLoadingModal(true);
          Approvals(
            ids,
            status,
            note,
            setIsOpen,
            "merchant-product",
            setIsLoadingModal
            // valueEventTypeSelect
          );
        }}
      />
    </>
  );
};

export default ProductInfo;
