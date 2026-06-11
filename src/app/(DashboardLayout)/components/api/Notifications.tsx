import axios from "axios";
import ErrorHandling from "./shared/ErrorHandling";

export const getNotifications = (setData: any, setIsLoading: any) => {
  axios
    .get(process.env.NEXT_PUBLIC_BASE + `/inbox/counts`, {
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
