import { SelectChangeEvent, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ButtonAction, Status } from "../shared/Buttons";
import { useAppContext } from "../shared/Context";
import DataTables from "../shared/DataTables";
import { getDisbursement } from "../api/Disbursement";
import moment from "moment";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface Data {
  id: number;
  recipient_name: any;
  bank: any;
  amount: any;
  merchant: { merchant_name: any };
  oauth: { fullname: string; email: string };
  status: string;
}

interface Props {
  data: Data[];
  meta: Meta;
  handleChangePage: any;
}

const DataTableComponent = () => {
  const [filterText, setFilterText] = useState<string>("all");
  const [searchBy, setSearchBy] = useState<string>("merchant_name");
  const [searchText, setSearchText] = useState<string>("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track current page index
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useAppContext();
  const [typingTimeout, setTypingTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  useEffect(() => {
    localStorage.setItem("FilterStatus", filterText);
    getDisbursement(setData, setMeta, page, setIsLoading);
  }, [filterText, page, setIsLoading]);

  const columns = [
    {
      name: "No",
      selector: (_row: any, i: any) => i + 1 + currentPageIndex * meta.per_page,
      // sortable: true,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Merchant Name",
      cell: (row: any) => <div>{row.merchant.merchant_name}</div>,
      // sortable: true,
    },
    {
      name: "Recipient Name",
      cell: (row: any) => <div>{row.recipient_name}</div>,
      // sortable: true,
      width: "auto",
    },
    {
      name: "Payment Method",
      cell: (row: any) => <div>{row.bank}</div>,
      // sortable: true,
    },
    {
      name: "Total Amount",
      cell: (row: any) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.amount)}
        </div>
      ),
      // sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => <Status row={row} />,
      // sortable: true,
    },
    {
      name: "Created At",
      cell: (row: any) => (
        <div>{moment(row.created_at).format("DD/MM/DD hh:mm")}</div>
      ),
      // sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <Stack spacing={1} direction="row">
          <Link
            href={{
              pathname: "/ui-components/pages/disbursement/info",
              query: {
                id: row.id,
              },
            }}
          >
            <ButtonAction label="View" />
          </Link>
        </Stack>
      ),
      // sortable: true,
    },
    // Add more columns as needed
  ];

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setCurrentPageIndex(value - 1);
    setIsLoading(true);
    getDisbursement(setData, setMeta, value, setIsLoading);
  };

  useEffect(() => {
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, [searchBy, searchText]);

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
    localStorage.setItem("SearchBy", event.target.value);
    setIsLoading(true);
    getDisbursement(setData, setMeta, page, setIsLoading);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setIsLoading(true);
    localStorage.setItem("FilterStatus", event.target.value);
    setFilterText(event.target.value);
    getDisbursement(setData, setMeta, 1, setIsLoading);
  };

  const handleChangeSearch = (event: SelectChangeEvent) => {
    setSearchText(event.target.value);
    localStorage.setItem("SearchText", event.target.value);
  };

  const handleKeyUp = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      setIsLoading(true);
      getDisbursement(setData, setMeta, page, setIsLoading);
      // Add your logic here
    }, 500); // Adjust the delay as needed (in milliseconds)
    setTypingTimeout(timeout);
  };

  // let filteredItems: any = data;
  // if (filterText === "unapproved") {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() !== "approved" &&
  //       (searchBy === "merchant_name"
  //         ? data.merchant.merchant_name
  //             .toLowerCase()
  //             .includes(searchText.toLowerCase())
  //         : searchBy === "recipient_name"
  //         ? data.recipient_name.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "bank"
  //         ? data.bank.toLowerCase().includes(searchText.toLowerCase())
  //         : data.amount.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // } else {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() === "approved" &&
  //       (searchBy === "merchant_name"
  //         ? data.merchant.merchant_name
  //             .toLowerCase()
  //             .includes(searchText.toLowerCase())
  //         : searchBy === "recipient_name"
  //         ? data.recipient_name.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "bank"
  //         ? data.bank.toLowerCase().includes(searchText.toLowerCase())
  //         : data.amount.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // }

  const searchOption = [
    {
      id: 1,
      value: "merchant_name",
      label: "Merchant Name",
    },
    {
      id: 2,
      value: "recipient_name",
      label: "Recipient Name",
    },
    {
      id: 3,
      value: "bank",
      label: "Bank",
    },
    {
      id: 4,
      value: "amount",
      label: "Amount",
    },
  ];

  const filterOptions = [
    {
      id: 1,
      value: "waiting",
      label: "Waiting",
    },
    {
      id: 2,
      value: "rejected",
      label: "Rejected",
    },
    {
      id: 3,
      value: "approved",
      label: "Approved",
    },
    {
      id: 4,
      value: "all",
      label: "All",
    },
  ];

  return (
    <>
      <DataTables
        value={filterText}
        searchOption={searchOption}
        valueSearchBy={searchBy}
        onChangeFilterText={handleChangeFilterText}
        onKeyUpSearch={handleKeyUp}
        filterText={filterOptions}
        onChange={handleChangePage}
        onChangeSearch={handleChangeSearch}
        onChangeSearchBy={handleChangeSearchBy}
        pageItems={data.length}
        meta={meta}
        columns={columns}
        data={data}
        pagination={true}
        currentPageIndex={currentPageIndex}
      />
    </>
  );
};

export default DataTableComponent;
