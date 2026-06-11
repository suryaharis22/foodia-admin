import {
  Box,
  CircularProgress,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCampaign,
  getCampaignSummary,
  getCampaignUnFiltered,
} from "../api/Campaign";
import { useAppContext } from "../shared/Context";
import BaseCard from "../shared/DashboardCard";
import DataTableComponent from "./DataTable";
import Charts from "./Chart";
import { useRouter } from "next/navigation";

const List = () => {
  const [filterText, setFilterText] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("detonator_name");
  const [searchText, setSearchText] = useState<string>("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track current page index
  const [Campdata, setCampData] = useState([]);
  const [meta, setMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const [CampdataUnFiltered, setCampDataUnFiltered] = useState<any>([]);
  const [metaUnFiltered, setMetaUnFiltered] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const [typingTimeout, setTypingTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const { isLoading, setIsLoading } = useAppContext();
  const [data, setData] = useState<any>([]);
  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Campaign List
    </Typography>,
  ];
  const [removableFilter, setRemovableFilter] = useState<any>([]);

  const fetchCampData = (page: any) => {
    setCampData([]);
    getCampaign(setCampData, setMeta, page, setIsLoading);
  };

  useEffect(() => {
    localStorage.setItem("FilterStatus", filterText);
    setCampData([]);
    fetchCampData(page);
  }, [filterText, page]);

  useEffect(() => {
    let filters: any[] = [];

    if (localStorage.getItem("FilterEventType")) {
      filters.push(
        localStorage.getItem("FilterEventType") === "regular"
          ? "Campaign Dana Terbuka"
          : "Campaign Dana Mandiri"
      );
    }

    if (localStorage.getItem("FilterEventStatus")) {
      filters.push(localStorage.getItem("FilterEventStatus"));
    }
    setRemovableFilter(filters);
  }, [Campdata]);

  const removeFilter = (indexToRemove: any) => {
    // Create a new array that excludes the item at the specified index
    const updatedFilters = removableFilter.filter(
      (_: any, index: any) => index !== indexToRemove
    );

    if (removableFilter.length > 1) {
      if (indexToRemove == 1) {
        localStorage.setItem("FilterStatus", "");
        localStorage.setItem("FilterCampaignStatus", "");
        localStorage.setItem("FilterEventStatus", "");
      } else {
        localStorage.setItem("FilterEventType", "");
        localStorage.setItem("FilterCampaignStatus", "");
      }
    } else {
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventType", "");
      localStorage.setItem("FilterCampaignStatus", "");
      localStorage.setItem("FilterEventStatus", "");
    }

    if (indexToRemove == "all") {
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventType", "");
      localStorage.setItem("FilterCampaignStatus", "");
      localStorage.setItem("FilterEventStatus", "");
      setRemovableFilter([]);
    } else {
      setRemovableFilter(updatedFilters);
    }
    fetchCampData(page);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setCurrentPageIndex(value - 1);
    setIsLoading(true);
    fetchCampData(value);
  };

  useEffect(() => {
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, [searchBy, searchText]);

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
    localStorage.setItem("SearchBy", event.target.value);
    setIsLoading(true);
    fetchCampData(page);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setFilterText(event.target.value);
    localStorage.setItem("FilterStatus", event.target.value);
    setIsLoading(true);
    fetchCampData(1);
  };

  const handleChangeSearch = (event: SelectChangeEvent) => {
    setSearchText(event.target.value);
    localStorage.setItem("SearchText", event.target.value);
    setPage(1);
  };

  const handleKeyUp = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      setIsLoading(true);
      fetchCampData(page);
    }, 500);
    setTypingTimeout(timeout);
  };

  useEffect(() => {
    getCampaignSummary(setData, setIsLoading);
  }, [setIsLoading]);

  const onClick = (regularCampaignOptions: any, seriesIndex: any) => {
    setIsLoading(true);
    if (regularCampaignOptions.series[seriesIndex]?.name === "Invitation") {
      localStorage.setItem("FilterCampaignStatus", "INPROGRESS");
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventStatus", "Invitation");
      localStorage.setItem("FilterOrderStatus", "review");
    } else if (regularCampaignOptions.series[seriesIndex]?.name === "Review") {
      localStorage.setItem("FilterCampaignStatus", "DRAFT");
      localStorage.setItem("FilterStatus", "waiting");
      localStorage.setItem("FilterEventStatus", "Review");
      localStorage.setItem("FilterOrderStatus", "");
    } else if (
      regularCampaignOptions.series[seriesIndex]?.name === "Canceled"
    ) {
      localStorage.setItem("FilterCampaignStatus", "");
      localStorage.setItem("FilterStatus", "rejected");
      localStorage.setItem("FilterEventStatus", "Canceled");
      localStorage.setItem("FilterOrderStatus", "");
    } else if (
      regularCampaignOptions.series[seriesIndex]?.name === "Confirmation"
    ) {
      localStorage.setItem("FilterCampaignStatus", "INPROGRESS");
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventStatus", "Confirmation");
      localStorage.setItem("FilterOrderStatus", "terima");
    } else if (regularCampaignOptions.series[seriesIndex]?.name === "Process") {
      localStorage.setItem("FilterCampaignStatus", "INPROGRESS");
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventStatus", "Process");
      localStorage.setItem("FilterOrderStatus", "diproses");
    } else if (
      regularCampaignOptions.series[seriesIndex]?.name === "Completed"
    ) {
      localStorage.setItem("FilterCampaignStatus", "FINISHED");
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventStatus", "Completed");
      localStorage.setItem("FilterOrderStatus", "");
    } else if (regularCampaignOptions.series[seriesIndex]?.name === "Fund") {
      localStorage.setItem("FilterCampaignStatus", "OPEN");
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventStatus", "Fund");
      localStorage.setItem("FilterOrderStatus", "");
    } else if (regularCampaignOptions.series[seriesIndex]?.name === "Report") {
      localStorage.setItem("FilterCampaignStatus", "INPROGRESS");
      localStorage.setItem("FilterStatus", "");
      localStorage.setItem("FilterEventStatus", "Report");
      localStorage.setItem("FilterOrderStatus", "selesai");
    }
  };

  const fetchCampUnFilteredData = () => {
    getCampaignUnFiltered(
      setCampDataUnFiltered,
      setMetaUnFiltered,
      setIsLoading
    );
  };

  useEffect(() => {
    fetchCampUnFilteredData();
  }, []);

  // total foods one_time campaign state
  const [OneTimetotalFoodsInvitation, setOneTimeTotalFoodsInvitation] =
    useState(null);
  const [OneTimetotalFoodsCanceled, setOneTimeTotalFoodsCanceled] =
    useState(null);
  const [OneTimetotalFoodsConfirmation, setOneTimeTotalFoodsConfirmation] =
    useState(null);
  const [OneTimetotalFoodsProcess, setOneTimeTotalFoodsProcess] =
    useState(null);
  const [OneTimetotalFoodsCompleted, setOneTimeTotalFoodsCompleted] =
    useState(null);
  const [OneTimetotalFoodsFund, setOneTimeTotalFoodsFund] = useState(null);
  const [OneTimetotalFoodsReport, setOneTimeTotalFoodsReport] = useState(null);

  // total revenue one_time campaign state
  const [OneTimeRevenueCanceled, setOneTimeRevenueCanceled] = useState(null);
  const [OneTimeRevenueConfirmation, setOneTimeRevenueConfirmation] =
    useState(null);
  const [OneTimeRevenueProcess, setOneTimeRevenueProcess] = useState(null);
  const [OneTimeRevenueCompleted, setOneTimeRevenueCompleted] = useState(null);
  const [OneTimeRevenueFund, setOneTimeRevenueFund] = useState(null);
  const [OneTimeRevenueReport, setOneTimeRevenueReport] = useState(null);

  const calculateTotalRevwnueOneTimeCamp = () => {
    const OneTimeCanceled = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter((val: any) => val.status === "rejected")
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setOneTimeRevenueCanceled(OneTimeCanceled);

    const OneTimeConfirmation = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "terima")
      )
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setOneTimeRevenueConfirmation(OneTimeConfirmation);

    const OneTimeProcess = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "diproses")
      )
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setOneTimeRevenueProcess(OneTimeProcess);

    const OneTimeReport = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "selesai")
      )
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setOneTimeRevenueReport(OneTimeReport);

    const OneTimeFund = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter((val: any) => val.campaign_status === "OPEN")
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setOneTimeRevenueFund(OneTimeFund);

    const OneTimeCompleted = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter((val: any) => val.campaign_status === "FINISHED")
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setOneTimeRevenueCompleted(OneTimeCompleted);
  };

  const calculateTotalFoodsOneTimeCamp = () => {
    const OneTimeInvitation = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "review")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setOneTimeTotalFoodsInvitation(OneTimeInvitation);

    const OneTimeCanceled = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter((val: any) => val.status === "rejected")
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setOneTimeTotalFoodsCanceled(OneTimeCanceled);

    const OneTimeConfirmation = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "terima")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setOneTimeTotalFoodsConfirmation(OneTimeConfirmation);

    const OneTimeProcess = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "diproses")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setOneTimeTotalFoodsProcess(OneTimeProcess);

    const OneTimeReport = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "selesai")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setOneTimeTotalFoodsReport(OneTimeReport);

    const OneTimeFund = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter((val: any) => val.campaign_status === "OPEN")
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setOneTimeTotalFoodsFund(OneTimeFund);

    const OneTimeCompleted = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "one_time"
    )
      .filter((val: any) => val.campaign_status === "FINISHED")
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setOneTimeTotalFoodsCompleted(OneTimeCompleted);
  };

  // total foods regular campaign state
  const [RegulartotalFoodsReview, setRegularTotalFoodsReview] = useState(null);
  const [RegulartotalFoodsInvitation, setRegularTotalFoodsInvitation] =
    useState(null);
  const [RegulartotalFoodsCanceled, setRegularTotalFoodsCanceled] =
    useState(null);
  const [RegulartotalFoodsConfirmation, setRegularTotalFoodsConfirmation] =
    useState(null);
  const [RegulartotalFoodsProcess, setRegularTotalFoodsProcess] =
    useState(null);
  const [RegulartotalFoodsCompleted, setRegularTotalFoodsCompleted] =
    useState(null);
  const [RegulartotalFoodsFund, setRegularTotalFoodsFund] = useState(null);
  const [RegulartotalFoodsReport, setRegularTotalFoodsReport] = useState(null);

  // total revenue regular campaign state
  const [RegularRevenueCanceled, setRegularRevenueCanceled] = useState(null);
  const [RegularRevenueConfirmation, setRegularRevenueConfirmation] =
    useState(null);
  const [RegularRevenueProcess, setRegularRevenueProcess] = useState(null);
  const [RegularRevenueCompleted, setRegularRevenueCompleted] = useState(null);
  const [RegularRevenueFund, setRegularRevenueFund] = useState(null);
  const [RegularRevenueReport, setRegularRevenueReport] = useState(null);

  const calculateTotalFoodsRegularCamp = () => {
    const RegularReview = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "DRAFT" && val.status === "waiting"
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsReview(RegularReview);

    const RegularInvitation = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "review")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsInvitation(RegularInvitation);

    const RegularCanceled = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter((val: any) => val.status === "rejected")
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsCanceled(RegularCanceled);

    const RegularConfirmation = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "terima")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsConfirmation(RegularConfirmation);

    const RegularProcess = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "diproses")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsProcess(RegularProcess);

    const RegularReport = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "selesai")
      )
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsReport(RegularReport);

    const RegularFund = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter((val: any) => val.campaign_status === "OPEN")
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsFund(RegularFund);

    const RegularCompleted = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter((val: any) => val.campaign_status === "FINISHED")
      .reduce((sum: any, item: any) => sum + (item.food_total || 0), 0);

    setRegularTotalFoodsCompleted(RegularCompleted);
  };

  const calculateRevenueRegularCamp = () => {
    const RegularCanceled = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter((val: any) => val.status === "rejected")
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setRegularRevenueCanceled(RegularCanceled);

    const RegularConfirmation = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "terima")
      )
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setRegularRevenueConfirmation(RegularConfirmation);

    const RegularProcess = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "diproses")
      )
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setRegularRevenueProcess(RegularProcess);

    const RegularReport = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter(
        (val: any) =>
          val.campaign_status === "INPROGRESS" &&
          val.orders?.some((order: any) => order.order_status === "selesai")
      )
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setRegularRevenueReport(RegularReport);

    const RegularFund = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter((val: any) => val.campaign_status === "OPEN")
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setRegularRevenueFund(RegularFund);

    const RegularCompleted = CampdataUnFiltered.filter(
      (val: any) => val.event_type === "regular"
    )
      .filter((val: any) => val.campaign_status === "FINISHED")
      .reduce((sum: any, item: any) => sum + (item.donation_target || 0), 0);

    setRegularRevenueCompleted(RegularCompleted);
  };

  useEffect(() => {
    if (CampdataUnFiltered) {
      calculateTotalFoodsOneTimeCamp();
      calculateTotalFoodsRegularCamp();
      calculateRevenueRegularCamp();
      calculateTotalRevwnueOneTimeCamp();
    }
  }, [CampdataUnFiltered]);

  const oneTimeCampaignOptions: any = {
    series: [
      {
        name: "Invitation",
        data: [data.dana_mandiri?.invitation || 0],
        foods: OneTimetotalFoodsInvitation,
        color: "#6B4EFF",
      },
      {
        name: "Canceled",
        data: [0, data.dana_mandiri?.canceled || 0],
        revenue: OneTimeRevenueCanceled,
        foods: OneTimetotalFoodsCanceled,
        color: "#DE0606",
      },
      {
        name: "Fund",
        data: [0, 0, data.dana_mandiri?.fund || 0],
        revenue: OneTimeRevenueFund,
        foods: OneTimetotalFoodsFund,
        color: "#1D5882",
      },
      {
        name: "Confirmation",
        data: [0, 0, data.dana_mandiri?.confirmation || 0],
        revenue: OneTimeRevenueConfirmation,
        foods: OneTimetotalFoodsConfirmation,
        color: "#ed774b",
      },
      {
        name: "Process",
        data: [0, 0, data.dana_mandiri?.process || 0],
        revenue: OneTimeRevenueProcess,
        foods: OneTimetotalFoodsProcess,
        color: "#FFB444",
      },
      {
        name: "Report",
        data: [0, 0, data.dana_mandiri?.report || 0],
        revenue: OneTimeRevenueReport,
        foods: OneTimetotalFoodsReport,
        color: "#6CB28E",
      },
      {
        name: "Completed",
        data: [0, 0, data.dana_mandiri?.completed || 0],
        revenue: OneTimeRevenueCompleted,
        foods: OneTimetotalFoodsCompleted,
        color: "#3FB648",
      },
    ],
    chart: {
      type: "bar",
      height: "250px",
      stacked: true,
      events: {
        click: function (event: any, chartContext: any, config: any) {
          // Accessing clicked dataPointIndex and seriesIndex
          const seriesIndex = config.seriesIndex;
          const dataPointIndex = config.dataPointIndex;
          localStorage.setItem("FilterEventType", "one_time");

          onClick(oneTimeCampaignOptions, seriesIndex);
          fetchCampData(page);
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: ["Waiting", "Rejected", "Approved"],
    },
    yaxis: [
      {
        axisBorder: {
          show: true,
          color: "#FF1654",
        },
      },
    ],
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 10,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const revenue = w.config.series[seriesIndex].revenue;
        const foods = w.config.series[seriesIndex].foods;
        if (revenue) {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            w.config.series[seriesIndex].name +
            "</span>" +
            '<div class="revenueTooltip">' +
            "<span>" +
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(revenue || 0) +
            "</span>" +
            "</div>" +
            '<div class="foodsTooltip">' +
            "<span>" +
            foods +
            "</span>" +
            "<span>" +
            "Foods" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        } else {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            w.config.series[seriesIndex].name +
            "</span>" +
            '<div class="foodsTooltip">' +
            "<span>" +
            foods +
            "</span>" +
            "<span>" +
            "Foods" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        }
      },
    },
  };

  const regularCampaignOptions: any = {
    series: [
      {
        name: "Review",
        data: [data.dana_terbuka?.review || 0],
        foods: RegulartotalFoodsReview,
        color: "#000000",
      },
      {
        name: "Invitation",
        data: [data.dana_terbuka?.invitation || 0],
        foods: RegulartotalFoodsInvitation,
        color: "#6B4EFF",
      },
      {
        name: "Canceled",
        data: [0, data.dana_terbuka?.canceled || 0],
        revenue: RegularRevenueCanceled,
        foods: RegulartotalFoodsCanceled,
        color: "#DE0606",
      },
      {
        name: "Fund",
        data: [0, 0, data.dana_terbuka?.fund || 0],
        revenue: RegularRevenueFund,
        foods: RegulartotalFoodsFund,
        color: "#1D5882",
      },
      {
        name: "Confirmation",
        data: [0, 0, data.dana_terbuka?.confirmation || 0],
        revenue: RegularRevenueConfirmation,
        foods: RegulartotalFoodsConfirmation,
        color: "#ed774b",
      },
      {
        name: "Process",
        data: [0, 0, data.dana_terbuka?.process || 0],
        revenue: RegularRevenueProcess,
        foods: RegulartotalFoodsProcess,
        color: "#FFB444",
      },
      {
        name: "Report",
        data: [0, 0, data.dana_terbuka?.report || 0],
        revenue: RegularRevenueReport,
        foods: RegulartotalFoodsReport,
        color: "#6CB28E",
      },
      {
        name: "Completed",
        data: [0, 0, data.dana_terbuka?.completed || 0],
        revenue: RegularRevenueCompleted,
        foods: RegulartotalFoodsCompleted,
        color: "#3FB648",
      },
    ],
    // series: [
    //   {
    //     data: [
    //       {
    //         x: "Waiting",
    //         y: 1,
    //       },
    //       {
    //         x: "Rejected",
    //         y: 18,
    //       },
    //       {
    //         x: "Approved",
    //         y: 13,
    //       },
    //     ],
    //   },
    // ],
    chart: {
      type: "bar",
      height: "250px",
      stacked: true,
      events: {
        click: function (event: any, chartContext: any, config: any) {
          // Accessing clicked dataPointIndex and seriesIndex
          const seriesIndex = config.seriesIndex;
          const dataPointIndex = config.dataPointIndex;
          localStorage.setItem("FilterEventType", "regular");

          onClick(regularCampaignOptions, seriesIndex);
          fetchCampData(page);
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: ["Waiting", "Rejected", "Approved"],
      // labels: {
      //   formatter: function (val: any) {
      //     return val + "K";
      //   },
      // },
    },
    yaxis: [
      {
        axisBorder: {
          show: true,
          color: "#FF1654",
        },
      },
    ],
    // yaxis: {
    //   categories: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    //   // title: {
    //   //   text: undefined,
    //   // },
    // },
    // tooltip: {
    //   y: {
    //     formatter: function (val: any) {
    //       return val + "K";
    //     },
    //   },
    // },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 10,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const revenue = w.config.series[seriesIndex].revenue;
        const foods = w.config.series[seriesIndex].foods;
        if (revenue) {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            w.config.series[seriesIndex].name +
            "</span>" +
            '<div class="revenueTooltip">' +
            "<span>" +
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(revenue || 0) +
            "</span>" +
            "</div>" +
            '<div class="foodsTooltip">' +
            "<span>" +
            foods +
            "</span>" +
            "<span>" +
            "Foods" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        } else {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            w.config.series[seriesIndex].name +
            "</span>" +
            '<div class="foodsTooltip">' +
            "<span>" +
            foods +
            "</span>" +
            "<span>" +
            "Foods" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        }
      },
    },
  };

  return (
    <>
      <BaseCard
        title="List Campaign"
        breadcrumb={breadcrumbs}
        lastUpdate={"2024-03-14T16:56:04+07:00"}
      >
        <Box sx={{ paddingX: "30px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  paddingTop: "15px",
                  fontSize: "20px",
                }}
              >
                Campaign Dana Terbuka
              </Typography>
              {!RegulartotalFoodsCompleted ? (
                <CircularProgress />
              ) : (
                <Charts
                  options={regularCampaignOptions}
                  series={regularCampaignOptions.series as number[]}
                  // label="Donator"
                  width="90%"
                  type="bar"
                />
              )}
            </Box>
            <hr />
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  paddingTop: "15px",
                  fontSize: "20px",
                }}
              >
                Campaign Dana Mandiri
              </Typography>
              {!OneTimetotalFoodsCompleted ? (
                <CircularProgress />
              ) : (
                <Charts
                  options={oneTimeCampaignOptions}
                  series={oneTimeCampaignOptions.series as number[]}
                  // label="Donator"
                  width="90%"
                  type="bar"
                />
              )}
            </Box>
          </Box>
          <hr />
          <Typography
            sx={{ fontWeight: "bold", paddingTop: "15px", fontSize: "20px" }}
          >
            List Campaign
          </Typography>
          <DataTableComponent
            filterText={filterText}
            searchBy={searchBy}
            currentPageIndex={currentPageIndex}
            data={Campdata}
            meta={meta}
            handleChangeFilterText={handleChangeFilterText}
            handleKeyUp={handleKeyUp}
            handleChangePage={handleChangePage}
            handleChangeSearch={handleChangeSearch}
            handleChangeSearchBy={handleChangeSearchBy}
            removableFilter={removableFilter}
            removeFilter={(i: any) => removeFilter(i)}
          />
        </Box>
      </BaseCard>
    </>
  );
};

export default List;
