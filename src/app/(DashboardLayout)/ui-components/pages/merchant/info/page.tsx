"use client";
import { Approvals } from "@/app/(DashboardLayout)/components/api/Approvals";
import { getMerchantDetail } from "@/app/(DashboardLayout)/components/api/Merchant";
import Attachment from "@/app/(DashboardLayout)/components/merchant/Attachment";
import Info from "@/app/(DashboardLayout)/components/merchant/Info";
import Products from "@/app/(DashboardLayout)/components/merchant/Products";
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
  merchant_name: string;
  no_link_aja: string;
  province: string;
  city: string;
  sub_district: string;
  postal_code: string;
  address: string;
  self_photo: string;
  merchant_photo: string;
  ktp_photo: string;
  longitude: string;
  latitude: string;
  oauth: { fullname: string; email: string; phone: string };
  products: {
    id: number;
    name: string;
    description: string;
    price: string;
    qty: number;
    status: string;
  }[];
};

const MerchantInfo = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Props>({
    id: 0,
    ktp_number: "",
    status: "",
    merchant_name: "",
    no_link_aja: "",
    province: "",
    city: "",
    sub_district: "",
    postal_code: "",
    address: "",
    self_photo: "",
    ktp_photo: "",
    merchant_photo: "",
    longitude: "",
    latitude: "",
    oauth: { fullname: "", email: "", phone: "" },
    products: [
      {
        id: 0,
        name: "",
        description: "",
        price: "",
        qty: 0,
        status: "",
      },
    ],
  });

  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, setIsLoading } = useAppContext();
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
    getMerchantDetail(searchParams.get("id"), setData, setIsLoading);
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
      href="/ui-components/pages/merchant"
    >
      Merchant List
    </Button>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Merchant Details
    </Typography>,
  ];

  // const [checkboxes, setCheckboxes] = useState([
  //   { id: 1, label: "Name", checked: false },
  //   { id: 2, label: "LinkAja Number", checked: false },
  //   { id: 3, label: "Phone Number", checked: false },
  //   { id: 4, label: "KTP Number", checked: false },
  //   { id: 5, label: "KTP Photo", checked: false },
  //   { id: 6, label: "Self Photo", checked: false },
  //   { id: 7, label: "Merchant Photo", checked: false },
  //   { id: 8, label: "Address", checked: false },
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
  //   checkboxes[1].checked ? "linkajaNumber," : ""
  // }${checkboxes[2].checked ? "phoneNumber," : ""}${
  //   checkboxes[3].checked ? "ktpNumber," : ""
  // }${checkboxes[4].checked ? "ktpPhoto," : ""}${
  //   checkboxes[5].checked ? "selfPhoto," : ""
  // }${checkboxes[6].checked ? "merchatPhoto," : ""}${
  //   checkboxes[7].checked ? "address," : ""
  // }`;

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "FullName", checked: false },
    { id: 22, label: "Merchant Name", checked: false },
    { id: 2, label: "LinkAja Number", checked: false },
    { id: 3, label: "Phone Number", checked: false },
    { id: 4, label: "KTP Number", checked: false },
    { id: 5, label: "KTP Photo", checked: false },
    // { id: 6, label: "Self Photo", checked: false },
    { id: 7, label: "Merchant Photo", checked: false },
    { id: 8, label: "Address", checked: false },
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
    "Merchant Name": "NameMerchant",
    "LinkAja Number": "LinkAjaNumber",
    "Phone Number": "PhoneNumber",
    "KTP Number": "KTPNumber",
    "KTP Photo": "KTPPhoto",
    "Self Photo": "SelfPhoto",
    "Merchant Photo": "MerchantPhoto",
    Address: "Address",
  };

  // Concatenate all values into a single string with a | separator and label mappings
  const concatenatedValues = errFields
    .map((field) => `${labelMappings[field.label]}:${field.message}`)
    .join("|");

  return (
    <>
      <DashboardCard title="Merchant Details" breadcrumb={breadcrumbs}>
        <>
          <Info data={data} />
          <Attachment data={data} />
          <Products data={data.products} />
          <Box
            paddingBottom="70px"
            paddingTop="20px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                size="large"
                color="success"
                disabled={data.status === "approved"}
                onClick={() =>
                  handleOpen(data.id, "approved", data.oauth.fullname)
                }
              >
                <IconCircleCheck size={18} /> Approve
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                disabled={data.status === "rejected"}
                onClick={() =>
                  handleOpen(data.id, "rejected", data.oauth.fullname)
                }
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
            "merchant",
            setIsLoadingModal
            // valueEventTypeSelect
          );
        }}
      />
    </>
  );
};

export default MerchantInfo;
