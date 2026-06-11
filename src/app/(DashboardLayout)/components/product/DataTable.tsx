import { SelectChangeEvent, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getProduct } from "../api/Product";
import { ButtonAction, Status } from "../shared/Buttons";
import { useAppContext } from "../shared/Context";
import DataTables from "../shared/DataTables";

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

const DataTableComponent = () => {
  const [filterText, setFilterText] = useState<string>("all");
  const [searchBy, setSearchBy] = useState<string>("name");
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
    getProduct(setData, setMeta, filterText, setIsLoading, filterText);
  }, [filterText, setIsLoading]);

  const columns = [
    {
      name: "No",
      selector: (_row: any, i: any) => i + 1 + currentPageIndex * meta.per_page,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Merchant",
      cell: (row: any) => <div>{row.merchant.oauth.fullname}</div>,
    },
    {
      name: "Name",
      cell: (row: any) => <div>{row.name}</div>,
    },
    {
      name: "Description",
      cell: (row: any) => (
        <div
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {row.description}
        </div>
      ),
      width: "200px",
    },
    {
      name: "Quantity",
      cell: (row: any) => <div>{row.qty}</div>,
      width: "90px",
    },
    {
      name: "Price",
      cell: (row: any) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(parseInt(row.price))}
        </div>
      ),
    },
    {
      name: "Status",
      cell: (row: any) => <Status row={row} />,
      width: "150px",
    },
    {
      name: "Action",
      cell: (row: any) => (
        <Stack spacing={1} direction="row">
          <Link
            href={{
              pathname: "/ui-components/pages/product/info",
              query: {
                id: row.id,
              },
            }}
          >
            <ButtonAction label="View" />
          </Link>
        </Stack>
      ),
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
    getProduct(setData, setMeta, value, setIsLoading, filterText);
  };

  useEffect(() => {
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, [searchBy, searchText]);

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
    localStorage.setItem("SearchBy", event.target.value);
    setIsLoading(true);
    getProduct(setData, setMeta, page, setIsLoading, filterText);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setIsLoading(true);
    localStorage.setItem("FilterStatus", event.target.value);
    setFilterText(event.target.value);
    getProduct(setData, setMeta, 1, setIsLoading, event.target.value);
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
      getProduct(setData, setMeta, page, setIsLoading, filterText);
      // Add your logic here
    }, 500); // Adjust the delay as needed (in milliseconds)
    setTypingTimeout(timeout);
  };

  // let filteredItems: any;
  // if (filterText === "unapproved") {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() !== "approved" &&
  //       (searchBy === "name"
  //         ? data.name.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "price"
  //         ? data.price.toLowerCase().includes(searchText.toLowerCase())
  //         : data.description.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // } else {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() === "approved" &&
  //       (searchBy === "name"
  //         ? data.name.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "price"
  //         ? data.price.toLowerCase().includes(searchText.toLowerCase())
  //         : data.description.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // }

  const searchOption = [
    {
      id: 1,
      value: "name",
      label: "Product Name",
    },
    {
      id: 2,
      value: "price",
      label: "Price",
    },
    {
      id: 3,
      value: "description",
      label: "Description",
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
