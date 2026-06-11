import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getDisbursement = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/disbursement/filter?page=${page}&per_page=5&status=${
          localStorage.getItem("FilterStatus") !== "all"
            ? localStorage.getItem("FilterStatus")
            : ""
        }&merchant_name=${
          localStorage.getItem("SearchBy") === "merchant_name"
            ? localStorage.getItem("SearchText")
            : ""
        }&recipient_name=${
          localStorage.getItem("SearchBy") === "recipient_name"
            ? localStorage.getItem("SearchText")
            : ""
        }&bank=${
          localStorage.getItem("SearchBy") === "bank"
            ? localStorage.getItem("SearchText")
            : ""
        }&amount=${
          localStorage.getItem("SearchBy") === "amount"
            ? localStorage.getItem("SearchText")
            : ""
        }`,
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

export const getDisbursementDetail = (
  id: any,
  setData: any,
  setIsLoading: any
) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/disbursement/fetch/${id}`, {
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

export const ApprovalsDisbursement = (
  id: number,
  status: string,
  note: any,
  setIsOpen: any,
  setIsLoading: any
) => {
  {
    status === "approved"
      ? axios
          .post(
            process.env.NEXT_PUBLIC_BASE + `/disbursement/approved/${id}`,
            {},
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
              },
            }
          )
          .then((res) => {
            // getDetonatorDetail();
            location.reload();
            setIsOpen(false);
            setIsLoading(false);
          })
          .catch((error) => {
            ErrorHandling(error);
            setIsLoading(false);
          })
      : axios
          .post(
            process.env.NEXT_PUBLIC_BASE + `/disbursement/rejected/${id}`,
            { note },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
              },
            }
          )
          .then((res) => {
            // getDetonatorDetail();
            location.reload();
            setIsOpen(false);
            setIsLoading(false);
          })
          .catch((error) => {
            ErrorHandling(error);
            setIsLoading(false);
          });
  }
};

export const getDisbursementSummary = (setData: any, setIsLoading: any) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/disbursement/summary`, {
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
