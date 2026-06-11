import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getDetonator = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/detonator/filter?page=${page}&per_page=5&status=${
          localStorage.getItem("FilterStatus") !== "all"
            ? localStorage.getItem("FilterStatus")
            : ""
        }&phone=${
          localStorage.getItem("SearchBy") === "phone"
            ? localStorage.getItem("SearchText")
            : ""
        }&email=${
          localStorage.getItem("SearchBy") === "email"
            ? localStorage.getItem("SearchText")
            : ""
        }&fullname=${
          localStorage.getItem("SearchBy") === "fullname"
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
    .catch((error: any) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};

export const getDetonatorDetail = (
  id: any,
  setData: any,
  setIsLoading: any
) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/detonator/fetch/${id}`, {
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
