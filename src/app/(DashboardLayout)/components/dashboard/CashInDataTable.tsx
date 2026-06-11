import { SelectChangeEvent, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getProduct } from "../api/Product";
import { ButtonAction, Status } from "../shared/Buttons";
import { useAppContext } from "../shared/Context";
import DataTables from "../shared/DataTables";
import {
  getCampaignRevenueList,
  getCashInList,
  getCouponRevenueList,
  getGeneralReports,
} from "../api/Dashboard";
import moment from "moment";
import { useSearchParams } from "next/navigation";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface Data {
  id: number;
  name: string;
  description: string;
  price: string;
  qty: number;
  status: string;
  merchant: { oauth: { fullname: string } };
}

interface Props {
  data: Data[];
  meta: Meta;
  handleChangePage: any;
}

const CashInDataTable: React.FC<any> = ({ data, meta }) => {
  const searchParams = useSearchParams();
  const [filterText, setFilterText] = useState<string>("all");
  const [searchBy, setSearchBy] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track current page index
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useAppContext();
  const [typingTimeout, setTypingTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  const [updatedData, setData] = useState(data);
  const [updatedMeta, setMeta] = useState(meta);
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    setData(data);
    setMeta(meta);
  }, [data, meta]);

  const columns = [
    {
      name: "No",
      selector: (_row: any, i: any) =>
        i + 1 + currentPageIndex * meta?.per_page,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Donator Name",
      cell: (row: any) => <div>{row.donator_name}</div>,
      // width: "150px",
    },
    {
      name: "Channel",
      cell: (row: any) => <div>{row.channel}</div>,
      // width: "150px",
    },
    {
      name: "Amount",
      cell: (row: any) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.amount || 0)}
        </div>
      ),
      // width: "150px",
    },
    {
      name: "Transaction Date",
      cell: (row: any) => (
        <div>{moment(row.transaction_date).format("DD-MM-YYYY hh:mm")}</div>
      ),
      // width: "150px",
    },
  ];

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setCurrentPageIndex(value - 1);
    setIsLoading(true);
    getCashInList(
      setData,
      setIsLoading,
      setTotalAmount,
      setMeta,
      value,
      moment(searchParams.get("month"), "MMM").format("MM"),
      searchParams.get("year")
    );
  };

  // useEffect(() => {
  //   localStorage.setItem("SearchBy", searchBy);
  //   localStorage.setItem("SearchText", searchText);
  // }, []);

  // const handleChangeSearchBy = (event: SelectChangeEvent) => {
  //   setSearchBy(event.target.value);
  //   localStorage.setItem("SearchBy", event.target.value);
  //   setIsLoading(true);
  //   // getProduct(setData, setMeta, page, setIsLoading, filterText);
  // };

  // const handleChangeFilterText = (event: SelectChangeEvent) => {
  //   setIsLoading(true);
  //   localStorage.setItem("FilterStatus", event.target.value);
  //   setFilterText(event.target.value);
  //   // getProduct(setData, setMeta, 1, setIsLoading, event.target.value);
  // };

  // const handleChangeSearch = (event: SelectChangeEvent) => {
  //   setSearchText(event.target.value);
  //   localStorage.setItem("SearchText", event.target.value);
  // };

  // const handleKeyUp = () => {
  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }
  //   const timeout = setTimeout(() => {
  //     setIsLoading(true);
  //     // getProduct(setData, setMeta, page, setIsLoading, filterText);
  //     // Add your logic here
  //   }, 500); // Adjust the delay as needed (in milliseconds)
  //   setTypingTimeout(timeout);
  // };

  // const searchOption = [
  //   {
  //     id: 1,
  //     value: "name",
  //     label: "Product Name",
  //   },
  //   {
  //     id: 2,
  //     value: "price",
  //     label: "Price",
  //   },
  //   {
  //     id: 3,
  //     value: "description",
  //     label: "Description",
  //   },
  // ];

  // const filterOptions = [
  //   {
  //     id: 1,
  //     value: "waiting",
  //     label: "Waiting",
  //   },
  //   {
  //     id: 2,
  //     value: "rejected",
  //     label: "Rejected",
  //   },
  //   {
  //     id: 3,
  //     value: "approved",
  //     label: "Approved",
  //   },
  //   {
  //     id: 4,
  //     value: "all",
  //     label: "All",
  //   },
  // ];

  return (
    <>
      <DataTables
        search={false}
        // value={filterText}
        // searchOption={searchOption}
        // valueSearchBy={searchBy}
        // onChangeFilterText={handleChangeFilterText}
        // onKeyUpSearch={handleKeyUp}
        // filterText={filterOptions}
        onChange={handleChangePage}
        // onChangeSearch={handleChangeSearch}
        // onChangeSearchBy={handleChangeSearchBy}
        pageItems={updatedData.length}
        meta={updatedMeta}
        columns={columns}
        data={updatedData}
        pagination={true}
        currentPageIndex={currentPageIndex}
      />
    </>
  );
};

export default CashInDataTable;
