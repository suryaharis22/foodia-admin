import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getWalletList = (
  setData: any,
  wallet_type: any,
  setIsLoading: any
) => {
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE + `/wallet/list?wallet_type=${wallet_type}`,
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
      setIsLoading(false);
    })
    .catch((error) => {
      ErrorHandling(error);
      setIsLoading(false);
    });
};
