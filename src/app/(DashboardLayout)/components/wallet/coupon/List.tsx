import {
  Box,
  Button,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { IconEdit, IconWallet } from "@tabler/icons-react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getCouponWalletDetail,
  getCouponWalletExpiredClaimed,
  postCouponWalletTopup,
  updateCouponWalletPrice,
} from "../../api/Coupon";
import { getWalletList } from "../../api/Wallet";
import { useAppContext } from "../../shared/Context";
import BaseCard from "../../shared/DashboardCard";
import { DataTablesManualPagination } from "../../shared/DataTables";
import {
  ModalPopupCouponPrice,
  ModalPopupCouponTopup,
} from "../../shared/ModalPopup";
import Charts from "./Chart";
import DataTableComponent from "./DataTable";

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

const List = () => {
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useAppContext();
  const [isOpenAddDonation, setIsOpenAddDonation] = useState(false);
  const [isOpenCouponPrice, setIsOpenCouponPrice] = useState(false);
  const [valueWalletType, setValueWalletType] = useState("default");
  const [selectedWallet, setSelectedWallet] = useState("default");
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
  const [couponWalletDetail, setCouponWalletDetail] = useState<any>({});
  const [couponPriceChanges, setCouponPriceChanges] = useState("");
  const [expiredClaimedData, setExpiredClaimedSortedData] = useState([]);
  useEffect(() => {
    getCouponWalletDetail(setCouponWalletDetail, setIsLoading);
    getCouponWalletExpiredClaimed(setExpiredClaimedSortedData, setIsLoading);
  }, [setIsLoading]);

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Coupon Wallet
    </Typography>,
  ];

  const cashflowData = [
    {
      name: "Expired",
      data: expiredClaimedData
        .filter(
          (data: any) => data.month <= parseInt(moment(new Date()).format("M"))
        )
        .map((data: any) => data.expired),
    },
    {
      name: "Claimed",
      data: expiredClaimedData
        .filter(
          (data: any) => data.month <= parseInt(moment(new Date()).format("M"))
        )
        .map((data: any) => data.claimed),
    },
  ];

  const cashflowoptions: any = {
    series: cashflowData,
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FF1654", "#3FB648"],
    stroke: {
      width: [4, 4],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: [
      {
        axisBorder: {
          show: true,
          // color: "black",
        },
      },
    ],
    markers: {
      size: 5,
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

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
    if (localStorage.getItem("topupSucceed") === "true") {
      onSuccess();
    }
    if (localStorage.getItem("changeCouponSucceed") === "true") {
      onSuccessChangePrice();
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

  const onChangeChangeCouponPrice = (e: any) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setCouponPriceChanges(value);
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
        updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
          "id-ID",
          {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }
        ).format(row.balance);
        updatedDonationAmounts[existingIndex].value_num = row.balance;
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
        //       "id-ID",
        //       {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }
        //     ).format(
        //       updatedDonationAmounts[existingIndex].value_num + neededLeft
        //     );
        //     updatedDonationAmounts[existingIndex].value_num =
        //       updatedDonationAmounts[existingIndex].value_num + neededLeft;
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
        //       "id-ID",
        //       {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }
        //     ).format(needed);
        //     updatedDonationAmounts[existingIndex].value_num = needed;
        //   } else {
        //     updatedDonationAmounts[existingIndex].value = new Intl.NumberFormat(
        //       "id-ID",
        //       {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }
        //     ).format(
        //       updatedDonationAmounts[existingIndex].value_num + neededLeft
        //     );
        //     updatedDonationAmounts[existingIndex].value_num =
        //       updatedDonationAmounts[existingIndex].value_num + neededLeft;
        //   }
        // }
      } else {
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
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmounts.push({
        //       id: row.id,
        //       value: new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(neededLeft),
        //       value_num: neededLeft,
        //       name: row.name,
        //     });
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmounts.push({
        //       id: row.id,
        //       value: new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(needed),
        //       value_num: needed,
        //       name: row.name,
        //     });
        //   } else {
        //     updatedDonationAmounts.push({
        //       id: row.id,
        //       value: new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(neededLeft),
        //       value_num: neededLeft,
        //       name: row.name,
        //     });
        //   }
        // }
      }
      setDonationAmounts(updatedDonationAmounts);
    } else {
      if (existingIndexCsr !== -1) {
        updatedDonationAmountsCsr[existingIndexCsr].value =
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.balance);
        updatedDonationAmountsCsr[existingIndexCsr].value_num = row.balance;
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmountsCsr[existingIndexCsr].value =
        //       new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(
        //         updatedDonationAmountsCsr[existingIndexCsr].value_num +
        //           neededLeft
        //       );
        //     updatedDonationAmountsCsr[existingIndexCsr].value_num =
        //       updatedDonationAmountsCsr[existingIndexCsr].value_num +
        //       neededLeft;
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmountsCsr[existingIndexCsr].value =
        //       new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(needed);
        //     updatedDonationAmountsCsr[existingIndexCsr].value_num = needed;
        //   } else {
        //     updatedDonationAmountsCsr[existingIndexCsr].value =
        //       new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(
        //         updatedDonationAmountsCsr[existingIndexCsr].value_num +
        //           neededLeft
        //       );
        //     updatedDonationAmountsCsr[existingIndexCsr].value_num =
        //       updatedDonationAmountsCsr[existingIndexCsr].value_num +
        //       neededLeft;
        //   }
        // }
      } else {
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
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmountsCsr.push({
        //       id: row.id,
        //       value: new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(neededLeft),
        //       value_num: neededLeft,
        //       name: row.name,
        //     });
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmountsCsr.push({
        //       id: row.id,
        //       value: new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(needed),
        //       value_num: needed,
        //       name: row.name,
        //     });
        //   } else {
        //     updatedDonationAmountsCsr.push({
        //       id: row.id,
        //       value: new Intl.NumberFormat("id-ID", {
        //         style: "currency",
        //         currency: "IDR",
        //         minimumFractionDigits: 0,
        //       }).format(neededLeft),
        //       value_num: neededLeft,
        //       name: row.name,
        //     });
        //   }
        // }
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
        updatedDonationAmounts[existingIndex].amount = row.balance;
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmounts[existingIndex].amount =
        //       updatedDonationAmounts[existingIndex].amount + neededLeft;
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmounts[existingIndex].amount = needed;
        //   } else {
        //     updatedDonationAmounts[existingIndex].amount =
        //       updatedDonationAmounts[existingIndex].amount + neededLeft;
        //   }
        // }
      } else {
        updatedDonationAmounts.push({
          wallet_id: row.id,
          amount: row.balance,
        });
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmounts.push({
        //       wallet_id: row.id,
        //       amount: neededLeft,
        //     });
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmounts.push({
        //       wallet_id: row.id,
        //       amount: needed,
        //     });
        //   } else {
        //     updatedDonationAmounts.push({
        //       wallet_id: row.id,
        //       amount: neededLeft,
        //     });
        //   }
        // }
      }
      const initialValue = updatedDonationAmounts.reduce(
        (acc: number, item: ParsedDonationAmount) => acc + item.amount,
        0
      );
      setTotalDonationsAgnostic(initialValue);
      setParsedDonationAmounts(updatedDonationAmounts);
    } else {
      if (existingIndexCsr !== -1) {
        updatedDonationAmountsCsr[existingIndexCsr].amount = row.balance;
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmountsCsr[existingIndexCsr].amount =
        //       updatedDonationAmountsCsr[existingIndexCsr].amount + neededLeft;
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmountsCsr[existingIndexCsr].amount = needed;
        //   } else {
        //     updatedDonationAmountsCsr[existingIndexCsr].amount =
        //       updatedDonationAmountsCsr[existingIndexCsr].amount + neededLeft;
        //   }
        // }
      } else {
        updatedDonationAmountsCsr.push({
          wallet_id: row.id,
          amount: row.balance,
        });
        // if (needed >= row.balance) {
        //   if (neededLeft === 0 || neededLeft > row.balance) {
        //   } else {
        //     updatedDonationAmountsCsr.push({
        //       wallet_id: row.id,
        //       amount: neededLeft,
        //     });
        //   }
        // } else if (needed < row.balance) {
        //   if (neededLeft === 0) {
        //     updatedDonationAmountsCsr.push({
        //       wallet_id: row.id,
        //       amount: needed,
        //     });
        //   } else {
        //     updatedDonationAmountsCsr.push({
        //       wallet_id: row.id,
        //       amount: neededLeft,
        //     });
        //   }
        // }
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

  const onSuccessChangePrice = () => {
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
        localStorage.removeItem("changeCouponSucceed");
      },
    });
    Toast.fire({
      icon: "success",
      title: "Sukses merubah harga",
    });
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
      title: "Sukses memindah dana",
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
      title: `Anda yakin memindahkan dana?`,
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
        Total Pemindahan Dana ${new Intl.NumberFormat("id-ID", {
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
        postCouponWalletTopup(
          searchParams.get("id"),
          parsedDonationAmounts,
          parsedDonationAmountsCsr
        );
      }
    });
  };

  // useEffect(() => {
  //   getCampaignDetail(searchParams.get("id"), setData, setNeeded, setIsLoading);
  // }, []);

  useEffect(() => {
    onSort(sortField);
  }, [walletList]);

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
                theresErrorInput &&
                donationAmounts.find((item) => item.id === row.id)?.id !==
                  row.id
                // (theresErrorInput &&
                //   (donationAmounts.find((item) => item.id === row.id)
                //     ?.value_num || 0) <= row.balance)
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
                row.balance === 0
                // (theresErrorInput &&
                //   (donationAmounts.find((item) => item.id === row.id)
                //     ?.value_num || 0) <= row.balance) ||
                // row.balance === 0 ||
                // totalDonationsAgnostic + totalDonationsCsr >= needed ||
                // donationAmounts.find((item) => item.id === row.id)
                //   ?.value_num === row.balance
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
                row.balance === 0
                // (theresErrorInput &&
                //   (donationAmountsCsr.find((item) => item.id === row.id)
                //     ?.value_num || 0) <= row.balance)
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
                row.balance === 0
                // (theresErrorInput &&
                //   (donationAmountsCsr.find((item) => item.id === row.id)
                //     ?.value_num || 0) <= row.balance) ||
                // row.balance === 0 ||
                // totalDonationsAgnostic + totalDonationsCsr >= needed
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

  const handleSort = (column: any) => {
    setSortField(column);
    onSort(column);
  };

  return (
    <>
      <BaseCard title="Coupon Wallet" breadcrumb={breadcrumbs}>
        <Box sx={{ paddingX: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "medium",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Coupon Price :{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(couponWalletDetail.price_coupon || 0)}
                <button
                  onClick={() => {
                    setIsOpenCouponPrice(true);
                    let value = couponWalletDetail.price_coupon.toString();
                    value = value?.replace(/\D/g, "");
                    value = value?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    setCouponPriceChanges(value);
                  }}
                  style={{
                    cursor: "pointer",
                    padding: 0,
                    backgroundColor: "transparent",
                    border: 0,
                  }}
                >
                  <IconEdit color="#3FB648" size={19} />
                </button>
              </Typography>
              <Box
                sx={{
                  padding: "14px",
                  borderRadius: "10px",
                  width: "280px",
                  display: "flex",
                  flexDirection: "column",
                  background:
                    couponWalletDetail.qouta_available <= 0
                      ? "linear-gradient(to bottom, #C1C1C1, #707070)"
                      : "linear-gradient(to bottom, #FF4949, #FFBC5B)",
                }}
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
                >
                  KUPON BERSAMA
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    Makan Gratis
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      Tersedia
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "26px",
                        fontWeight: "bold",
                        color: "white",
                        marginTop: -1,
                      }}
                    >
                      {couponWalletDetail.qouta_available}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: "light",
                    color: "white",
                    marginTop: -2,
                  }}
                >
                  Dapat ditukarkan di merchant Foodia
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "medium" }}>
                Coupon Wallet Balance
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "24px", color: "#3FB648" }}
              >
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(couponWalletDetail.balance || 0)}
              </Typography>
            </Box>
          </Box>
          <button
            onClick={() => handleOpenAddDonation()}
            style={{
              display: "flex",
              backgroundColor: "#3FB648",
              gap: "10px",
              padding: "12px",
              border: 0,
              cursor: "pointer",
              borderRadius: "15px",
              width: "146px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconWallet color="white" />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "medium",
                color: "white",
              }}
            >
              Top Up
            </Typography>
          </button>
          <br />
          <Charts
            options={cashflowoptions}
            series={cashflowoptions.series}
            label="Claimed and Expired Coupon"
            type="line"
          />

          <DataTableComponent />
        </Box>
      </BaseCard>

      <ModalPopupCouponTopup
        open={isOpenAddDonation}
        handleClose={handleCloseAddDonation}
        campaign_name="Coupon Wallet"
        couponWalletBalance={couponWalletDetail.balance}
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
                (totalDonationsAgnostic == 0 && totalDonationsCsr == 0)
                // totalDonationsAgnostic + totalDonationsCsr >
                //   data?.donation_target - data?.donation_collected
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
              Transfer Balance
            </Button>
          </Box>
        </>
      </ModalPopupCouponTopup>

      <ModalPopupCouponPrice
        open={isOpenCouponPrice}
        onClick={() => (
          setIsLoading(true),
          setIsOpenCouponPrice(false),
          updateCouponWalletPrice(
            parseInt(couponPriceChanges.replace(/\./g, "")),
            setIsLoading
          )
        )}
        handleClose={() => setIsOpenCouponPrice(false)}
        value={couponPriceChanges}
        onChange={(e: any) => onChangeChangeCouponPrice(e)}
      />
    </>
  );
};

export default List;
