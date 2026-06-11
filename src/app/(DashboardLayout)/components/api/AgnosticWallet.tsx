import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";
import { useAppContext } from "../shared/Context";

export const getAgnosticWalletTrx = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/wallet/transaction?trx_type=agnostic&page=${page}&per_page=5`,
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

export const getAgnosticWalletCampaign = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/wallet/campaign-report?wallet_type=agnostic&page=${page}&per_page=5`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      var data: [] = [];
      var details: [] = [];
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

export const getAgnosticWalletBallance = (
  setData: any,
  setMeta: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE + `/wallet/balance?wallet_type=agnostic`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setMeta(res.data.meta);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};
