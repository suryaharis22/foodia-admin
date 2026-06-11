import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";
import moment from "moment";

export const getGeneralReports = (
  setData: any,
  setIsLoading: any,
  year: any
) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/general-report/filter?year=${year}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    })
    .then((res) => {
      setData(res.data.body);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCouponRevenueList = (
  setData: any,
  setIsLoading: any,
  setTotalAmountData: any,
  setMeta: any,
  page: any,
  month: any,
  year: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/general-report/coupon/revenue?start_date=${year}-${month}-${moment(
          month
        )
          .startOf("month")
          .format("DD")}&end_date=${year}-${month}-${moment(month)
          .endOf("month")
          .format("DD")}&page=${page}&per_page=10`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setTotalAmountData(res.data.total_amount);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCampaignRevenueList = (
  setData: any,
  setIsLoading: any,
  setTotalAmountData: any,
  setMeta: any,
  page: any,
  month: any,
  year: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/general-report/campaign/revenue?start_date=${year}-${month}-${moment(
          month
        )
          .startOf("month")
          .format("DD")}&end_date=${year}-${month}-${moment(month)
          .endOf("month")
          .format("DD")}&page=${page}&per_page=10`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setTotalAmountData(res.data.total_amount);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCashInList = (
  setData: any,
  setIsLoading: any,
  setTotalAmountData: any,
  setMeta: any,
  page: any,
  month: any,
  year: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/general-report/cashflow/cashin?start_date=${year}-${month}-${moment(
          month
        )
          .startOf("month")
          .format("DD")}&end_date=${year}-${month}-${moment(month)
          .endOf("month")
          .format("DD")}&page=${page}&per_page=10`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setTotalAmountData(res.data.total_amount);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};
export const getCashOutList = (
  setData: any,
  setIsLoading: any,
  setTotalAmountData: any,
  setMeta: any,
  page: any,
  month: any,
  year: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/general-report/cashflow/cashout?start_date=${year}-${month}-${moment(
          month
        )
          .startOf("month")
          .format("DD")}&end_date=${year}-${month}-${moment(month)
          .endOf("month")
          .format("DD")}&page=${page}&per_page=10`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setTotalAmountData(res.data.total_amount);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};
