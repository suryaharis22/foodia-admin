import { Box, SelectChangeEvent, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../shared/Context";
import DataTables, { DataTablesManualPagination } from "../shared/DataTables";
import DetailCard from "../shared/DetailCard";

interface Data {
  id: number;
  transaction: {
    sender_name: string;
    amount: number;
    transaction_type: string;
    transaction_date: string;
    transaction_status: string;
  };
}

interface Props {
  data: Data[];
  //   meta: Meta;
  //   handleChangePage: any;
}

const Donators: React.FC<Props> = ({ data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useAppContext();

  const columns = [
    {
      name: "No",
      selector: (_row: any, i: any) => i + 1 + currentPage * 5,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Name",
      cell: (row: Data) => <div>{row.transaction.sender_name}</div>,
    },
    {
      name: "Amount",
      cell: (row: Data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.transaction.amount)}
        </div>
      ),
      width: "130px",
    },
    {
      name: "Transaction Date",
      cell: (row: Data) => (
        <div>
          {moment(row.transaction.transaction_date).format("DD/MM/YYYY hh:mm")}
        </div>
      ),
      width: "135px",
    },
  ];

  useEffect(() => {
    setIsLoading(false);
    localStorage.setItem("SearchText", searchText);
  }, [searchText, setIsLoading]);

  const handleChangeSearch = (event: SelectChangeEvent) => {
    setSearchText(event.target.value);
    localStorage.setItem("SearchText", event.target.value);
  };

  let filteredItems: any;

  filteredItems = data?.filter((data) =>
    data?.transaction.sender_name
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

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
  ];

  return (
    <>
      <DetailCard title="Donators">
        <Box sx={{ width: "100%" }}>
          {/* <Typography
            sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}
          >
            {data.length} Total Donators
          </Typography> */}
          <DataTablesManualPagination
            // download={false}
            // onChangeSearch={handleChangeSearch}
            // pageItems={data.length}
            manualSorting={true}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            columns={columns}
            data={filteredItems}
            pagination={true}
          />
        </Box>
      </DetailCard>
    </>
  );
};

export default Donators;
