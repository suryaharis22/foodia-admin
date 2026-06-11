// AppContext.tsx
import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AppContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  campaignData: any;
  detonatorData: any;
  merchantData: any;
  productData: any;
}
const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [campaignData, setCampaignData] = useState([]);
  const [detonatorData, setDetonatorData] = useState([]);
  const [merchantData, setMerchantdata] = useState([]);
  const [productData, setProductdata] = useState([]);

  const contextValue = {
    isLoading,
    setIsLoading,

    campaignData,
    detonatorData,
    merchantData,
    productData,
  };

  useEffect(() => {
    // Get Campaign
    // axios
    //   .get(process.env.NEXT_PUBLIC_BASE + "/campaign/filter", {
    //     headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    //   })
    //   .then((res) => {
    //     setCampaignData(res.data.body);
    //     const isRejectedPresent: boolean = res.data.body.some(
    //       (obj: any) => obj.status === "rejected" || obj.status === "waiting"
    //     );
    //     // console.log(isRejectedPresent);
    //     setIsUnapprovedCampaign(isRejectedPresent);
    //   })
    //   .catch((error) => {});
    //----------------------------------------------------------------------------
    // Get Detonator
    // axios
    //   .get(process.env.NEXT_PUBLIC_BASE + "/detonator/filter", {
    //     headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    //   })
    //   .then((res) => {
    //     setDetonatorData(res.data.body);
    //     const isRejectedPresent: boolean = res.data.body.some(
    //       (obj: any) => obj.status === "rejected" || obj.status === "waiting"
    //     );
    //     // console.log(isRejectedPresent);
    //     setIsUnapprovedDetonator(isRejectedPresent);
    //   })
    //   .catch((error) => {});
    //----------------------------------------------------------------------------
    // Get Merchant
    // axios
    //   .get(process.env.NEXT_PUBLIC_BASE + "/merchant/filter", {
    //     headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    //   })
    //   .then((res) => {
    //     setMerchantdata(res.data.body);
    //     const isRejectedPresent: boolean = res.data.body.some(
    //       (obj: any) => obj.status === "rejected" || obj.status === "waiting"
    //     );
    //     // console.log(isRejectedPresent);
    //     setIsUnapprovedMerchant(isRejectedPresent);
    //   })
    //   .catch((error) => {});
    //----------------------------------------------------------------------------
    // Get Product
    // axios
    //   .get(process.env.NEXT_PUBLIC_BASE + "/merchant-product/filter", {
    //     headers: { authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    //   })
    //   .then((res) => {
    //     setProductdata(res.data.body);
    //     const isRejectedPresent: boolean = res.data.body.some(
    //       (obj: any) => obj.status === "rejected" || obj.status === "waiting"
    //     );
    //     // console.log(isRejectedPresent);
    //     setIsUnapprovedProduct(isRejectedPresent);
    //   })
    //   .catch((error) => {});
    //----------------------------------------------------------------------------
  }, []);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

export default AppProvider;
