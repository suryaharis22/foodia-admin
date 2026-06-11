"use client";
import { Approvals } from "@/app/(DashboardLayout)/components/api/Approvals";
import { getCorporationDetail } from "@/app/(DashboardLayout)/components/api/Corporation";
import Info from "@/app/(DashboardLayout)/components/donator/Info";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { ModalPopupApprovals } from "@/app/(DashboardLayout)/components/shared/ModalPopup";
import { Box, Button, Stack, Typography } from "@mui/material";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  ktp_number: string;
  status: string;
  self_photo: string;
  description: string;
  oauth: { fullname: string; email: string; phone: string };
};

const CorporationInfo = () => {
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [data, setData] = useState<Props>({
    id: 0,
    ktp_number: "",
    status: "",
    self_photo: "",
    description: "",
    oauth: { fullname: "", email: "", phone: "" },
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
    getCorporationDetail(searchParams.get("id"), setData, setIsLoading);
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
      href="/ui-components/pages/donator"
    >
      Corporation Donator List
    </Button>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Corporation Donator Detail
    </Typography>,
  ];

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Email", checked: false },
    { id: 2, label: "Phone Number", checked: false },
    { id: 3, label: "KTP Number", checked: false },
    { id: 4, label: "KTP Photo", checked: false },
  ]);

  // Handler for checkbox change
  const handleCheckboxChange = (id: number) => {
    setCheckboxes((prevState) =>
      prevState.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked } // Toggle the checked state
          : checkbox
      )
    );
  };

  const errorNotes = `${checkboxes[0].checked ? "email," : ""}${
    checkboxes[1].checked ? "phoneNumber," : ""
  }${checkboxes[2].checked ? "ktpNumber," : ""}${
    checkboxes[3].checked ? "ktpPhoto," : ""
  }`;

  return (
    <>
      <DashboardCard title="Corporation Detail" breadcrumb={breadcrumbs}>
        <>
          <Info data={data} />
          {/* <Attachment data={data} /> */}
          <Box
            marginTop="20px"
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
                onClick={() =>
                  handleOpen(data.id, "approved", data.oauth.fullname)
                }
                color="success"
              >
                <IconCircleCheck size={18} /> Approve
              </Button>
              <Button
                variant="contained"
                size="large"
                disabled={data.status === "rejected"}
                onClick={() =>
                  handleOpen(data.id, "rejected", data.oauth.fullname)
                }
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
        errs={errorNotes}
        note={note}
        onChange={(e: any) => setNote(e.target.value)}
        checkboxes={checkboxes}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={() => {
          setIsLoadingModal(true);
          Approvals(
            ids,
            status,
            errorNotes + note,
            setIsOpen,
            "corporation",
            setIsLoadingModal
            // valueEventTypeSelect
          );
        }}
      />
    </>
  );
};

export default CorporationInfo;
