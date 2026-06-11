import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAgnosticWalletBallance,
  getAgnosticWalletCampaign,
  getAgnosticWalletTrx,
} from "../../api/AgnosticWallet";
import { useAppContext } from "../../shared/Context";
import DashboardCard from "../../shared/DashboardCard";
import DataTableComponent from "./DataTable";

type ballance = {
  wallet_name: string;
  total_balance: number;
};

const List = () => {
  const [balanceListData, setBalanceListData] = useState<ballance>();
  const [balanceListMeta, setBalanceListMeta] = useState({});
  const [transactionListData, setTransactionListData] = useState([]);
  const [transactionListMeta, setTransactionListMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const [currentTrxIndex, setCurrentTrxIndex] = useState(0); // State to track current page index
  const [campaignListData, setCampaignListData] = useState([]);
  const [campaignListMeta, setCampaignListMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const [currentCampaignIndex, setCurrentCampaignIndex] = useState(0); // State to track current page index
  const [merchantPaymentListData, setMerchantPaymentListData] = useState([
    {
      id: 1,
      campaign_name: "Tebar 1000 Paket Jumat Berkah",
      merchants: [
        { id: 1, name: "Nasi Kapau Merdeka" },
        { id: 2, name: "Sate Ayam" },
      ],
      payments: [
        { id: 1, amount: 30000 },
        { id: 2, amount: 200000 },
      ],
      payment_date: "7 Jan 2024 15:30:32",
    },
    {
      id: 2,
      campaign_name: "Panti Asuhan Asanah",
      merchants: [{ id: 1, name: "Bakmi Bangka 88" }],
      payments: [{ id: 1, amount: 3000000 }],
      payment_date: "6 Jan 2024 11:21:01",
    },
    {
      id: 3,
      campaign_name: "Sarapan Pagi SD Cerai Abadi",
      merchants: [{ id: 1, name: "Christie Bakery" }],
      payments: [{ id: 1, amount: 1500000 }],
      payment_date: "6 Jan 2024 09:21:01",
    },
  ]);
  const [merchantPaymentListMeta, setMerchantPaymentListMeta] = useState({
    page: 1,
    per_page: 5,
    page_count: 2,
    total: 10,
  });
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useAppContext();

  const handleChangePagePaymentList = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setCurrentTrxIndex(value - 1);
    getAgnosticWalletTrx(
      setTransactionListData,
      setTransactionListMeta,
      value,
      setIsLoading
    );
  };

  const handleChangePageCampaignList = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setCurrentCampaignIndex(value - 1);
    getAgnosticWalletCampaign(
      setCampaignListData,
      setCampaignListMeta,
      value,
      setIsLoading
    );
  };

  const handleChangePageMerchantPayment = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getAgnosticWalletCampaign(
      setCampaignListData,
      setCampaignListMeta,
      value,
      setIsLoading
    );
  };

  useEffect(() => {
    getAgnosticWalletBallance(
      setBalanceListData,
      setBalanceListMeta,
      setIsLoading
    );
    getAgnosticWalletTrx(
      setTransactionListData,
      setTransactionListMeta,
      page,
      setIsLoading
    );
    getAgnosticWalletCampaign(
      setCampaignListData,
      setCampaignListMeta,
      page,
      setIsLoading
    );
  }, [page, setIsLoading]);

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Agnostic Wallet List
    </Typography>,
  ];

  // console.log(balanceListData?.total_balance);

  return (
    <>
      <DashboardCard
        title="Agnostic Wallet"
        currentBalance={balanceListData?.total_balance}
        breadcrumb={breadcrumbs}
      >
        <Box sx={{ paddingX: "40px" }}>
          <DataTableComponent
            onChangePageTransactionList={handleChangePagePaymentList}
            campaignListData={campaignListData}
            campaignListMeta={campaignListMeta}
            onChangePageCampaignList={handleChangePageCampaignList}
            transactionListData={transactionListData}
            transactionListMeta={transactionListMeta}
            currentCampaignIndex={currentCampaignIndex}
            currentTrxIndex={currentTrxIndex}
          />
        </Box>
      </DashboardCard>
    </>
  );
};

export default List;
