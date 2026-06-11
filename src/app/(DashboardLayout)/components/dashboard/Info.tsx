import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getCampaignRevenueList,
  getCashInList,
  getCashOutList,
  getCouponRevenueList,
} from "../api/Dashboard";
import { useAppContext } from "../shared/Context";
import CampRevenueTableComponent from "./CampRevenueDataTable";
import CashInDataTable from "./CashInDataTable";
import CashOutDataTable from "./CashOutDataTable";
import CouponRevenueDataTable from "./CouponRevenueDataTable";
import moment from "moment";

type ChildProps = {
  data: {
    id: number;
    name: string;
    price: any;
    status: string;
    qty: string;
    note: string;
    description: string;
    total_amount: number;
    images: [{ id: number; image_url: string }];
  };
};

const Info: React.FC<any> = ({ filterYearValue, filterMonthValue }) => {
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useAppContext();
  const [couponRevData, setCouponData] = useState([]);
  const [couponMeta, setCouponMeta] = useState({});
  const [totalCouponAmount, setCouponTotalAmount] = useState();
  const [campaignMeta, setCampaignMeta] = useState({});
  const [campaignRevData, setCampaignData] = useState([]);
  const [totalCampaignAmount, setTotalCampaignAmount] = useState();

  const [cashInRevData, setCashInData] = useState([]);
  const [cashInMeta, setCashInMeta] = useState({});
  const [cashOutMeta, setCashOutMeta] = useState({});
  const [cashOutRevData, setCashOutData] = useState([]);
  const [totalCashInAmount, setCashInTotalAmount] = useState();
  const [totalCashOutnAmount, setTotalCashOutAmount] = useState();

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchParams.get("detail") === "cashflow") {
      getCashInList(
        setCashInData,
        setIsLoading,
        setCashInTotalAmount,
        setCashInMeta,
        1,
        filterMonthValue,
        filterYearValue
      );
      getCashOutList(
        setCashOutData,
        setIsLoading,
        setTotalCashOutAmount,
        setCashOutMeta,
        1,
        filterMonthValue,
        filterYearValue
      );
    } else {
      getCouponRevenueList(
        setCouponData,
        setIsLoading,
        setCouponTotalAmount,
        setCouponMeta,
        1,
        filterMonthValue,
        filterYearValue
      );
      getCampaignRevenueList(
        setCampaignData,
        setIsLoading,
        setTotalCampaignAmount,
        setCampaignMeta,
        1,
        filterMonthValue,
        filterYearValue
      );
    }
  }, [filterYearValue, filterMonthValue, searchParams, setIsLoading]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "10px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            List{" "}
            {searchParams.get("detail") === "revenue"
              ? "Campaign Revenue"
              : "Cash In"}{" "}
            ({searchParams.get("month")} {filterYearValue})
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}
          >
            <Typography sx={{ fontSize: "11px" }}>
              Total{" "}
              {searchParams.get("detail") === "revenue"
                ? "Campaign Revenue"
                : "Cash In"}{" "}
              {searchParams.get("month")} {filterYearValue}
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {searchParams.get("detail") === "cashflow"
                ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalCashInAmount || 0)
                : new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalCampaignAmount || 0)}
            </Typography>
          </Box>
        </Box>
        {searchParams.get("detail") === "cashflow" ? (
          <CashInDataTable data={cashInRevData} meta={cashInMeta} />
        ) : (
          <CampRevenueTableComponent
            data={campaignRevData}
            meta={campaignMeta}
          />
        )}
        <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            List{" "}
            {searchParams.get("detail") === "revenue"
              ? "Coupon Revenue"
              : "Cash Out"}{" "}
            ({searchParams.get("month")} {filterYearValue})
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}
          >
            <Typography sx={{ fontSize: "11px" }}>
              Total{" "}
              {searchParams.get("detail") === "revenue"
                ? "Coupon Revenue"
                : "Cash Out"}{" "}
              {searchParams.get("month")} {filterYearValue}
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {searchParams.get("detail") === "cashflow"
                ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalCashOutnAmount || 0)
                : new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalCouponAmount || 0)}
            </Typography>
          </Box>
        </Box>
        {searchParams.get("detail") === "cashflow" ? (
          <CashOutDataTable data={cashOutRevData} meta={cashOutMeta} />
        ) : (
          <CouponRevenueDataTable data={couponRevData} meta={couponMeta} />
        )}
      </Box>
      {/* <DetailCard title="Revenue"></DetailCard> */}
    </>
  );
};

export default Info;
