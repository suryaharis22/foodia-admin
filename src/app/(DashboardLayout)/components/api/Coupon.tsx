import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const postCouponWalletTopup = (
  id: any,
  csrWallet: any,
  agnosticWallet: any
) => {
  const mergedWallet = [...csrWallet, ...agnosticWallet];

  axios
    .post(
      process.env.NEXT_PUBLIC_BASE + `/coupon-wallet/topup`,
      {
        details: mergedWallet,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      }
    )
    .then((res) => {
      location.reload();
      localStorage.setItem("topupSucceed", "true");
      // onSuccess(); // Call the onSuccess function with the response
    })
    .catch((error) => {
      ErrorHandling(error);
    });
};

export const updateCouponWalletPrice = (price: any, setIsLoading: any) => {
  axios
    .put(
      process.env.NEXT_PUBLIC_BASE + `/coupon-wallet/update`,
      {
        price: price,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then(() => {
      location.reload();
      localStorage.setItem("changeCouponSucceed", "true");
      // setIsLoading(false);
    })
    .catch((err) => {
      ErrorHandling(err);
      setIsLoading(false);
    });
};

export const getCouponWalletExpiredClaimed = (
  setData: any,
  setIsLoading: any
) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/coupon-report/claimexpired`, {
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

export const getCouponWalletDetail = (setData: any, setIsLoading: any) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/coupon-wallet/fetch`, {
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

export const getCouponWalletSummary = (
  setData: any,
  setIsLoading: any,
  start_date?: any,
  end_date?: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/coupon-wallet/summary?start_date=${start_date}&end_date=${end_date}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    )
    .then((res) => {
      setData(res.data.body);
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getCouponWalletTrx = (
  setData: any,
  setMeta: any,
  setIsLoading: any,
  start_date?: any,
  end_date?: any,
  page?: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/coupon/filter?page=${page}&per_page=10&start_date=${start_date}&end_date=${end_date}`,
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

export const getCouponWalletTrxDetail = (
  setData: any,
  setIsLoading: any,
  id: any
) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/coupon/fetch/${id}`, {
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
