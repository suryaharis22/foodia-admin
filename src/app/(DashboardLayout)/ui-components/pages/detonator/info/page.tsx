"use client";
import { Approvals } from "@/app/(DashboardLayout)/components/api/Approvals";
import { getCorporationDetail } from "@/app/(DashboardLayout)/components/api/Corporation";
import { getDetonatorDetail } from "@/app/(DashboardLayout)/components/api/Detonator";
import Attachment from "@/app/(DashboardLayout)/components/detonator/Attachment";
import Info from "@/app/(DashboardLayout)/components/detonator/Info";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { ModalPopupApprovals } from "@/app/(DashboardLayout)/components/shared/ModalPopup";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  ktp_number: string;
  status: string;
  self_photo: string;
  ktp_photo: string;
  oauth: { fullname: string; email: string; phone: string };
};

const DetonatorInfo = () => {
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
    ktp_photo: "",
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
    getDetonatorDetail(searchParams.get("id"), setData, setIsLoading);
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
      href="/ui-components/pages/detonator"
    >
      Volunteer List
    </Button>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Volunteer Detail
    </Typography>,
  ];

  // const [checkboxes, setCheckboxes] = useState([
  //   { id: 1, label: "Name", checked: false },
  //   // { id: 2, label: "Email", checked: false },
  //   { id: 3, label: "Phone Number", checked: false },
  //   { id: 4, label: "KTP Number", checked: false },
  //   { id: 5, label: "KTP Photo", checked: false },
  //   { id: 6, label: "Self Photo", checked: false },
  // ]);

  // // Handler for checkbox change
  // const handleCheckboxChange = (id: number) => {
  //   setCheckboxes((prevState) =>
  //     prevState.map((checkbox) =>
  //       checkbox.id === id
  //         ? { ...checkbox, checked: !checkbox.checked } // Toggle the checked state
  //         : checkbox
  //     )
  //   );
  // };

  // const errorNotes = `${checkboxes[0].checked ? "name," : ""}${
  //   checkboxes[1].checked ? "phoneNumber," : ""
  // }${checkboxes[2].checked ? "ktpNumber," : ""}${
  //   checkboxes[3].checked ? "ktpPhoto," : ""
  // }${checkboxes[4].checked ? "selfPhoto," : ""}`;

  const [checkboxes, setCheckboxes] = useState([
    { id: 2, label: "FullName", checked: false },
    { id: 4, label: "KTP Number", checked: false },
    { id: 5, label: "KTP Photo", checked: false },
    { id: 6, label: "Self Photo", checked: false },
  ]);

  // State to hold the error fields
  const [errFields, setErrFields] = useState<
    { label: string; message: string }[]
  >([]);

  // Handler for checkbox change
  const handleCheckboxChange = (id: number) => {
    setCheckboxes((prevState) =>
      prevState.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked } // Toggle the checked state
          : checkbox
      )
    );

    const changedCheckbox = checkboxes.find((checkbox) => checkbox.id === id);
    if (changedCheckbox) {
      if (!changedCheckbox.checked) {
        // If the checkbox is checked, add label to errFields
        setErrFields((prev) => [
          ...prev,
          { label: changedCheckbox.label, message: note },
        ]);
      } else {
        // If the checkbox is unchecked, remove label from errFields
        setErrFields((prev) =>
          prev.filter((field) => field.label !== changedCheckbox.label)
        );
      }
    }
  };

  const handleInputChange = (index: number, newValue: string) => {
    setErrFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, message: newValue } : field
      )
    );
  };

  // Map label to short identifiers for concatenated string
  const labelMappings: { [key: string]: string } = {
    FullName: "FullName",
    "KTP Number": "KTPNumber",
    "KTP Photo": "KTPPhoto",
    "Self Photo": "SelfPhoto",
  };

  // Concatenate all values into a single string with a | separator and label mappings
  const concatenatedValues = errFields
    .map((field) => `${labelMappings[field.label]}:${field.message}`)
    .join("|");

  return (
    <>
      <DashboardCard title="Volunteer Detail" breadcrumb={breadcrumbs}>
        <>
          <Info data={data} />
          <Attachment data={data} />
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
        errs={errFields}
        note={concatenatedValues}
        // onChange={(e: any) => setNote(e.target.value)}
        handleInputChange={handleInputChange}
        checkboxes={checkboxes}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={() => {
          setIsLoadingModal(true);
          Approvals(
            ids,
            status,
            concatenatedValues,
            setIsOpen,
            "detonator",
            setIsLoadingModal
            // valueEventTypeSelect
          );
        }}
      />
    </>
  );
};

export default DetonatorInfo;
