import { Chip, SelectChangeEvent } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getDetonator } from "../api/Detonator";
import { ApprovalStatus, ButtonAction, Status } from "../shared/Buttons";
import { useAppContext } from "../shared/Context";
import DataTables from "../shared/DataTables";

const DataTableComponent = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track current page index
  const [filterText, setFilterText] = useState<string>("all");
  const [searchBy, setSearchBy] = useState<string>("fullname");
  const [searchText, setSearchText] = useState<string>("");
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
    getDetonator(setData, setMeta, page, setIsLoading);
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
      name: "Fullname",
      cell: (row: any) => <div>{row.oauth.fullname}</div>,
      // sortable: true,
    },
    {
      name: "Email",
      cell: (row: any) => <div>{row.oauth.email}</div>,
      // sortable: true,
      width: "270px",
    },
    {
      name: "Phone number",
      cell: (row: any) => <div>{row.oauth.phone}</div>,
      // sortable: true,
    },
    {
      name: "Registered at",
      cell: (row: any) => (
        <div>{moment(row.created_at).format("DD/MM/YYYY")}</div>
      ),
      // sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => <Status row={row} />,
      // sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <Link
          href={{
            pathname: "/ui-components/pages/detonator/info",
            query: {
              id: row.id,
            },
          }}
        >
          <ButtonAction label="View" />
        </Link>
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
    getDetonator(setData, setMeta, value, setIsLoading);
  };

  useEffect(() => {
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, [searchBy, searchText]);

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
    localStorage.setItem("SearchBy", event.target.value);
    setIsLoading(true);
    getDetonator(setData, setMeta, page, setIsLoading);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setIsLoading(true);
    localStorage.setItem("FilterStatus", event.target.value);
    setFilterText(event.target.value);
    getDetonator(setData, setMeta, 1, setIsLoading);
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
      getDetonator(setData, setMeta, page, setIsLoading);
      // Add your logic here
    }, 500); // Adjust the delay as needed (in milliseconds)
    setTypingTimeout(timeout);
  };

  // let filteredItems: any;
  // if (filterText === "unapproved") {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() !== "approved" &&
  //       (searchBy === "fullname"
  //         ? data.oauth.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.oauth.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.oauth.phone.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // } else {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() === "approved" &&
  //       (searchBy === "fullname"
  //         ? data.oauth.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.oauth.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.oauth.phone.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // }

  const searchOption = [
    {
      id: 1,
      value: "fullname",
      label: "FullName",
    },
    {
      id: 2,
      value: "email",
      label: "Email",
    },
    {
      id: 3,
      value: "phone",
      label: "Phone Number",
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
        filterText={filterOptions}
        onChange={handleChangePage}
        onChangeSearch={handleChangeSearch}
        onKeyUpSearch={handleKeyUp}
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
