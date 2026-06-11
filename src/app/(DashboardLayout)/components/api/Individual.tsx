import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getIndividual = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/individual/filter?page=${page}&per_page=5&is_active=${
          localStorage.getItem("FilterStatus") !== "all"
            ? localStorage.getItem("FilterStatus")
            : ""
        }&fullname=${
          localStorage.getItem("SearchBy") === "fullname"
            ? localStorage.getItem("SearchText")
            : ""
        }&email=${
          localStorage.getItem("SearchBy") === "email"
            ? localStorage.getItem("SearchText")
            : ""
        }&phone=${
          localStorage.getItem("SearchBy") === "phone"
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

export const getIndividualDetail = (
  id: any,
  setData: any,
  setIsLoading: any
) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/individual/fetch/${id}`, {
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
