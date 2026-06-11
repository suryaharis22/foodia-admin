import {
  Box,
  CircularProgress,
  SelectChangeEvent,
  Typography,
  colors,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import Charts from "./Chart";
import { useRouter } from "next/navigation";
import { useAppContext } from "../shared/Context";
import { useEffect, useState } from "react";
import { getGeneralReports } from "../api/Dashboard";
import moment from "moment";

const List = () => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [filterYear, setFilterYear] = useState(
    moment(new Date()).format("YYYY")
  );
  const { isLoading, setIsLoading } = useAppContext();
  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Dashboard
    </Typography>,
  ];

  const onChangeFilterYear = (event: SelectChangeEvent) => {
    setFilterYear(event.target.value);
    getGeneralReports(setData, setIsLoading, event.target.value);
  };

  useEffect(() => {
    getGeneralReports(setData, setIsLoading, filterYear);
    // getProduct(setData, setMeta, page, setIsLoading, filterText);
  }, [filterYear, setIsLoading]);

  const cards = [
    {
      id: 1,
      title: "Revenue Balance",
      amount: data.wallets?.revenue_balance,
      bgcolor: "linear-gradient(to bottom, #4ACB47, #5A9A70)",
    },
    {
      id: 2,
      title: "Agnostic Balance",
      amount: data.wallets?.agnostic_balance,
      bgcolor: "linear-gradient(to bottom, #47CBC3, #5A689A)",
    },
    {
      id: 3,
      title: "Coupon Balance",
      amount: data.wallets?.coupon_balance,
      bgcolor: "linear-gradient(to bottom, #FF4949, #FFBC5B)",
    },
    {
      id: 4,
      title: "Merchant Balance",
      amount: data.wallets?.merchant_balance,
      bgcolor: "linear-gradient(to bottom, #CB4747, #9A5A5A)",
    },
  ];

  const usersData = [
    {
      label: "Active Users",
      value: data.users?.donator?.active_user || 0,
      color: "#3FB648",
    },
    {
      label: "New Users",
      value: data.users?.donator?.new_user || 0,
      color: "#000",
    },
  ];

  const usersoptions: any = {
    series: usersData?.map((item) => item?.value), // Ensure series data exists
    labels: usersData?.map((item) => item?.label),
    chart: {
      type: "donut",
      stacked: false,
    },
    colors: usersData?.map((item) => item?.color),
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opts: any) {
        const data = usersData[opts?.seriesIndex];
        return `${data?.value || 0} ${data?.label || ""}`;
      },
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["gray"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 10,
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        customScale: 0.8,
        donut: {
          size: "60px",
        },
        dataLabels: {
          offset: 45,
          minAngleToShowLabel: 10,
        },
      },
    },
  };

  const volunteerData = [
    {
      label: "Rejected Users",
      value: data.users?.detonator?.rejected || 0,
      color: "#FF1654",
    },
    {
      label: "Active Users",
      value: data.users?.detonator?.approved || 0,
      color: "#3FB648",
    },
    {
      label: "Waiting Users",
      value: data.users?.detonator?.waiting || 0,
      color: "#000",
    },
  ];

  const volunteeroptions: any = {
    series: volunteerData.map((item) => item.value), // Use the values for the series data
    labels: volunteerData.map((item) => item.label),
    chart: {
      type: "donut",
      stacked: false,
    },
    colors: volunteerData.map((item) => item.color),
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      formatter: function (val: any, opts: any) {
        const data = volunteerData[opts.seriesIndex];
        return `${data.value} ${data.label}`;
      },
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["gray"], // This will apply to all data labels
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 10,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          labels: {
            show: false,
          },
          size: "60px",
        },
        dataLabels: {
          offset: 45, // Move labels further outside the slices
          minAngleToShowLabel: 10, // Only show labels for slices that have an angle larger than this value
        },
      },
    },
  };

  const merchantData = [
    {
      label: "Rejected Users",
      value: data.users?.merchant?.rejected || 0,
      color: "#FF1654",
    },
    {
      label: "Active Users",
      value: data.users?.merchant?.approved || 0,
      color: "#3FB648",
    },
    {
      label: "Waiting Users",
      value: data.users?.merchant?.waiting || 0,
      color: "#000",
    },
  ];

  const merchantoptions: any = {
    series: merchantData.map((item) => item.value), // Use the values for the series data
    labels: merchantData.map((item) => item.label),
    chart: {
      type: "donut",
      stacked: false,
    },
    colors: merchantData.map((item) => item.color),
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opts: any) {
        const data = merchantData[opts.seriesIndex];
        return `${data.value} ${data.label}`;
      },
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["gray"], // This will apply to all data labels
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 10,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          labels: {
            show: false,
          },
          size: "60px",
        },
        dataLabels: {
          offset: 35, // Move labels further outside the slices
          minAngleToShowLabel: 10, // Only show labels for slices that have an angle larger than this value
        },
      },
    },
  };

  const beneficiariesData = [
    {
      label: "Rejected Users",
      value: data.users?.beneficiaries?.rejected || 0,
      color: "#FF1654",
    },
    {
      label: "Active Users",
      value: data.users?.beneficiaries?.approved || 0,
      color: "#3FB648",
    },
    {
      label: "Waiting Users",
      value: data.users?.beneficiaries?.waiting || 0,
      color: "#000",
    },
  ];

  const beneficiariesoptions: any = {
    series: beneficiariesData.map((item) => item.value), // Use the values for the series data
    labels: beneficiariesData.map((item) => item.label),
    chart: {
      type: "donut",
      stacked: false,
    },
    colors: beneficiariesData.map((item) => item.color),
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opts: any) {
        const data = beneficiariesData[opts.seriesIndex];
        return `${data.value} ${data.label}`;
      },
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["gray"], // This will apply to all data labels
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 10,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          labels: {
            show: false,
          },
          size: "60px",
        },
        dataLabels: {
          offset: 35, // Move labels further outside the slices
          minAngleToShowLabel: 10, // Only show labels for slices that have an angle larger than this value
        },
      },
    },
  };

  // =------------------------=

  const revenueData = [
    {
      name: "",
      data:
        filterYear === moment(new Date()).format("YYYY")
          ? data.revenue
              ?.filter(
                (data: any) =>
                  data.month <= parseInt(moment(new Date()).format("M"))
              )
              .map((data: any) => data.total_revenue)
          : data.revenue.map((data: any) => data.total_revenue),
    },
  ];

  const revenueoptions: any = {
    series: revenueData,
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      events: {
        dataPointMouseEnter: function (event: any) {
          event.target.style.cursor = "pointer";
        },
        markerClick: function (
          e: any,
          chartContext: any,
          { dataPointIndex, w }: any
        ) {
          const category = w.globals?.categoryLabels[dataPointIndex];
          const monthOption = w.globals?.categoryLabels.map(
            (data: any) => data
          );
          const jsonArrayOfObjects = JSON.stringify(monthOption);
          localStorage.setItem("monthOptions", jsonArrayOfObjects);
          router.push(
            `/ui-components/pages/dashboard/info?detail=revenue&month=${category}&year=${filterYear}`
          );
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    colors: ["#3FB648"],
    stroke: {
      curve: "straight",
      width: [4],
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
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(value);
        },
      },
      axisBorder: {
        show: true,
        color: "#3FB648",
      },
    },
    markers: {
      size: 8,
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

  const cashflowData = [
    {
      name: "Cash Out",
      data:
        filterYear === moment(new Date()).format("YYYY")
          ? data?.cash_flow
              ?.filter(
                (data: any) =>
                  data.month <= parseInt(moment(new Date()).format("M"))
              )
              .map((data: any) => data.total_cashout)
          : data.cash_flow.map((data: any) => data.total_cashout),
    },
    {
      name: "Cash In",
      data:
        filterYear === moment(new Date()).format("YYYY")
          ? data?.cash_flow
              ?.filter(
                (data: any) =>
                  data.month <= parseInt(moment(new Date()).format("M"))
              )
              .map((data: any) => data.total_cashin)
          : data.cash_flow.map((data: any) => data.total_cashin),
    },
  ];

  const cashflowoptions: any = {
    series: cashflowData,
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      events: {
        dataPointMouseEnter: function (event: any) {
          event.target.style.cursor = "pointer";
        },
        markerClick: function (
          e: any,
          chartContext: any,
          { dataPointIndex, w }: any
        ) {
          const category = w.globals?.categoryLabels[dataPointIndex];
          router.push(
            `/ui-components/pages/dashboard/info?detail=cashflow&month=${category}&year=${filterYear}`
          );
        },
      },
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
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(value);
        },
      },
      axisBorder: {
        show: true,
        color: "#3FB648",
      },
    },
    markers: {
      size: 8,
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

  return (
    <>
      <BaseCard
        title="Dashboard"
        breadcrumb={breadcrumbs}
        filterYear={true}
        filterYearValue={filterYear}
        onChangeFilterYear={onChangeFilterYear}
      >
        <Box sx={{ paddingX: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "30px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Wallet
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>Total Balance</Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.wallets?.total_balance || 0)}
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
                  width: "260px",
                  display: "flex",
                  flexDirection: "column",
                  background: `${items.bgcolor}`,
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "bold", color: "white" }}
                >
                  {items.title}
                </Typography>
                <Typography
                  sx={{ fontSize: "22px", fontWeight: "bold", color: "white" }}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(items.amount || 0)}
                </Typography>
              </Box>
            ))}
          </Box>
          {isLoading || !data ? (
            <CircularProgress />
          ) : (
            <>
              <Charts
                options={revenueoptions}
                series={revenueoptions.series}
                label="Revenue"
                type="area"
              />
              <Charts
                options={cashflowoptions}
                series={cashflowoptions.series}
                label="Cash Flow"
                type="line"
              />
              <hr />
              <Typography
                sx={{
                  fontWeight: "bold",
                  paddingTop: "15px",
                  fontSize: "20px",
                }}
              >
                Users
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingTop: "25px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: "15px",
                      paddingLeft: "30px",
                    }}
                  >
                    Donator
                  </Typography>
                  <Charts
                    options={usersoptions}
                    series={usersoptions.series}
                    width="90%"
                    type="donut"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: "15px",
                      paddingLeft: "30px",
                    }}
                  >
                    Volunteer
                  </Typography>
                  <Charts
                    options={volunteeroptions}
                    series={volunteeroptions.series}
                    // label="Donator"
                    width="90%"
                    type="donut"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: "15px",
                      paddingLeft: "30px",
                    }}
                  >
                    Merchant
                  </Typography>
                  <Charts
                    options={merchantoptions}
                    series={merchantoptions.series}
                    // label="Donator"
                    width="90%"
                    type="donut"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: "15px",
                      paddingLeft: "30px",
                    }}
                  >
                    Beneficiaries
                  </Typography>
                  <Charts
                    options={beneficiariesoptions}
                    series={beneficiariesoptions.series}
                    // label="Donator"
                    width="90%"
                    type="donut"
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </BaseCard>
    </>
  );
};

export default List;
