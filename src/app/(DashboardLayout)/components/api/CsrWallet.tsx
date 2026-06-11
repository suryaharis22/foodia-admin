import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getCsrWalletCurrent = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/wallet/csr-current?page=${page}&per_page=5`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      var data: [] = [];
      if (res.data.body.length > 0) {
        data = res.data.body;
      }
      setData(data);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCsrWalletTrx = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/wallet/transaction?trx_type=csr&page=${page}&per_page=5`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      var data: [] = [];
      if (res.data.body.length > 0) {
        data = res.data.body;
      }
      setData(data);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCsrWalletCampaign = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/wallet/campaign-report?wallet_type=csr&page=${page}&per_page=5`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      var data: [] = [];
      if (res.data.body.length > 0) {
        data = res.data.body;
      }
      setData(data);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCsrWalletMerchant = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/wallet/merchant-payment?page=${page}&per_page=5`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      var data: [] = [];
      if (res.data.body.length > 0) {
        data = res.data.body;
      }
      setData(data);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCsrWalletBallance = (setData: any, setIsLoading: any) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/wallet/balance?wallet_type=csr`, {
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
