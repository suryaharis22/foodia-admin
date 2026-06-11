import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getProduct = (
  setData: any,
  setMeta: any,
  page: any,
  setIsLoading: any,
  statusFilter: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE +
        `/merchant-product/filter?page=${page}&per_page=10&status=${
          localStorage.getItem("FilterStatus") !== "all"
            ? localStorage.getItem("FilterStatus")
            : ""
        }&name=${
          localStorage.getItem("SearchBy") === "name"
            ? localStorage.getItem("SearchText")
            : ""
        }&price=${
          localStorage.getItem("SearchBy") === "price"
            ? localStorage.getItem("SearchText")
            : ""
        }&description=${
          localStorage.getItem("SearchBy") === "description"
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

export const getProductDetail = (id: any, setData: any, setIsLoading: any) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/merchant-product/fetch/${id}`, {
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
