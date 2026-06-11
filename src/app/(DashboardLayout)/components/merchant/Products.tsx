import { Box, SelectChangeEvent, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { ButtonAction, Status } from "../shared/Buttons";
import DataTables from "../shared/DataTables";
import { useAppContext } from "../shared/Context";
import { getProduct } from "../api/Product";
import DetailCard from "../shared/DetailCard";

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
}

interface Props {
  data: Data[];
  //   meta: Meta;
  //   handleChangePage: any;
}

const columns = [
  {
    name: "No",
    selector: (_row: any, i: any) => i + 1,
    width: "70px",
    // style: {
    //   paddingLeft: "30px",
    // },
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
    width: "260px",
  },
  {
    name: "Quantity",
    cell: (row: any) => <div>{row.qty}</div>,
    width: "100px",
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
];

const Products: React.FC<Props> = ({ data }) => {
  const [filterText, setFilterText] = useState<string>("all");
  const [searchBy, setSearchBy] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useAppContext();

  useEffect(() => {
    setIsLoading(false);
    localStorage.setItem("FilterStatus", filterText);
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, [filterText, searchBy, searchText, setIsLoading]);

  const handleChangeSearch = (event: SelectChangeEvent) => {
    setSearchText(event.target.value);
    localStorage.setItem("SearchText", event.target.value);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setIsLoading(false);
    localStorage.setItem("FilterStatus", event.target.value);
    setFilterText(event.target.value);
  };

  let filteredItems: any;
  if (filterText === "waiting") {
    let filteredStatus = data.filter(
      (data) => data.status.toLowerCase() === "waiting"
    );
    filteredItems = filteredStatus.filter((data) =>
      data.name.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (filterText === "approved") {
    let filteredStatus = data.filter(
      (data) => data.status.toLowerCase() === "approved"
    );
    filteredItems = filteredStatus.filter((data) =>
      data.name.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (filterText === "rejected") {
    let filteredStatus = data.filter(
      (data) => data.status.toLowerCase() === "rejected"
    );
    filteredItems = filteredStatus.filter((data) =>
      data.name.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (filterText === "all") {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

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
      <DetailCard title="Merchant Products">
        <Box sx={{ width: "100%" }}>
          <DataTables
            value={filterText}
            // searchOption={searchOption}
            // valueSearchBy={searchBy}
            onChangeFilterText={handleChangeFilterText}
            // onKeyUpSearch={handleKeyUp}
            filterText={filterOptions}
            // onChange={handleChangePage}
            download={false}
            onChangeSearch={handleChangeSearch}
            // onChangeSearchBy={handleChangeSearchBy}
            // pageItems={data.length}
            // meta={meta}
            columns={columns}
            data={filteredItems}
            // pagination={true}
          />
        </Box>
      </DetailCard>
    </>
  );
};

export default Products;
