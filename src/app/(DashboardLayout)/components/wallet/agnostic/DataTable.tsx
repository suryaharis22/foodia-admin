import { Box, SelectChangeEvent, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { ButtonAction } from "../../shared/Buttons";
import DataTables from "../../shared/DataTables";
import { getAgnosticWalletTrx } from "../../api/AgnosticWallet";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface TransactionListData {
  id: number;
  donator_name: any;
  total_donation: any;
  trx_date: any;
  trx_status: any;
}

interface CampaignListData {
  campaign_id: number;
  campaign_name: any;
  total_donation: any;
  details: { donation_by: any; amount: number }[];
  // donator_list: { id: any; donator: any }[];
  // donations: { id: any; donations_detail: any }[];
}

interface Props {
  transactionListData: TransactionListData[];
  transactionListMeta: Meta;
  onChangePageTransactionList: any;
  currentTrxIndex: any;

  campaignListData: CampaignListData[];
  campaignListMeta: Meta;
  onChangePageCampaignList: any;
  currentCampaignIndex: any;
}

const DataTableComponent: React.FC<Props> = ({
  transactionListData,
  transactionListMeta,
  onChangePageTransactionList,
  currentTrxIndex,

  campaignListData,
  campaignListMeta,
  onChangePageCampaignList,
  currentCampaignIndex,
}) => {
  const [searchTextTrxData, setSearchTextTrxData] = useState<string>("");
  const [searchTextCampaign, setSearchTextCampaign] = useState<string>("");

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
    {
      name: "Status Transaksi",
      cell: (row: TransactionListData) => (
        <div
          style={
            row.trx_status === "SUCCESS" ? { color: "green" } : { color: "red" }
          }
        >
          {row.trx_status}
        </div>
      ),
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
      width: "200px",
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
    },
    {
      name: "Donasi Oleh",
      cell: (row: CampaignListData) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {row.details?.slice(0, 2).map((value: any, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "row" }}>
              {i == 1 && value.donation_by?.length > 10
                ? `${value.donation_by.slice(0, 10)}...`
                : value.donation_by}
              {i == 0 && <div style={{ marginRight: "5px" }}>,</div>}
            </div>
          ))}
        </div>
      ),
      // sortable: true,
      width: "200px",
    },
    {
      name: "Detail Donasi",
      cell: (row: CampaignListData) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {row.details?.slice(0, 2).map((value: any, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "row" }}>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(value.amount)}
              {i == 0 && <div style={{ marginRight: "5px" }}>,</div>}
            </div>
          ))}
        </div>
      ),
      // sortable: true,
      width: "190px",
    },
    {
      name: "Action",
      cell: (row: CampaignListData, i: number) => (
        <Link
          href={{
            pathname: "/ui-components/pages/wallet/agnostic/info",
          }}
        >
          <ButtonAction
            onClick={() =>
              handleClick(row.details, row.campaign_name, row.total_donation)
            }
            label={
              row.details?.length > 1
                ? `View ${row.details?.length - 2} More`
                : "View"
            }
          />
        </Link>
      ),
      // sortable: true,
      width: "180px",
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
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontWeight: "bold" }}>List Transaksi</Typography>
          <DataTables
            // value={filterText}
            // searchOption={searchOption}
            // valueSearchBy={searchBy}
            onChangeSearch={handleChangeSearchTrxData}
            // onChangeSearchBy={handleChangeSearchBy}
            download={true}
            onChange={onChangePageTransactionList}
            pagination={true}
            meta={transactionListMeta}
            pageItems={filteredItemsTrxData?.length}
            columns={transactionListColumns}
            data={filteredItemsTrxData}
            currentPageIndex={currentTrxIndex}
            walletUrl="transaction?trx_type=agnostic&"
            excelfileName="Agnostic-Transaction-Report"
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
          onChange={onChangePageCampaignList}
          pagination={true}
          meta={campaignListMeta}
          pageItems={filteredItemsCampaign?.length}
          columns={campaignListColumns}
          data={filteredItemsCampaign}
          currentPageIndex={currentCampaignIndex}
          walletUrl="campaign-report?wallet_type=agnostic&"
          excelfileName="Agnostic-Campaign-Report"
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
          // onChange={onChangePageMerchantPayment}
          pagination={true}
          meta={merchantPaymentListMeta}
          // pageItems={merchantPaymentListData?.length}
          columns={merchantPaymentListColumns}
          data={merchantPaymentListData}
        />
      </Box> */}
    </Box>
  );
};

export default DataTableComponent;
