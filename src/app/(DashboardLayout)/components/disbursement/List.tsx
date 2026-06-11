import { Box, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import DataTableComponent from "./DataTable";
import { useEffect, useState } from "react";
import { getDisbursementSummary } from "../api/Disbursement";
import { useAppContext } from "../shared/Context";
import moment from "moment";

const List = () => {
  const [data, setData] = useState<any>([]);
  const { isLoading, setIsLoading } = useAppContext();

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Dashboard
    </Typography>,
  ];

  useEffect(() => {
    getDisbursementSummary(setData, setIsLoading);
  }, [setIsLoading]);

  const cards = [
    {
      id: 1,
      title: "Waiting",
      amount: data.waiting || 0,
      borderColor: "#FFB444",
    },
    {
      id: 2,
      title: "Rejected",
      amount: data.rejected || 0,
      borderColor: "#DE0606",
    },
    {
      id: 3,
      title: "Approved",
      amount: data.approved || 0,
      borderColor: "#3FB648",
    },
  ];

  return (
    <>
      <DashboardCard
        title="Dashboard"
        breadcrumb={breadcrumbs}
        lastUpdate={
          (!isLoading && moment(new Date()).format("YYYY-MM-DD hh:mm:ss")) || 0
        }
      >
        <Box sx={{ paddingX: "30px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Withdrawal
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                Merchant Balance
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.merchant_balance || 0)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              gap: "7px",
            }}
          >
            {cards.map((items) => (
              <Box
                key={items.id}
                sx={{
                  padding: "15px",
                  borderRadius: "10px",
                  width: "240px",
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${items.borderColor}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: items.borderColor,
                  }}
                >
                  {items.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: items.borderColor,
                  }}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(items.amount) || 0}
                </Typography>
              </Box>
            ))}
          </Box>
          <hr style={{ marginTop: "30px", marginBottom: "20px" }} />
          <DataTableComponent />
        </Box>
      </DashboardCard>
    </>
  );
};

export default List;
