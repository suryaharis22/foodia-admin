"use client";
import { Approvals } from "@/app/(DashboardLayout)/components/api/Approvals";
import {
  getCampaignDetail,
  postCampaignPayment,
} from "@/app/(DashboardLayout)/components/api/Campaign";
import { getWalletList } from "@/app/(DashboardLayout)/components/api/Wallet";
import Detonator from "@/app/(DashboardLayout)/components/campaign/Detonator";
import Donators from "@/app/(DashboardLayout)/components/campaign/Donators";
import Info from "@/app/(DashboardLayout)/components/campaign/Info";
import Maps from "@/app/(DashboardLayout)/components/campaign/Maps";
import Orders from "@/app/(DashboardLayout)/components/campaign/Orders";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import DataTables, {
  DataTablesManualPagination,
} from "@/app/(DashboardLayout)/components/shared/DataTables";
import {
  ModalPopupAddDonations,
  ModalPopupApprovals,
} from "@/app/(DashboardLayout)/components/shared/ModalPopup";
import {
  Box,
  Button,
  Grid,
  Input,
  InputAdornment,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconBan, IconCircleCheck, IconCirclePlus } from "@tabler/icons-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { it } from "node:test";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  id: number;
  event_name: string;
  event_date: string;
  event_type: string;
  event_time: string;
  description: string;
  note: string;
  donation_target: any;
  donation_collected: any;
  donation_remaining: any;
  status: string;
  campaign_status: string;
  order_status: string;
  image_url: string;
  food_required: number;
  food_total: number;
  latitude: any;
  longitude: any;
  address: string;
  sub_district: string;
  city: string;
  province: string;
  postal_code: string;
  detonator: {
    id: number;
    status: string;
    self_photo: string;
    oauth: { fullname: string; email: string; phone: string };
  };
  orders: [
    {
      id: number;
      order_status: string;
      qty: number;
      total_amount: number;
      total_tax: number;
      merchant: { oauth: { fullname: string } };
      merchant_product: {
        id: number;
        name: string;
        price: string;
        images: [{ image_url: string }];
      };
    }
  ];
  campaign_donation: {
    id: number;
    transaction: {
      sender_name: string;
      amount: number;
      transaction_type: string;
      transaction_date: string;
      transaction_status: string;
    };
  }[];
};

interface ParsedDonationAmount {
  wallet_id: number;
  amount: number;
}

interface DonationAmount {
  id: number;
  value: string;
  value_num: number;
  name: string;
}

const CampaignInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useAppContext();
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddDonation, setIsOpenAddDonation] = useState(false);
  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [valueWalletType, setValueWalletType] = useState("default");
  const [selectedWallet, setSelectedWallet] = useState("default");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [data, setData] = useState<Props>({
    id: 0,
    event_name: "",
    event_date: "",
    event_type: "",
    event_time: "",
    description: "",
    note: "",
    donation_target: "",
    donation_collected: "",
    donation_remaining: "",
    status: "",
    campaign_status: "",
    order_status: "",
    image_url: "",
    food_required: 0,
    food_total: 0,
    latitude: "",
    longitude: "",
    address: "",
    sub_district: "",
    city: "",
    province: "",
    postal_code: "",
    detonator: {
      id: 0,
      status: "",
      self_photo: "",
      oauth: { fullname: "", email: "", phone: "" },
    },
    orders: [
      {
        id: 0,
        order_status: "",
        qty: 0,
        total_amount: 0,
        total_tax: 0,
        merchant: { oauth: { fullname: "" } },
        merchant_product: {
          id: 0,
          name: "",
          price: "",
          images: [{ image_url: "" }],
        },
      },
    ],
    campaign_donation: [
      {
        id: 0,
        transaction: {
          sender_name: "",
          amount: 0,
          transaction_type: "",
          transaction_date: "",
          transaction_status: "",
        },
      },
    ],
  });
  const [walletList, setWalletList] = useState([]);
  const [fieldsCsrWalletSelection, setFields] = useState([""]);
  const [parsedDonationAmounts, setParsedDonationAmounts] = useState<
    ParsedDonationAmount[]
  >([]);
  const [parsedDonationAmountsCsr, setParsedDonationAmountsCsr] = useState<
    ParsedDonationAmount[]
  >([]);
  const [donationAmounts, setDonationAmounts] = useState<DonationAmount[]>([]);
  const [donationAmountsCsr, setDonationAmountsCsr] = useState<
    DonationAmount[]
  >([]);
  const [totalDonationsAgnostic, setTotalDonationsAgnostic] = useState(0);
  const [totalDonationsCsr, setTotalDonationsCsr] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [theresErrorInput, setTheresErrorInput] = useState(false);
  const [needed, setNeeded] = useState(0);
  const [neededLeft, setNeededLeft] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("deposit");
  const [sortAsc, setSortAsc] = useState(true);
  const [sortedData, setSortedData] = useState([]);

  // console.log("---------------------------");
  // console.log("parsedAg", parsedDonationAmounts);
  // console.log("parsedCsr", parsedDonationAmountsCsr);
  // console.log("donAg", donationAmounts);
  // console.log("donCsr", donationAmountsCsr);
  // console.log("TotAg", totalDonationsAgnostic);
  // console.log("TotCsr", totalDonationsCsr);
  // console.log(valueWalletType);
  // console.log("we", needed);

  useEffect(() => {
    setNeededLeft(needed - (totalDonationsAgnostic + totalDonationsCsr));
    if (localStorage.getItem("addDonationSucceed") === "true") {
      onSuccess();
    }
  }, [needed, totalDonationsAgnostic, totalDonationsCsr]);

  const Amounts = (e: any, row: any) => {
    let { value } = e.target;

    value = value.replace(/\D/g, "");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const updatedDonationAmounts = [...donationAmounts];
    const updatedDonationAmountsCsr = [...donationAmountsCsr];

    const existingIndex = updatedDonationAmounts.findIndex(
      (item) => item.id === row.id
    );

    const existingIndexCsr = updatedDonationAmountsCsr.findIndex(
      (item) => item.id === row.id
    );

    if (valueWalletType === "agnostic") {
      if (value !== "" && parseInt(value.replace(/\./g, "")) > 0) {
        if (existingIndex !== -1) {
          updatedDonationAmounts[existingIndex].value = value
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(parseInt(value.replace(/\./g, "")))
            : value;
          updatedDonationAmounts[existingIndex].value_num = parseInt(
            value.replace(/\./g, "")
          );
        } else {
          updatedDonationAmounts.push({
            id: row.id,
            value: value
              ? new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(parseInt(value.replace(/\./g, "")))
              : value,
            value_num: parseInt(value.replace(/\./g, "")),
            name: row.name,
          });
        }
      } else {
        if (existingIndex !== -1 && value === "") {
          updatedDonationAmounts.splice(existingIndex, 1);
        }
      }
      setDonationAmounts(updatedDonationAmounts);
    } else {
      if (value !== "" && parseInt(value.replace(/\./g, "")) > 0) {
        if (existingIndexCsr !== -1) {
          updatedDonationAmountsCsr[existingIndexCsr].value = value
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(parseInt(value.replace(/\./g, "")))
            : value;
          updatedDonationAmountsCsr[existingIndexCsr].value_num = parseInt(
            value.replace(/\./g, "")
          );
        } else {
          updatedDonationAmountsCsr.push({
            id: row.id,
            value: value
              ? new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(parseInt(value.replace(/\./g, "")))
              : value,
            value_num: parseInt(value.replace(/\./g, "")),
            name: row.name,
          });
        }
      } else {
        if (existingIndexCsr !== -1 && value === "") {
          updatedDonationAmountsCsr.splice(existingIndexCsr, 1);
        }
      }
      setDonationAmountsCsr(updatedDonationAmountsCsr);
    }
  };

  const onChangeAddDonationAmount = (e: any, row: any) => {
    let { value } = e?.target;
    value = value.replace(/\D/g, "");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const updatedDonationAmounts = [...parsedDonationAmounts];
    const updatedDonationAmountsCsr = [...parsedDonationAmountsCsr];

    const existingIndex = updatedDonationAmounts.findIndex(
      (item) => item.wallet_id === row.id
    );

    const existingIndexCsr = updatedDonationAmountsCsr.findIndex(
      (item) => item.wallet_id === row.id
    );

    if (valueWalletType === "agnostic") {
      if (
        value !== "" &&
        parseInt(value.replace(/\./g, "")) <= row.balance &&
        parseInt(value.replace(/\./g, "")) > 0
      ) {
        if (existingIndex !== -1) {
          updatedDonationAmounts[existingIndex].amount = parseInt(
            value.replace(/\./g, "")
          );
          // setNeededLeft(neededLeft + parseInt(value.replace(/\./g, "")));
        } else {
          updatedDonationAmounts.push({
            wallet_id: row.id,
            amount: parseInt(value.replace(/\./g, "")),
          });
          // setNeededLeft(neededLeft + parseInt(value.replace(/\./g, "")));
        }
      } else {
        if (existingIndex !== -1 && value === "") {
          updatedDonationAmounts.splice(existingIndex, 1);
        }
      }
      const initialValue = updatedDonationAmounts.reduce(
        (acc: number, item: ParsedDonationAmount) => acc + item.amount,
        0
      );
      if (parseInt(value.replace(/\./g, "")) > row.balance) {
        // setTotalDonations(0);
        setTheresErrorInput(true);
      } else {
        setTotalDonationsAgnostic(initialValue);
        setTheresErrorInput(false);
      }
      setParsedDonationAmounts(updatedDonationAmounts);
    } else {
      if (
        value !== "" &&
        parseInt(value.replace(/\./g, "")) <= row.balance &&
        parseInt(value.replace(/\./g, "")) > 0
      ) {
        if (existingIndexCsr !== -1) {
          updatedDonationAmountsCsr[existingIndexCsr].amount = parseInt(
            value.replace(/\./g, "")
          );
        } else {
          updatedDonationAmountsCsr.push({
            wallet_id: row.id,
            amount: parseInt(value.replace(/\./g, "")),
          });
        }
      } else {
        if (existingIndexCsr !== -1 && value === "") {
          updatedDonationAmountsCsr.splice(existingIndexCsr, 1);
        }
      }
      const initialValue = updatedDonationAmountsCsr.reduce(
        (acc: number, item: ParsedDonationAmount) => acc + item.amount,
        0
      );
      if (parseInt(value.replace(/\./g, "")) > row.balance) {
        // setTotalDonations(0);
        setTheresErrorInput(true);
      } else {
        setTotalDonationsCsr(initialValue);
        setTheresErrorInput(false);
      }
      setParsedDonationAmountsCsr(updatedDonationAmountsCsr);
    }

    Amounts(e, row);
  };

  const onSetMaxAmounts = (row: any) => {
    const updatedDonationAmounts = [...donationAmounts];
    const updatedDonationAmountsCsr = [...donationAmountsCsr];

    const existingIndex = updatedDonationAmounts.findIndex(
      (item) => item.id === row.id
    );
    const existingIndexCsr = updatedDonationAmountsCsr.findIndex(
      (item) => item.id === row.id
    );
    if (valueWalletType === "agnostic") {
      if (existingIndex !== -1) {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
              "id-ID",
              {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }
            ).format(row.balance);
            updatedDonationAmounts[existingIndex].value_num = row.balance;
          } else {
            updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
              "id-ID",
              {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }
            ).format(
              updatedDonationAmounts[existingIndex].value_num + neededLeft
            );
            updatedDonationAmounts[existingIndex].value_num =
              updatedDonationAmounts[existingIndex].value_num + neededLeft;
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
              "id-ID",
              {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }
            ).format(needed);
            updatedDonationAmounts[existingIndex].value_num = needed;
          } else {
            updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
              "id-ID",
              {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }
            ).format(
              updatedDonationAmounts[existingIndex].value_num + neededLeft
            );
            updatedDonationAmounts[existingIndex].value_num =
              updatedDonationAmounts[existingIndex].value_num + neededLeft;
          }
        }
      } else {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmounts.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(row.balance),
              value_num: row.balance,
              name: row.name,
            });
          } else {
            updatedDonationAmounts.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(neededLeft),
              value_num: neededLeft,
              name: row.name,
            });
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmounts.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(needed),
              value_num: needed,
              name: row.name,
            });
          } else {
            updatedDonationAmounts.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(neededLeft),
              value_num: neededLeft,
              name: row.name,
            });
          }
        }
      }
      setDonationAmounts(updatedDonationAmounts);
    } else {
      if (existingIndexCsr !== -1) {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmountsCsr[existingIndexCsr].value =
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(row.balance);
            updatedDonationAmountsCsr[existingIndexCsr].value_num = row.balance;
          } else {
            updatedDonationAmountsCsr[existingIndexCsr].value =
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(
                updatedDonationAmountsCsr[existingIndexCsr].value_num +
                  neededLeft
              );
            updatedDonationAmountsCsr[existingIndexCsr].value_num =
              updatedDonationAmountsCsr[existingIndexCsr].value_num +
              neededLeft;
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmountsCsr[existingIndexCsr].value =
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(needed);
            updatedDonationAmountsCsr[existingIndexCsr].value_num = needed;
          } else {
            updatedDonationAmountsCsr[existingIndexCsr].value =
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(
                updatedDonationAmountsCsr[existingIndexCsr].value_num +
                  neededLeft
              );
            updatedDonationAmountsCsr[existingIndexCsr].value_num =
              updatedDonationAmountsCsr[existingIndexCsr].value_num +
              neededLeft;
          }
        }
      } else {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmountsCsr.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(row.balance),
              value_num: row.balance,
              name: row.name,
            });
          } else {
            updatedDonationAmountsCsr.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(neededLeft),
              value_num: neededLeft,
              name: row.name,
            });
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmountsCsr.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(needed),
              value_num: needed,
              name: row.name,
            });
          } else {
            updatedDonationAmountsCsr.push({
              id: row.id,
              value: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(neededLeft),
              value_num: neededLeft,
              name: row.name,
            });
          }
        }
      }
      setDonationAmountsCsr(updatedDonationAmountsCsr);
    }
  };

  const onSetMax = (row: any) => {
    setTheresErrorInput(false);
    const updatedDonationAmounts = [...parsedDonationAmounts];
    const updatedDonationAmountsCsr = [...parsedDonationAmountsCsr];
    const existingIndex = updatedDonationAmounts.findIndex(
      (item) => item.wallet_id === row.id
    );
    const existingIndexCsr = updatedDonationAmountsCsr.findIndex(
      (item) => item.wallet_id === row.id
    );
    if (valueWalletType === "agnostic") {
      if (existingIndex !== -1) {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmounts[existingIndex].amount = row.balance;
          } else {
            updatedDonationAmounts[existingIndex].amount =
              updatedDonationAmounts[existingIndex].amount + neededLeft;
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmounts[existingIndex].amount = needed;
          } else {
            updatedDonationAmounts[existingIndex].amount =
              updatedDonationAmounts[existingIndex].amount + neededLeft;
          }
        }
      } else {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmounts.push({
              wallet_id: row.id,
              amount: row.balance,
            });
          } else {
            updatedDonationAmounts.push({
              wallet_id: row.id,
              amount: neededLeft,
            });
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmounts.push({
              wallet_id: row.id,
              amount: needed,
            });
          } else {
            updatedDonationAmounts.push({
              wallet_id: row.id,
              amount: neededLeft,
            });
          }
        }
      }
      const initialValue = updatedDonationAmounts.reduce(
        (acc: number, item: ParsedDonationAmount) => acc + item.amount,
        0
      );
      setTotalDonationsAgnostic(initialValue);
      setParsedDonationAmounts(updatedDonationAmounts);
    } else {
      if (existingIndexCsr !== -1) {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmountsCsr[existingIndexCsr].amount = row.balance;
          } else {
            updatedDonationAmountsCsr[existingIndexCsr].amount =
              updatedDonationAmountsCsr[existingIndexCsr].amount + neededLeft;
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmountsCsr[existingIndexCsr].amount = needed;
          } else {
            updatedDonationAmountsCsr[existingIndexCsr].amount =
              updatedDonationAmountsCsr[existingIndexCsr].amount + neededLeft;
          }
        }
      } else {
        if (needed >= row.balance) {
          if (neededLeft === 0 || neededLeft > row.balance) {
            updatedDonationAmountsCsr.push({
              wallet_id: row.id,
              amount: row.balance,
            });
          } else {
            updatedDonationAmountsCsr.push({
              wallet_id: row.id,
              amount: neededLeft,
            });
          }
        } else if (needed < row.balance) {
          if (neededLeft === 0) {
            updatedDonationAmountsCsr.push({
              wallet_id: row.id,
              amount: needed,
            });
          } else {
            updatedDonationAmountsCsr.push({
              wallet_id: row.id,
              amount: neededLeft,
            });
          }
        }
      }
      const initialValue = updatedDonationAmountsCsr.reduce(
        (acc: number, item: ParsedDonationAmount) => acc + item.amount,
        0
      );
      setTotalDonationsCsr(initialValue);
      setParsedDonationAmountsCsr(updatedDonationAmountsCsr);
    }
    onSetMaxAmounts(row);
  };

  const onChangeWalletType = (event: SelectChangeEvent) => {
    setIsLoading(true);
    setSortAsc(true);
    setSortField("deposit");
    setCurrentPage(0);
    setValueWalletType(event.target.value);
    setSelectedWallet("default");
    getWalletList(setWalletList, event.target.value, setIsLoading);
  };

  const onChangeSelectedWallet = (event: SelectChangeEvent) => {
    setSelectedWallet(event.target.value);
  };

  const handleOpenAddDonation = () => {
    setIsOpenAddDonation(true);
  };

  const handleCloseAddDonation = () => {
    setIsOpenAddDonation(false);
  };

  const onSuccess = () => {
    const Toast = Swal.mixin({
      allowOutsideClick: false,
      toast: true,
      position: "top",
      customClass: {
        popup: "toast-padding-top",
      },
      showConfirmButton: false,
      timer: 5000,
      // timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        localStorage.removeItem("topupSucceed");
      },
    });
    Toast.fire({
      icon: "success",
      title: "Sukses menambah dana",
    });
  };

  const handleAddDonation = () => {
    setIsOpenAddDonation(false);
    Swal.fire({
      allowOutsideClick: false,
      customClass: {
        popup: "custom-swal",
        // icon: "custom-icon-swal",
        title: "custom-title-swal",
        confirmButton: "custom-confirm-button-swal",
        cancelButton: "custom-cancel-button-swal",
      },
      // icon: "success",
      title: `Anda yakin menambahkan donasi?`,
      html: `
        <div style="display: flex; flex-direction: row; gap: 10px; width: 100%; padding-top: 10px; padding-bottom: 10px">
          ${
            donationAmountsCsr.length > 0
              ? `<div style="display: flex; flex-direction: column; width: 100%; align-items: start; gap: 10px">
            <p>CSR Wallet</p>
            <div style="max-height: 300px; width: 300px; overflow-y: auto; background-color: #f9f9f9; padding: 5px; border-radius: 5px;">
            ${donationAmountsCsr
              .map(
                (data) => `<p>${data.name} -  
                ${new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.value_num)}</p>`
              )
              .join("")}
            </div>
          </div>`
              : ``
          }
          ${
            donationAmounts.length > 0
              ? `<div style="display: flex; flex-direction: column; width: 100%; align-items: start; gap: 10px">
            <p>Agnostic Wallet</p>
            <div style="max-height: 300px; width: 300px; overflow-y: auto; background-color: #f9f9f9; padding: 5px; border-radius: 5px;">
            ${donationAmounts
              .map(
                (data) => `<p>${data.name} -  
                ${new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.value_num)}</p>`
              )
              .join("")}
            </div>
          </div>`
              : ``
          }
        </div>
        Total Tambaan Donasi ${new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(totalDonationsAgnostic + totalDonationsCsr)}
      `,
      width: "260px",
      showCancelButton: true,
      cancelButtonText: `Ya`,
      cancelButtonColor: "#3FB648",
      confirmButtonText: `Batal`,
      confirmButtonColor: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsOpenAddDonation(true);
      } else if (result.isDismissed) {
        postCampaignPayment(
          searchParams.get("id"),
          parsedDonationAmounts,
          parsedDonationAmountsCsr
        );
      }
    });
  };

  const handleOpen = (id: number, status: string, name: string) => {
    setIsOpen(true);
    setName(name);
    setId(id);
    setStatus(status);
  };

  const handleClose = () => {
    setIsOpen(false);
    // setValueEventTypeSelect("default");
  };

  const [prevPage, setPrevPage] = useState<any>();

  useEffect(() => {
    getCampaignDetail(searchParams.get("id"), setData, setNeeded, setIsLoading);
    setPrevPage(localStorage.getItem("prevPage"));
  }, [searchParams, setIsLoading]);

  const breadcrumbs = [
    <Button
      onClick={() => {
        setIsLoading(true);
        prevPage ? router.back() : router.push("/ui-components/pages/campaign");
        localStorage.removeItem("prevPage");
      }}
      key={0}
      sx={{
        p: 0,
        fontSize: "13px",
        color: "#000",
        fontWeight: 400,
        ":hover": { color: "blue" },
      }}
    >
      {prevPage ? "Revenue List" : "Campaign List"}
    </Button>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Campaign Detail
    </Typography>,
  ];

  const columns = [
    {
      id: "number",
      name: "#",
      selector: (row: any) => row.id,
      cell: (_row: any, i: any) => i + 1 + currentPage * 5,
      width: "65px",
      // sortable: true,
      // sortFunction: () => handleSort("number"),
    },
    {
      id: "name",
      name: "Nama Donator",
      selector: (row: any) => row.name,
      cell: (row: any) => (
        <Typography sx={{ fontSize: "13px" }}>{row.name}</Typography>
      ),
      sortable: true,
      sortFunction: () => handleSort("name"),
    },
    {
      id: "deposit",
      name: "Deposit",
      selector: (row: any) => row.balance,
      cell: (row: any) => (
        <Typography sx={{ fontSize: "13px" }}>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.balance)}
        </Typography>
      ),
      sortable: true,
      sortFunction: () => handleSort("deposit"),
    },
    {
      id: "lastTrx",
      name: "Last Transaction",
      selector: (row: any) => new Date(row.updated_at).getTime(),
      cell: (row: any) => (
        <Typography sx={{ fontSize: "13px" }}>
          {moment(row.updated_at).format("DD/MM/YYYY hh:mm")}
        </Typography>
      ),
      sortable: true,
      sortFunction: () => handleSort("lastTrx"),
    },
    {
      name: "Jumlah Donasi",
      cell: (row: any) =>
        valueWalletType === "agnostic" ? (
          <Box sx={{ display: "flex", gap: "3px" }}>
            <TextField
              disabled={
                (theresErrorInput &&
                  donationAmounts.find((item) => item.id === row.id)?.id !==
                    row.id) ||
                (theresErrorInput &&
                  (donationAmounts.find((item) => item.id === row.id)
                    ?.value_num || 0) <= row.balance)
              }
              variant="standard"
              size="small"
              value={
                donationAmounts.find((item) => item.id === row.id)?.value || ""
              }
              type="text"
              onChange={(e) => onChangeAddDonationAmount(e, row)}
              sx={{
                border: `1px solid ${
                  row.balance <
                  (donationAmounts.find((item) => item.id === row.id)
                    ?.value_num || 0)
                    ? "red"
                    : "lightgrey"
                }`,
                paddingX: "10px",
                paddingTop: "3px",
                borderRadius: "5px",
              }}
              InputProps={{
                style: {
                  color: `${
                    row.balance <
                    (donationAmounts.find((item) => item.id === row.id)
                      ?.value_num || 0)
                      ? "red"
                      : "black"
                  }`,
                },
                disableUnderline: true,
              }}
            />
            <Button
              disabled={
                (theresErrorInput &&
                  donationAmounts.find((item) => item.id === row.id)?.id !==
                    row.id) ||
                (theresErrorInput &&
                  (donationAmounts.find((item) => item.id === row.id)
                    ?.value_num || 0) <= row.balance) ||
                row.balance === 0 ||
                totalDonationsAgnostic + totalDonationsCsr >= needed ||
                donationAmounts.find((item) => item.id === row.id)
                  ?.value_num === row.balance
              }
              variant="contained"
              size="small"
              onClick={() => {
                onSetMax(row);
              }}
              sx={{
                display: "flex",
                padding: 0,
                minHeight: 0,
                minWidth: "48px",
                backgroundColor: "#ffff",
                color: "black",
                fontSize: "12px",
                justifyContent: "start",
                width: "1px",
                ":hover": {
                  boxShadow: "none",
                  backgroundColor: "#ffff",
                },
                ":disabled": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Set Max.
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "3px" }}>
            <TextField
              disabled={
                (theresErrorInput &&
                  donationAmountsCsr.find((item) => item.id === row.id)?.id !==
                    row.id) ||
                (theresErrorInput &&
                  (donationAmountsCsr.find((item) => item.id === row.id)
                    ?.value_num || 0) <= row.balance)
              }
              variant="standard"
              size="small"
              value={
                donationAmountsCsr.find((item) => item.id === row.id)?.value ||
                ""
              }
              type="text"
              onChange={(e) => onChangeAddDonationAmount(e, row)}
              sx={{
                border: `1px solid ${
                  row.balance <
                  (donationAmountsCsr.find((item) => item.id === row.id)
                    ?.value_num || 0)
                    ? "red"
                    : "lightgrey"
                }`,
                paddingX: "10px",
                paddingTop: "3px",
                borderRadius: "5px",
              }}
              InputProps={{
                style: {
                  color: `${
                    row.balance <
                    (donationAmountsCsr.find((item) => item.id === row.id)
                      ?.value_num || 0)
                      ? "red"
                      : "black"
                  }`,
                },
                disableUnderline: true,
              }}
            />
            <Button
              disabled={
                (theresErrorInput &&
                  donationAmountsCsr.find((item) => item.id === row.id)?.id !==
                    row.id) ||
                (theresErrorInput &&
                  (donationAmountsCsr.find((item) => item.id === row.id)
                    ?.value_num || 0) <= row.balance) ||
                row.balance === 0 ||
                totalDonationsAgnostic + totalDonationsCsr >= needed
              }
              variant="contained"
              size="small"
              onClick={() => {
                onSetMax(row);
              }}
              sx={{
                display: "flex",
                padding: 0,
                minHeight: 0,
                minWidth: "48px",
                backgroundColor: "#ffff",
                color: "black",
                fontSize: "12px",
                justifyContent: "start",
                width: "1px",
                ":hover": {
                  boxShadow: "none",
                  backgroundColor: "#ffff",
                },
                ":disabled": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Set Max.
            </Button>
          </Box>
        ),
      width: "260px",
      sortable: false,
    },
  ];

  let filteredItems = sortedData;
  if (sortedData) {
    filteredItems = sortedData.filter((data: any) =>
      data.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const onSort = (column: any) => {
    if (sortField === column) {
      const sorted = walletList.sort((a: any, b: any) => {
        if (column === "name") {
          return sortAsc
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        }
        if (column === "deposit") {
          return sortAsc ? b.balance - a.balance : a.balance - b.balance;
        }
        if (column === "lastTrx") {
          return sortAsc
            ? new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            : new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime();
        }
      });
      setSortedData(sorted);
    } else {
      const sorted = walletList.sort((a: any, b: any) => {
        if (column === "name") {
          return sortAsc
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        }
        if (column === "deposit") {
          return sortAsc ? b.balance - a.balance : a.balance - b.balance;
        }
        if (column === "lastTrx") {
          return sortAsc
            ? new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            : new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime();
        }
      });
      setSortedData(sorted);
    }
  };

  useEffect(() => {
    onSort(sortField);
  }, [walletList]);

  const handleSort = (column: any) => {
    setSortField(column);
    onSort(column);
  };

  // const [checkboxes, setCheckboxes] = useState([
  //   { id: 1, label: "Email", checked: false },
  //   { id: 2, label: "Phone Number", checked: false },
  //   { id: 3, label: "KTP Number", checked: false },
  //   { id: 4, label: "KTP Photo", checked: false },
  // ]);

  // Handler for checkbox change
  // const handleCheckboxChange = (id: number) => {
  //   setCheckboxes((prevState) =>
  //     prevState.map((checkbox) =>
  //       checkbox.id === id
  //         ? { ...checkbox, checked: !checkbox.checked } // Toggle the checked state
  //         : checkbox
  //     )
  //   );
  // };

  // const errorNotes = `${checkboxes[0].checked ? "email," : ""}${
  //   checkboxes[1].checked ? "phoneNumber," : ""
  // }${checkboxes[2].checked ? "ktpNumber," : ""}${
  //   checkboxes[3].checked ? "ktpPhoto," : ""
  // }`;

  // useEffect(() => {
  //   console.log(errorNotes + note);
  // });

  return (
    <>
      <DashboardCard title="Campaign Detail" breadcrumb={breadcrumbs}>
        <>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <Info data={data} />
              <Donators data={data.campaign_donation} />
            </Grid>
            <Grid item xs={6} lg={6}>
              <Detonator data={data} />
              <Orders data={data} />
              <Maps data={data} />
              {/* <Attachment data={data} /> */}
            </Grid>
          </Grid>
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
                disabled={
                  data.donation_collected >= data.donation_target ||
                  data.status !== "approved" ||
                  data.campaign_status === "FINISHED"
                }
                onClick={() => handleOpenAddDonation()}
              >
                <IconCirclePlus size={18} /> Add Donation
              </Button>
              <Button
                variant="contained"
                size="large"
                color="success"
                disabled={data.status === "approved"}
                onClick={() => handleOpen(data.id, "approved", data.event_name)}
              >
                <IconCircleCheck size={18} /> Approve
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                disabled={data.status === "rejected"}
                onClick={() => handleOpen(data.id, "rejected", data.event_name)}
              >
                <IconBan size={16} /> Reject
              </Button>
            </Stack>
          </Box>
        </>
      </DashboardCard>

      <ModalPopupAddDonations
        open={isOpenAddDonation}
        handleClose={handleCloseAddDonation}
        campaign_name={data.event_name}
        required_donation={data.donation_target}
        collected_donation={data.donation_collected}
        valueWalletType={valueWalletType}
        onChangeWalletType={onChangeWalletType}
        walletList={walletList}
        selectedWallet={selectedWallet}
        onChangeSelectedWallet={onChangeSelectedWallet}
        onChangeAddDonationAmount={onChangeAddDonationAmount}
        valueDonationAmount={
          valueWalletType === "agnostic"
            ? totalDonationsAgnostic
            : totalDonationsCsr
        }
        totalValueDonationAmount={totalDonationsAgnostic + totalDonationsCsr}
        fieldsCsrWalletSelection={fieldsCsrWalletSelection}
        theresInputError={theresErrorInput}
      >
        <>
          <DataTablesManualPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            columns={columns}
            data={filteredItems}
            pagination={true}
            search={true}
            onChangeSearch={(e: any) => setSearchText(e.target.value)}
            // handleSort={handleSort}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => handleAddDonation()}
              disabled={
                theresErrorInput ||
                (totalDonationsAgnostic == 0 && totalDonationsCsr == 0) ||
                totalDonationsAgnostic + totalDonationsCsr >
                  data?.donation_target - data?.donation_collected
              }
              sx={{
                width: "15%",
                borderRadius: "10px",
                backgroundColor: "#3FB648",
                color: "white",
                ":disabled": {
                  backgroundColor: "#F5F4F8",
                  color: "#A1A5C1",
                  "&:hover": {
                    backgroundColor: "#F5F4F8",
                  },
                },
                "&:hover": {
                  backgroundColor: "#3FB648",
                },
              }}
            >
              Tambah Donasi
            </Button>
          </Box>
        </>
      </ModalPopupAddDonations>

      <ModalPopupApprovals
        isLoading={isLoadingModal}
        open={isOpen}
        handleClose={handleClose}
        status={status}
        name={name}
        errs={false}
        note={note}
        onChange={(e: any) => setNote(e.target.value)}
        // checkboxes={checkboxes}
        // handleCheckboxChange={handleCheckboxChange}
        handleSubmit={() => {
          setIsLoadingModal(true);
          Approvals(
            ids,
            status,
            note,
            setIsOpen,
            "campaign",
            setIsLoadingModal
            // valueEventTypeSelect
          );
        }}
      />
    </>
  );
};

export default CampaignInfo;
