import { SelectChangeEvent } from "@mui/material";
import { IconCircleCheck } from "@tabler/icons-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getIndividual } from "../../api/Individual";
import { useAppContext } from "../../shared/Context";
import DataTables from "../../shared/DataTables";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface Data {
  id: number;
  status: string;
  created_at: string;
  fullname: string;
  email: string;
  phone: string;
  is_active: any;
  is_locked: any;
  meta: {
    page: number;
    per_page: number;
    page_count: number;
    total: number;
  };
}

interface Props {
  data: Data[];
  meta: Meta;
  handleChangePage: any;
}

const DataTableComponent = () => {
  const [filterText, setFilterText] = useState<any>("all");
  const [searchBy, setSearchBy] = useState<string>("fullname");
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track current page index
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
    getIndividual(setData, setMeta, page, setIsLoading);
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
      cell: (row: any) => <div>{row.fullname}</div>,
      // sortable: true,
    },
    {
      name: "Email",
      cell: (row: any) => <div>{row.email}</div>,
      // sortable: true,
      width: "270px",
    },
    {
      name: "Phone number",
      cell: (row: any) => <div>{row.phone}</div>,
      // sortable: true,
      width: "200px",
    },
    {
      name: "Registered at",
      cell: (row: any) => (
        <div>{moment(row.created_at).format("DD/MM/YYYY")}</div>
      ),
      // sortable: true,
    },
    {
      name: "Active",
      cell: (row: any) => (
        <div>{row.is_active ? <IconCircleCheck color="green" /> : ""}</div>
      ),
      // sortable: true,
    },
    {
      name: "Locked",
      cell: (row: any) => (
        <div>{row.is_locked ? <IconCircleCheck color="green" /> : ""}</div>
      ),
      // sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row: any) => (
    //     <Stack spacing={1} direction="row">
    //       <Link
    //         href={{
    //           pathname: "/ui-components/detonator/info",
    //           query: {
    //             id: row.id,
    //           },
    //         }}
    //       >
    //         <ButtonAction label="View" />
    //       </Link>
    //     </Stack>
    //   ),
    //   // sortable: true,
    // },
    // Add more columns as needed
  ];

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setCurrentPageIndex(value - 1);
    setIsLoading(true);
    getIndividual(setData, setMeta, value, setIsLoading);
  };

  useEffect(() => {
    localStorage.setItem("FilterStatus", filterText);
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, [filterText, searchBy, searchText]);

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
    localStorage.setItem("SearchBy", event.target.value);
    setIsLoading(true);
    getIndividual(setData, setMeta, page, setIsLoading);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setIsLoading(true);
    localStorage.setItem("FilterStatus", event.target.value);
    setFilterText(event.target.value);
    getIndividual(setData, setMeta, page, setIsLoading);
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
      getIndividual(setData, setMeta, page, setIsLoading);
      // Add your logic here
    }, 500); // Adjust the delay as needed (in milliseconds)
    setTypingTimeout(timeout);
  };

  // let filteredItems: any = data;
  // if (filterText == false) {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.is_active == false &&
  //       (searchBy === "fullname"
  //         ? data.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.phone.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // } else {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.is_active == true &&
  //       (searchBy === "fullname"
  //         ? data.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.phone.toLowerCase().includes(searchText.toLowerCase()))
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
      value: 1,
      label: "Active",
    },
    {
      id: 2,
      value: 0,
      label: "Unactive",
    },
    {
      id: 3,
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
        onChange={handleChangePage}
        onChangeFilterText={handleChangeFilterText}
        onKeyUpSearch={handleKeyUp}
        filterText={filterOptions}
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
