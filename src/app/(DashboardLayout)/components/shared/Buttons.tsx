import { Button, Chip } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface StatusProps {
  row: { status?: any; campaign_status?: any };
}

interface ButtonAction {
  query?: any;
  pathname?: any;
  label?: any;
  onClick?: any;
  disabled?: any;
}

export const ButtonAction: React.FC<ButtonAction> = ({
  query,
  pathname,
  label,
  onClick,
  disabled,
}) => {
  return (
    // <Link
    //   href={{
    //     pathname: {pathname},
    //     query: {query},
    //   }}
    // >
    <Button
      sx={{ backgroundColor: "#3FB648", width: "auto", borderRadius: "10px" }}
      variant="contained"
      size="small"
      color="info"
      onClick={onClick}
      disabled={disabled}
    >
      <IconEye size={20} />
      {label}
    </Button>
    // </Link>
  );
};

export const Status: React.FC<StatusProps> = ({ row }) => {
  return (
    // <Link
    //   href={{
    //     pathname: {pathname},
    //     query: {query},
    //   }}
    // >
    <Chip
      sx={{
        textTransform: "capitalize",
        width: "115px",
        fontSize: "14px",
        fontWeight: 600,
        borderRadius: "8px",
        height: "32px",
        backgroundColor:
          row.status === "approved"
            ? "#E9FBF0"
            : row.status === "rejected"
            ? "#FFF0F1"
            : "#FFF9EB",
        color:
          row.status === "approved"
            ? "#178D46"
            : row.status === "rejected"
            ? "#94000D"
            : "#AB6800",
      }}
      size="small"
      label={row.status}
    />
    // </Link>
  );
};

export const CouponStatus: React.FC<StatusProps> = ({ row }) => {
  return (
    // <Link
    //   href={{
    //     pathname: {pathname},
    //     query: {query},
    //   }}
    // >
    <Chip
      sx={{
        textTransform: "capitalize",
        width: "auto",
        fontSize: "11px",
        fontWeight: 600,
        borderRadius: "10px",
        height: "20px",
        bgcolor:
          row.status === "reserved"
            ? "#1D5882"
            : row.status === "expired"
            ? "#DE0606"
            : row.status === "active"
            ? "#6B4EFF"
            : row.status === "claimed"
            ? "#3FB648"
            : "",
        color: "white",
      }}
      size="small"
      label={row.status}
    />
    // </Link>
  );
};

export const ApprovalStatus: React.FC<any> = ({ row }) => {
  const [status, setStatus] = useState<any>("");

  useEffect(() => {
    if (
      localStorage.getItem("FilterEventStatus") === "Invitation" ||
      localStorage.getItem("FilterEventStatus") === "Review"
    ) {
      setStatus("Waiting");
    } else if (localStorage.getItem("FilterEventStatus") === "Canceled") {
      setStatus("Rejected");
    } else {
      setStatus("Approved");
    }
  }, [status]);

  return (
    <Chip
      sx={{
        textTransform: "capitalize",
        width: "auto",
        fontSize: "11px",
        fontWeight: 600,
        borderRadius: "10px",
        height: "20px",
        backgroundColor:
          row.status === "approved"
            ? "#1D5882"
            : row.status === "waiting"
            ? "#F6BE2D"
            : "#DE0606",
        color: "white",
      }}
      size="small"
      label={row.status}
    />
  );
};

export const EventStatus: React.FC<any> = ({ row }) => {
  const [status, setStatus] = useState<any>("");

  useEffect(() => {
    if (
      localStorage.getItem("FilterCampaignStatus") === "INPROGRESS" &&
      localStorage.getItem("FilterStatus") === "" &&
      // localStorage.getItem("FilterEventStatus") === "Invitation" &&
      localStorage.getItem("FilterOrderStatus") === "review"
    ) {
      setStatus("Invitation");
    } else if (
      localStorage.getItem("FilterCampaignStatus") === "DRAFT" &&
      localStorage.getItem("FilterStatus") === "waiting" &&
      // localStorage.getItem("FilterEventStatus") === "Review" &&
      localStorage.getItem("FilterOrderStatus") === ""
    ) {
      setStatus("Review");
    } else if (
      localStorage.getItem("FilterCampaignStatus") === "" &&
      localStorage.getItem("FilterStatus") === "rejected" &&
      // localStorage.getItem("FilterEventStatus") === "Canceled" &&
      localStorage.getItem("FilterOrderStatus") === ""
    ) {
      setStatus("Canceled");
    } else if (
      localStorage.getItem("FilterCampaignStatus") === "INPROGRESS" &&
      localStorage.getItem("FilterStatus") === "" &&
      // localStorage.getItem("FilterEventStatus") === "Confirmation" &&
      localStorage.getItem("FilterOrderStatus") === "terima"
    ) {
      setStatus("Confirmation");
    } else if (
      localStorage.getItem("FilterCampaignStatus") === "INPROGRESS" &&
      localStorage.getItem("FilterStatus") === "" &&
      // localStorage.getItem("FilterEventStatus") === "Process" &&
      localStorage.getItem("FilterOrderStatus") === "diproses"
    ) {
      setStatus("Process");
    } else if (
      localStorage.getItem("FilterCampaignStatus") === "FINISHED" &&
      localStorage.getItem("FilterStatus") === "" &&
      // localStorage.getItem("FilterEventStatus") === "Completed" &&
      localStorage.getItem("FilterOrderStatus") === ""
    ) {
      setStatus("Completed");
    } else if (
      localStorage.getItem("FilterCampaignStatus") === "OPEN" &&
      localStorage.getItem("FilterStatus") === "" &&
      // localStorage.getItem("FilterEventStatus") === "Fund" &&
      localStorage.getItem("FilterOrderStatus") === ""
    ) {
      setStatus("Fund");
    } else if (
      localStorage.getItem("FilterCampaignStatus") === "INPROGRESS" &&
      localStorage.getItem("FilterStatus") === "" &&
      // localStorage.getItem("FilterEventStatus") === "Report" &&
      localStorage.getItem("FilterOrderStatus") === "selesai"
    ) {
      setStatus("Report");
    }
  }, []);

  return (
    <Chip
      sx={{
        textTransform: "capitalize",
        width: "auto",
        fontSize: "11px",
        fontWeight: 600,
        borderRadius: "10px",
        height: "20px",
        backgroundColor:
          status === "Review"
            ? "#000000"
            : status === "Invitation"
            ? "#6B4EFF"
            : status === "Fund"
            ? "#1D5882"
            : status === "Confirmation"
            ? "#ff6b00"
            : status === "Process"
            ? "#FFB444"
            : status === "Report"
            ? "#6CB28E"
            : status === "Completed"
            ? "#3FB648"
            : status === "Canceled"
            ? "#DE0606"
            : "",
        color: "white",
      }}
      size="small"
      label={status ? status : row.campaign_status}
    />
  );
};
