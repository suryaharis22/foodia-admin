import { Box, SelectChangeEvent, Typography } from "@mui/material";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import DataTables from "../../shared/DataTables";
import Link from "next/link";
import { ButtonAction } from "../../shared/Buttons";
import { useAppContext } from "../../shared/Context";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface CurrentWalletData {
  id: number;
  donator_name: any;
  total_donation: any;
  remaining_balance: any;
}
[];

interface TransactionListData {
  id: number;
  donator_name: any;
  total_donation: any;
  trx_date: any;
}
[];

interface CampaignListData {
  campaign_id: number;
  campaign_name: any;
  total_donation: any;
  details: { donation_by: any; amount: number }[];
  // donator_list: { id: any; donator: any }[];
  // donations: { id: any; donations_detail: any }[];
}
[];

interface Props {
  currentWalletData: CurrentWalletData[];
  currentWalletMeta: Meta;
  onChangePageWalletCurrent: any;
  currentWalletIndex: any;

  transactionListData: TransactionListData[];
  transactionListMeta: Meta;
  onChangePageWalletTrx: any;
  currentTrxIndex: any;

  campaignListData: CampaignListData[];
  campaignListMeta: Meta;
  onChangePageWalletCampaign: any;
  currentCampaignIndex: any;
}

const DataTableComponent: React.FC<Props> = ({
  currentWalletData,
  currentWalletMeta,
  onChangePageWalletCurrent,
  currentWalletIndex,

  transactionListData,
  transactionListMeta,
  onChangePageWalletTrx,
  currentTrxIndex,

  campaignListData,
  campaignListMeta,
  onChangePageWalletCampaign,
  currentCampaignIndex,
}) => {
  const [searchTextTrxData, setSearchTextTrxData] = useState<string>("");
  const [searchTextCurrWallet, setSearchTextCurrWallet] = useState<string>("");
  const [searchTextCampaign, setSearchTextCampaign] = useState<string>("");

  let filteredItemsCurrWallet: any = currentWalletData;
  if (searchTextCurrWallet !== "") {
    filteredItemsCurrWallet = currentWalletData.filter((data) =>
      data.donator_name.toLowerCase().includes(searchTextTrxData.toLowerCase())
    );
  }
  const handleChangeSearchCurrWallet = (event: SelectChangeEvent) => {
    setSearchTextCurrWallet(event.target.value);
  };

  let filteredItemsTrxData: any = transactionListData;
  if (searchTextTrxData !== "") {
    filteredItemsTrxData = transactionListData.filter((data) =>
      data.donator_name.toLowerCase().includes(searchTextTrxData.toLowerCase())
    );
  }
  const handleChangeSearchTrxData = (event: SelectChangeEvent) => {
    setSearchTextTrxData(event.target.value);
  };

  let filteredItemsCampaign: any = campaignListData;
  if (searchTextCampaign !== "") {
    filteredItemsCampaign = campaignListData.filter((data) =>
      data.campaign_name
        .toLowerCase()
        .includes(searchTextCampaign.toLowerCase())
    );
  }
  const handleChangeSearchCampaign = (event: SelectChangeEvent) => {
    setSearchTextCampaign(event.target.value);
  };

  const currentWalletColumns: TableColumn<CurrentWalletData>[] = [
    {
      name: "No",
      selector: (_row: any, i: any) =>
        i + 1 + currentWalletIndex * currentWalletMeta.per_page,
      // sortable: true,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Nama Donator",
      cell: (row: CurrentWalletData) => <div>{row.donator_name}</div>,
      // sortable: true,
    },
    {
      name: "Total Donasi",
      cell: (row: CurrentWalletData) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.total_donation)}
        </div>
      ),
      // sortable: true,
    },
    {
      name: "Sisa Donasi",
      cell: (row: CurrentWalletData) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.remaining_balance)}
        </div>
      ),
      // sortable: true,
      // width: "",
    },
  ];

  const transactionListColumns: TableColumn<TransactionListData>[] = [
    {
      name: "No",
      selector: (_row: any, i: any) =>
        i + 1 + currentTrxIndex * transactionListMeta.per_page,
      // sortable: true,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Nama Donator",
      cell: (row: TransactionListData) => <div>{row.donator_name}</div>,
      // sortable: true,
    },
    {
      name: "Jumlah Donasi",
      cell: (row: TransactionListData) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.total_donation)}
        </div>
      ),
      // sortable: true,
    },
    {
      name: "Tanggal Transaksi",
      cell: (row: TransactionListData) => <div>{row.trx_date}</div>,
      // sortable: true,
      // width: "",
    },
  ];

  const campaignListColumns: TableColumn<CampaignListData>[] = [
    {
      name: "No",
      selector: (_row: any, i: any) =>
        i + 1 + currentCampaignIndex * campaignListMeta.per_page,
      // sortable: true,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Nama Campaign",
      cell: (row: CampaignListData) => (
        <Link
          href={{
            pathname: "/ui-components/pages/campaign/info",
            query: {
              id: row.campaign_id,
            },
          }}
        >
          {row.campaign_name}
        </Link>
      ),
      // sortable: true,
    },
    {
      name: "Jumlah Donasi",
      cell: (row: CampaignListData) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.total_donation)}
        </div>
      ),
      // sortable: true,
      width: "140px",
    },
    {
      name: "Donasi Oleh",
      cell: (row: CampaignListData) => (
        <>
          {row.details?.slice(0, 2).map((value: any, i) => (
            <Link
              href=""
              key={i}
              style={{ display: "flex", flexDirection: "row" }}
            >
              {/* {value.donator} */}
              {i === 1 && value.donation_by?.length > 10
                ? `${value.donation_by.slice(0, 10)}...`
                : value.donation_by}
              {i == 0 && <div style={{ marginRight: "5px" }}>,</div>}
            </Link>
          ))}
        </>
      ),
      // sortable: true,
      width: "200px",
    },
    {
      name: "Detail Donasi",
      cell: (row: CampaignListData) => (
        <>
          {row.details?.slice(0, 2).map((value: any, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "row" }}>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(value.amount)}
              {i === 1 && `...`}
              {i == 0 && <div style={{ marginRight: "5px" }}>,</div>}
            </div>
          ))}
        </>
      ),
      // sortable: true,
      // width: "",
    },
    {
      name: "Action",
      cell: (row: CampaignListData, i: number) => (
        <Link
          href={{
            pathname: `${
              row.details == undefined
                ? ""
                : "/ui-components/pages/wallet/csr/info"
            }`,
          }}
          tabIndex={-1}
        >
          <ButtonAction
            disabled={row.details == undefined}
            onClick={() =>
              handleClick(row.details, row.campaign_name, row.total_donation)
            }
            label={
              row.details?.length > 2
                ? `View ${row.details.length - 2} More`
                : "View"
            }
          />
        </Link>
      ),
      // sortable: true,
    },
  ];

  const handleClick = (details: any, detailsName: any, detailsTotal: any) => {
    const jsonArrayOfObjects = JSON.stringify(details);
    localStorage.setItem("Details", jsonArrayOfObjects);
    localStorage.setItem("DetailsName", detailsName);
    localStorage.setItem("DetailsTotal", detailsTotal);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography sx={{ fontWeight: "bold" }}>Current Wallet</Typography>
          <DataTables
            // value={filterText}
            // searchOption={searchOption}
            // valueSearchBy={searchBy}
            onChangeSearch={handleChangeSearchCurrWallet}
            // onChangeSearchBy={handleChangeSearchBy}
            download={true}
            onChange={onChangePageWalletCurrent}
            pagination={true}
            meta={currentWalletMeta}
            pageItems={filteredItemsCurrWallet?.length}
            columns={currentWalletColumns}
            data={filteredItemsCurrWallet}
            currentPageIndex={currentWalletIndex}
            walletUrl="csr-current?"
            excelfileName="CSR-CurrentWallet-Report"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography sx={{ fontWeight: "bold" }}>List Transaksi</Typography>
          <DataTables
            // value={filterText}
            // searchOption={searchOption}
            // valueSearchBy={searchBy}
            onChangeSearch={handleChangeSearchTrxData}
            // onChangeSearchBy={handleChangeSearchBy}
            download={true}
            onChange={onChangePageWalletTrx}
            pagination={true}
            meta={transactionListMeta}
            pageItems={filteredItemsTrxData?.length}
            columns={transactionListColumns}
            data={filteredItemsTrxData}
            currentPageIndex={currentTrxIndex}
            walletUrl="transaction?trx_type=csr&"
            excelfileName="CSR-Transaction-Report"
          />
        </Box>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "bold" }}>List Campaign</Typography>
        <DataTables
          // value={filterText}
          // searchOption={searchOption}
          // valueSearchBy={searchBy}
          onChangeSearch={handleChangeSearchCampaign}
          // onChangeSearchBy={handleChangeSearchBy}
          download={true}
          onChange={onChangePageWalletCampaign}
          pagination={true}
          meta={campaignListMeta}
          pageItems={filteredItemsCampaign?.length}
          columns={campaignListColumns}
          data={filteredItemsCampaign}
          currentPageIndex={currentCampaignIndex}
          walletUrl="campaign?trx_type=csr&"
          excelfileName="CSR-Campaign-Report"
        />
      </Box>
      {/* <Box>
        <Typography sx={{ fontWeight: "bold" }}>
          List Pembayaran Merchant
        </Typography>
        <DataTables
          // value={filterText}
          // searchOption={searchOption}
          // valueSearchBy={searchBy}
          // onChangeSearch={handleChangeSearch}
          // onChangeSearchBy={handleChangeSearchBy}
          onChange={onChangePageWalletMerchant}
          pagination={true}
          meta={merchantPaymentListMeta}
          pageItems={merchantPaymentListData?.length}
          columns={merchantPaymentListColumns}
          data={merchantPaymentListData}
        />
      </Box> */}
    </Box>
  );
};

export default DataTableComponent;
