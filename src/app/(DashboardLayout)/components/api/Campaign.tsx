import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getCampaign = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/campaign/filter?page=${page}&per_page=5&campaign_status=${
          localStorage.getItem("FilterCampaignStatus") || ""
        }&detonator_name=${
          localStorage.getItem("SearchBy") === "detonator_name"
            ? localStorage.getItem("SearchText")
            : ""
        }&event_name=${
          localStorage.getItem("SearchBy") === "event_name"
            ? localStorage.getItem("SearchText")
            : ""
        }&event_type=${localStorage.getItem("FilterEventType") || ""}&status=${
          localStorage.getItem("FilterStatus") || ""
        }&order_status=${localStorage.getItem("FilterOrderStatus") || ""}`,
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

export const getCampaignUnFiltered = (
  setData: any,
  setMeta: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/campaign/filter?page=1&per_page=100000000`,
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

export const getCampaignDetail = (
  id: any,
  setData: any,
  setNeeded: any,
  setIsLoading: any
) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/campaign/fetch/${id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    })
    .then((res) => {
      setData(res.data.body);
      setNeeded(
        res.data.body.donation_target - res.data.body.donation_collected
      );
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const postCampaignPayment = (
  id: any,
  csrWallet: any,
  agnosticWallet: any
) => {
  const mergedWallet = [...csrWallet, ...agnosticWallet];

  axios
    .post(
      process.env.NEXT_PUBLIC_BASE + `/campaign/payment/${id}`,
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
      localStorage.setItem("addDonationSucceed", "true");
      // onSuccess(); // Call the onSuccess function with the response
    })
    .catch((error) => {
      ErrorHandling(error);
    });
};

export const getCampaignSummary = (setData: any, setIsLoading: any) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/general-report/campaign/summary`, {
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
