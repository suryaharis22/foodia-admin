import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCsrWalletMerchant } from "../../api/CsrWallet";
import { useAppContext } from "../../shared/Context";
import DashboardCard from "../../shared/DashboardCard";
import DataTableComponent from "./DataTable";

const List = () => {
  const [merchantPaymentListData, setMerchantPaymentListData] = useState([]);
  const [merchantPaymentListMeta, setMerchantPaymentListMeta] = useState({
    page: 1,
    per_page: 5,
    page_count: 2,
    total: 10,
  });
  const [merchantPaymentIndex, setMerchantPaymentIndex] = useState(0); // State to track current page index
  const [page, setPage] = useState(1);
  const [searchTextCampaign, setSearchTextCampaign] = useState<string>("");
  const { isLoading, setIsLoading } = useAppContext();

  const handleChangePageWalletMerchant = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setIsLoading(true);
    setPage(value);
    setMerchantPaymentIndex(value - 1);
    getCsrWalletMerchant(
      setMerchantPaymentListData,
      setMerchantPaymentListMeta,
      value,
      setIsLoading
    );
  };

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Merchant Payment List
    </Typography>,
  ];

  useEffect(() => {
    getCsrWalletMerchant(
      setMerchantPaymentListData,
      setMerchantPaymentListMeta,
      page,
      setIsLoading
    );
  }, [page, setIsLoading]);

  // let filteredItemsCampaign: any = merchantPaymentListData;
  // if (searchTextCampaign !== "") {
  //   filteredItemsCampaign = merchantPaymentListData.filter((data) =>
  //     data.campaign_name.toLowerCase().includes(searchTextCampaign.toLowerCase())
  //   );
  // }
  // const handleChangeSearchCampaign = (event: SelectChangeEvent) => {
  //   setSearchTextCampaign(event.target.value);
  // };

  return (
    <>
      <DashboardCard
        title="Merchant Payments"
        breadcrumb={breadcrumbs}
        // currentBalance={ballanceWalletData?.total_balance}
      >
        <Box sx={{ paddingX: "40px" }}>
          <DataTableComponent
            merchantPaymentListData={merchantPaymentListData}
            merchantPaymentListMeta={merchantPaymentListMeta}
            onChangePageWalletMerchant={handleChangePageWalletMerchant}
            merchantPaymentListIndex={merchantPaymentIndex}
          />
        </Box>
      </DashboardCard>
    </>
  );
};

export default List;
