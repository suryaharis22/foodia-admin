import { Button, SelectChangeEvent } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBeneficiaries } from "../api/Beneficiaries";
import { ButtonAction, Status } from "../shared/Buttons";
import { useAppContext } from "../shared/Context";
import DataTables from "../shared/DataTables";
import axios from "axios";

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
    getBeneficiaries(setData, setMeta, page, setIsLoading);
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
            pathname: "/ui-components/pages/beneficiaries/info",
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
    getBeneficiaries(setData, setMeta, value, setIsLoading);
  };

  useEffect(() => {
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, [searchBy, searchText]);

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
    localStorage.setItem("SearchBy", event.target.value);
    setIsLoading(true);
    getBeneficiaries(setData, setMeta, page, setIsLoading);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setIsLoading(true);
    localStorage.setItem("FilterStatus", event.target.value);
    setFilterText(event.target.value);
    getBeneficiaries(setData, setMeta, 1, setIsLoading);
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
      getBeneficiaries(setData, setMeta, page, setIsLoading);
      // Add your logic here
    }, 500); // Adjust the delay as needed (in milliseconds)
    setTypingTimeout(timeout);
  };

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

  // const [selectedFile, setSelectedFile] = useState(null);
  // const [message, setMessage] = useState("");

  // const handleFileChange = (e: any) => {
  //   setSelectedFile(e.target.files[0]); // Set the selected file
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault(); // Prevent the default form submission

  //   if (!selectedFile) {
  //     setMessage("Please select an image to upload");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", selectedFile); // Append the file to the form data

  //   try {
  //     // Send POST request using Axios
  //     const response = await axios.post(
  //       "http://192.168.1.213:5000/upload_compare",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     // Handle the response
  //     setMessage(response.data.message || "Image uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error uploading the image:", error);
  //     setMessage("Error uploading image.");
  //   }
  // };

  return (
    <>
      {/* <Button onClick={() => tes()}?>asfaf</Button>
      <div>
        <h1>Upload an Image</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Upload Image</button>
        </form>
        <p>{message}</p>
      </div> */}
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
