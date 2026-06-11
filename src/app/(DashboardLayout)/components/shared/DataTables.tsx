import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  IconArrowLeft,
  IconArrowRight,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import * as XLSX from "xlsx";
import { useAppContext } from "./Context";
import CustomStylesTable from "./CustomStylesTable";

interface Data {
  value?: any;
  valueSearchBy?: any;
  onChange?: any;
  onChangeFilterText?: any;
  filterText?: { id?: number; value?: any; label?: any }[];
  columns?: any;
  data?: any;
  onChangeSearch?: any;
  onKeyUpSearch?: any;
  onChangeSearchBy?: any;
  pageItems?: any;
  totalItems?: any;
  searchOption?: { id?: number; value?: string; label?: string }[];
  meta?: any;
  pagination?: any;
  currentPageIndex?: any;
  page?: any;
  download?: any;
  search?: any;
  searchable?: any;
  walletUrl?: any;
  excelfileName?: any;
  currentPage?: any;
  setCurrentPage?: any;
  manualSorting?: any;
  handleSort?: any;
  filterPeriode?: any;
  valueFilterPeriode?: any;
  onChangeFilterPeriode?: any;
  filterPeriodeOption?: { id?: number; value?: string; label?: string }[];
  isOpenedMonthOptions?: any;
  setIsOpenedMonthOptions?: any;
  month?: any;
  dateRangeVal?: any;
  setDateRange?: any;
  onChangeMonth?: any;
  removableFilter?: any;
  onClickRemoveFilter?: any;
}

const DataTables: React.FC<Data> = ({
  value,
  valueSearchBy,
  onChange,
  onChangeFilterText,
  columns,
  data,
  onChangeSearch,
  onKeyUpSearch,
  onChangeSearchBy,
  searchOption,
  meta,
  pageItems,
  filterText,
  pagination,
  currentPageIndex,
  page,
  download,
  search = true,
  searchable = true,
  walletUrl,
  excelfileName,
  filterPeriode,
  dateRangeVal,
  setDateRange,
  filterPeriodeOption,
  valueFilterPeriode,
  onChangeFilterPeriode,
  isOpenedMonthOptions,
  setIsOpenedMonthOptions,
  month,
  onChangeMonth,
  removableFilter,
  onClickRemoveFilter,
}) => {
  const { isLoading, setIsLoading } = useAppContext();

  let metas;

  const startIndex = currentPageIndex * meta?.per_page + 1;
  const endIndex = Math.min(
    (currentPageIndex + 1) * meta?.per_page,
    meta?.total
  );

  // if (!data) {
  //   setIsLoading(true);
  // }

  const downloadExcel = async () => {
    setIsLoading(true);

    try {
      let allData: any = [];
      let page = 1;
      let totalPages = Infinity; // Set to a high value initially

      while (page <= totalPages) {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE + `/wallet/${walletUrl}page=${page}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );
        allData = [...allData, ...response.data.body];
        totalPages = response.data.meta.page_count; // Update totalPages
        page++;
      }

      // Convert to XLSX
      const worksheet = XLSX.utils.json_to_sheet(allData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${excelfileName}.xlsx`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const styles = `
        .pagination {
            display: flex;
            background-color: #F5F6FA;
            justify-content: center;
            align-items: center;
            padding: 5px;
            gap: 10px;
            border-radius: 100px
        }
        .pagination li {
            border-radius: 100%;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background-color: transparent;
        }
        .pagination li.previous, li.next {
            background-color: #3FB648;
            color: white;
        }
        .pagination li.previous.disabled, li.next.disabled {
            background-color: gray;
            color: white;
        }
        .pagination li.previous a {
            color: white;
        }
        .pagination li.next a {
            color: white;
        }
        .pagination li.active {
            background-color: transparent;
            border: 1px solid #3FB648;
            color: #3FB648;
        }
        .pagination li.disabled {
            cursor: default;
        }
        .pagination li a {
            border-radius: 100%;
            cursor: pointer;
            color: black;
            width: 100%;
            height: 100%;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #3FB648;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: white;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndexManual = currentPageIndex * 5 + 1;
  const endIndexManual = Math.min((currentPageIndex + 1) * 5, data.length);

  const handlePageClick = ({ selected }: any) => {
    onChange(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPageIndex * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data) {
    currentPageData = data?.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      {search ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: "10px",
            height: "60px",
            // alignItems: "center",
            gap: "10px",
          }}
        >
          {value != undefined && (
            //-- Filter Status Approval --//
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Typography color="#000" fontWeight={500}>
                Filter
              </Typography>
              {filterText ? (
                <Select
                  variant="standard"
                  disableUnderline
                  sx={{
                    width: "180px",
                    ".MuiSelect-select": {
                      padding: "9px",
                      border: 0,
                      borderRadius: "12px",
                      background: "rgba(63, 182, 72, 0.10)",
                      color: "#333",
                      ":focus": {
                        borderRadius: "12px",
                        background: "rgba(63, 182, 72, 0.10)",
                      },
                    },
                  }}
                  value={value}
                  onChange={onChangeFilterText}
                >
                  {filterText?.map((data: any) => (
                    <MenuItem key={data.id} value={data.value}>
                      {data.label}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                ""
              )}
              {removableFilter ? (
                <>
                  {removableFilter.length > 0 ? (
                    <>
                      {removableFilter?.map((data: any, i: any) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            flexDirection: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid #3FB648",
                            padding: "5px",
                            pr: "10px",
                            gap: "8px",
                            borderRadius: "6px",
                          }}
                        >
                          <IconX
                            onClick={() => onClickRemoveFilter(i)}
                            cursor="pointer"
                            size={15}
                          />
                          {data}
                        </Box>
                      ))}
                      {removableFilter?.length > 0 && (
                        <Typography
                          onClick={() => onClickRemoveFilter("all")}
                          sx={{
                            cursor: "pointer",
                            color: "#3FB648",
                            fontSize: "14px",
                          }}
                        >
                          Clear All
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography color="#000" fontSize="14px" fontWeight={500}>
                      All
                    </Typography>
                  )}
                </>
              ) : (
                ""
              )}
            </Box>
          )}
          {filterPeriode ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Typography>Filter by Date : </Typography>
              <DateRangePicker
                value={dateRangeVal}
                onChange={(value: any) => setDateRange(value)}
              />
            </Box>
          ) : (
            ""
          )}
          {searchOption ? (
            //-- Filter Columns --//
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(63, 182, 72, 0.10)",
                borderRadius: "12px",
                paddingRight: "10px",
              }}
            >
              <Select
                variant="standard"
                size="small"
                disableUnderline
                label="dd"
                sx={{
                  ".MuiSelect-select": {
                    padding: "10px",
                    width: "140px",
                    paddingLeft: "20px",
                    background: "rgba(63, 182, 72, 0.10)",
                    borderRadius: "12px 0px 0px 12px",
                    ":focus": {
                      borderRadius: "12px 0px 0px 12px",
                      background: "rgba(63, 182, 72, 0.10)",
                    },
                  },
                }}
                value={valueSearchBy}
                onChange={onChangeSearchBy}
              >
                {searchOption?.map((data: any) => (
                  <MenuItem key={data.id} value={data.value}>
                    {data.label}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                id="search"
                variant="standard"
                size="small"
                placeholder="Search..."
                onKeyUp={onKeyUpSearch}
                // label="Search By"
                InputProps={{
                  sx: {
                    ".MuiInput-input": {
                      padding: "10px",
                      // borderRadius: "12px 0px 0px 12px",
                    },
                  },
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconSearch />
                    </InputAdornment>
                  ),
                }}
                onChange={onChangeSearch}
              />
            </Box>
          ) : (
            searchable && (
              <Input
                disableUnderline
                size="small"
                placeholder="Search Name"
                sx={{
                  background: "rgba(63, 182, 72, 0.10)",
                  padding: "10px 16px",
                  borderRadius: "15px",
                  ".MuiInput-input": {
                    padding: 0,
                  },
                }}
                startAdornment={
                  <InputAdornment
                    sx={{ color: "primary.main" }}
                    position="start"
                  >
                    <Search />
                  </InputAdornment>
                }
                onChange={onChangeSearch}
              />
            )
          )}
          {download ? (
            //-- Button Download --//
            <Button
              onClick={() => downloadExcel()}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                color: "#686C7A",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M16.25 5.56982H12.5C12.4337 5.56982 12.3701 5.54349 12.3232 5.4966C12.2763 5.44972 12.25 5.38613 12.25 5.31982V1.56982C12.25 1.50352 12.2763 1.43993 12.3232 1.39305C12.3701 1.34616 12.4337 1.31982 12.5 1.31982C12.5663 1.31982 12.6299 1.34616 12.6768 1.39305C12.7237 1.43993 12.75 1.50352 12.75 1.56982V5.06982H16.25C16.3163 5.06982 16.3799 5.09616 16.4268 5.14305C16.4737 5.18993 16.5 5.25352 16.5 5.31982C16.5 5.38613 16.4737 5.44972 16.4268 5.4966C16.3799 5.54349 16.3163 5.56982 16.25 5.56982Z"
                  fill="#0F773D"
                />
                <path
                  d="M16.25 8.06133C16.1837 8.06133 16.1201 8.03499 16.0732 7.9881C16.0263 7.94122 16 7.87763 16 7.81133V5.42332L12.3965 1.81982H5C4.73478 1.81982 4.48043 1.92518 4.29289 2.11272C4.10536 2.30025 4 2.55461 4 2.81982V7.72832C4 7.79463 3.97366 7.85822 3.92678 7.9051C3.87989 7.95199 3.8163 7.97832 3.75 7.97832C3.6837 7.97832 3.62011 7.95199 3.57322 7.9051C3.52634 7.85822 3.5 7.79463 3.5 7.72832V2.81982C3.5 2.422 3.65804 2.04047 3.93934 1.75916C4.22064 1.47786 4.60218 1.31982 5 1.31982H12.5C12.5329 1.31977 12.5654 1.32618 12.5958 1.33871C12.6261 1.35123 12.6537 1.36962 12.677 1.39282L16.427 5.14282C16.4502 5.16608 16.4686 5.19369 16.4811 5.22406C16.4936 5.25443 16.5001 5.28697 16.5 5.31982V7.81133C16.5 7.84416 16.4935 7.87666 16.481 7.907C16.4684 7.93733 16.45 7.96489 16.4268 7.9881C16.4036 8.01132 16.376 8.02973 16.3457 8.04229C16.3153 8.05486 16.2828 8.06133 16.25 8.06133Z"
                  fill="#0F773D"
                />
                <path
                  d="M15 19.3198H5C4.60218 19.3198 4.22064 19.1618 3.93934 18.8805C3.65804 18.5992 3.5 18.2176 3.5 17.8198V14.0698C3.5 14.0035 3.52634 13.9399 3.57322 13.893C3.62011 13.8462 3.6837 13.8198 3.75 13.8198C3.8163 13.8198 3.87989 13.8462 3.92678 13.893C3.97366 13.9399 4 14.0035 4 14.0698V17.8198C4 18.085 4.10536 18.3394 4.29289 18.5269C4.48043 18.7145 4.73478 18.8198 5 18.8198H15C15.2652 18.8198 15.5196 18.7145 15.7071 18.5269C15.8946 18.3394 16 18.085 16 17.8198V14.0698C16 14.0035 16.0263 13.9399 16.0732 13.893C16.1201 13.8462 16.1837 13.8198 16.25 13.8198C16.3163 13.8198 16.3799 13.8462 16.4268 13.893C16.4737 13.9399 16.5 14.0035 16.5 14.0698V17.8198C16.5 18.2176 16.342 18.5992 16.0607 18.8805C15.7794 19.1618 15.3978 19.3198 15 19.3198Z"
                  fill="#0F773D"
                />
                <path
                  d="M13.75 14.3198H6.25C6.1837 14.3198 6.12011 14.2935 6.07322 14.2466C6.02634 14.1997 6 14.1361 6 14.0698C6 14.0035 6.02634 13.9399 6.07322 13.893C6.12011 13.8462 6.1837 13.8198 6.25 13.8198H13.75C13.8163 13.8198 13.8799 13.8462 13.9268 13.893C13.9737 13.9399 14 14.0035 14 14.0698C14 14.1361 13.9737 14.1997 13.9268 14.2466C13.8799 14.2935 13.8163 14.3198 13.75 14.3198Z"
                  fill="#0F773D"
                />
                <path
                  d="M10 16.8198H6.25C6.1837 16.8198 6.12011 16.7935 6.07322 16.7466C6.02634 16.6997 6 16.6361 6 16.5698C6 16.5035 6.02634 16.4399 6.07322 16.393C6.12011 16.3462 6.1837 16.3198 6.25 16.3198H10C10.0663 16.3198 10.1299 16.3462 10.1768 16.393C10.2237 16.4399 10.25 16.5035 10.25 16.5698C10.25 16.6361 10.2237 16.6997 10.1768 16.7466C10.1299 16.7935 10.0663 16.8198 10 16.8198Z"
                  fill="#0F773D"
                />
                <path
                  d="M16.25 14.32H3.75C3.35218 14.32 2.97064 14.162 2.68934 13.8807C2.40804 13.5994 2.25 13.2178 2.25 12.82V8.97852C2.25 8.58069 2.40804 8.19916 2.68934 7.91786C2.97064 7.63655 3.35218 7.47852 3.75 7.47852H3.76L16.26 7.56152C16.6558 7.5652 17.0342 7.72471 17.3132 8.00549C17.5922 8.28627 17.7493 8.66569 17.7505 9.06152V12.82C17.7505 13.017 17.7117 13.2121 17.6363 13.3942C17.5609 13.5762 17.4503 13.7416 17.311 13.8809C17.1716 14.0201 17.0062 14.1306 16.8242 14.206C16.6421 14.2813 16.447 14.3201 16.25 14.32ZM3.75 7.97852C3.48478 7.97852 3.23043 8.08387 3.04289 8.27141C2.85536 8.45895 2.75 8.7133 2.75 8.97852V12.82C2.75 13.0852 2.85536 13.3396 3.04289 13.5271C3.23043 13.7147 3.48478 13.82 3.75 13.82H16.25C16.5152 13.82 16.7696 13.7147 16.9571 13.5271C17.1446 13.3396 17.25 13.0852 17.25 12.82V9.06152C17.2492 8.79758 17.1444 8.54458 16.9584 8.35738C16.7723 8.17019 16.5199 8.06388 16.256 8.06152L3.756 7.97852H3.75Z"
                  fill="#0F773D"
                />
                <path
                  d="M7.62117 12.1201H5.88867V9.4541H7.60367V9.8506H6.36917V10.5731H7.36117V10.9596H6.36917V11.7056H7.61917L7.62117 12.1201Z"
                  fill="#0F773D"
                />
                <path
                  d="M9.50819 12.12H8.99919L8.58119 11.4015L8.12519 12.12H7.74219L8.39919 11.1045L7.83069 10.1475H8.34069L8.66469 10.7275L9.03369 10.1475H9.40669L8.84919 11.003L9.50819 12.12Z"
                  fill="#0F773D"
                />
                <path
                  d="M10.8697 11.3955L11.2527 11.4345C11.203 11.6819 11.1074 11.8652 10.9657 11.9845C10.8207 12.1039 10.6374 12.1667 10.4497 12.161C10.1774 12.161 9.96802 12.061 9.82168 11.861C9.67086 11.6483 9.59377 11.3921 9.60218 11.1315C9.60218 10.8345 9.68219 10.589 9.84219 10.395C9.91913 10.3002 10.017 10.2246 10.1282 10.1741C10.2393 10.1236 10.3607 10.0996 10.4827 10.104C10.9124 10.104 11.1682 10.3305 11.2502 10.7835L10.8672 10.836C10.8339 10.5914 10.7134 10.469 10.5057 10.469C10.4372 10.4659 10.3693 10.4832 10.3107 10.5189C10.2521 10.5545 10.2054 10.6068 10.1767 10.669C10.1045 10.8183 10.0694 10.9828 10.0742 11.1485C10.0742 11.3485 10.1097 11.5022 10.1807 11.6095C10.2118 11.6608 10.256 11.7028 10.3087 11.7313C10.3614 11.7597 10.4208 11.7736 10.4807 11.7715C10.6764 11.7705 10.806 11.6452 10.8697 11.3955Z"
                  fill="#0F773D"
                />
                <path
                  d="M12.8498 11.4909L13.2498 11.5454C13.1991 11.7219 13.0922 11.8769 12.9453 11.9869C12.7807 12.1072 12.5805 12.1685 12.3768 12.1609C12.1035 12.1609 11.8835 12.0691 11.7168 11.8854C11.5501 11.7018 11.4668 11.4531 11.4668 11.1394C11.4668 10.8414 11.5501 10.5948 11.7168 10.3994C11.8835 10.2041 12.1113 10.1064 12.4003 10.1064C12.6816 10.1064 12.8983 10.2028 13.0503 10.3954C13.2023 10.5881 13.2791 10.8354 13.2808 11.1374V11.1874H11.9303C11.927 11.2962 11.9398 11.4049 11.9683 11.5099C11.9957 11.5939 12.048 11.6675 12.1183 11.7209C12.1994 11.7827 12.2994 11.8145 12.4013 11.8109C12.6226 11.8113 12.7721 11.7046 12.8498 11.4909ZM12.8223 10.9009C12.8267 10.7721 12.7808 10.6465 12.6943 10.5509C12.6547 10.5091 12.6071 10.4756 12.5544 10.4525C12.5016 10.4293 12.4448 10.4169 12.3872 10.4161C12.3296 10.4153 12.2724 10.426 12.219 10.4476C12.1656 10.4692 12.1171 10.5013 12.0763 10.5419C11.9881 10.6404 11.937 10.7664 11.9318 10.8984L12.8223 10.9009Z"
                  fill="#0F773D"
                />
                <path
                  d="M14.135 12.1201H13.6895V9.4541H14.135V12.1201Z"
                  fill="#0F773D"
                />
              </svg>{" "}
              Download
            </Button>
          ) : (
            ""
          )}
        </Box>
      ) : (
        ""
      )}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <br />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <DataTable
              customStyles={CustomStylesTable}
              columns={columns}
              data={data}
            />
            {pagination && meta ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // backgroundColor: "red",
                  borderRadius: "0px 0px 6px 6px",
                  border: "1px solid #CCD1D9",
                  padding: "10px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  Showing <Typography fontWeight={700}>{startIndex}</Typography>{" "}
                  to <Typography fontWeight={700}>{endIndex}</Typography> of{" "}
                  <Typography fontWeight={700}>{meta?.total}</Typography>{" "}
                  results
                </Box>
                <Box>
                  <Pagination
                    style={{
                      backgroundColor: "gray",
                      borderRadius: "40px",
                      padding: "4px",
                      background: "var(--UI-Neutral-Neutral-30, #F5F6FA)",
                    }}
                    onChange={onChange}
                    page={meta?.page}
                    count={meta?.page_count}
                    defaultPage={1}
                    siblingCount={0}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: IconArrowLeft,
                          next: IconArrowRight,
                        }}
                        {...item}
                      />
                    )}
                    sx={{
                      "& .MuiPaginationItem-previousNext": {
                        color: "white",
                        backgroundColor: "primary.main", // Customize the background color of the ul element
                        // padding: "8px", // Add padding to the ul element for spacing
                        borderRadius: "100%", // Optional: Customize the border radius of the ul element
                      },
                      "& .MuiPaginationItem-root": {
                        borderRadius: "40px",
                        "&.Mui-selected": {
                          borderColor: "primary.main",
                          backgroundColor: "transparent", // Customize the background color of the selected pagination item
                          color: "primary.main", // Customize the text color of the selected pagination item
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            ) : (
              // when meta not available
              pagination &&
              !meta && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "0px 0px 6px 6px",
                    border: "1px solid #CCD1D9",
                    paddingX: "10px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    Showing{" "}
                    <Typography fontWeight={700}>{startIndexManual}</Typography>{" "}
                    to{" "}
                    <Typography fontWeight={700}>{endIndexManual}</Typography>{" "}
                    of <Typography fontWeight={700}>{data.length}</Typography>{" "}
                    results
                  </Box>
                  <Box>
                    <style>{styles}</style>
                    <ReactPaginate
                      previousLabel={
                        <IconArrowLeft
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      }
                      nextLabel={
                        <IconArrowRight
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      }
                      breakLabel={<a className="text-merah">...</a>}
                      pageRangeDisplayed={1}
                      marginPagesDisplayed={1}
                      forcePage={currentPageIndex}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination"}
                      activeClassName={"active"}
                    />
                  </Box>
                </Box>
              )
            )}
          </Box>
        </>
      )}
    </>
  );
};

// table without header(search, filter)
export const DataTablesManualPagination: React.FC<Data> = ({
  data,
  columns,
  pageItems,
  pagination,
  currentPage,
  setCurrentPage,
  onChange,
  manualSorting,
  search,
  onChangeSearch,
  handleSort,
}) => {
  {
    manualSorting &&
      data.sort(function (a: any, b: any) {
        return b.id - a.id;
      });
  }

  const { isLoading, setIsLoading } = useAppContext();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * 5 + 1;
  const endIndex = Math.min((currentPage + 1) * 5, data.length);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData = data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  const styles = `
        .pagination {
            display: flex;
            background-color: #F5F6FA;
            justify-content: center;
            align-items: center;
            padding: 5px;
            gap: 10px;
            border-radius: 100px
        }
        .pagination li {
            border-radius: 100%;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background-color: transparent;
        }
        .pagination li.previous, li.next {
            background-color: #3FB648;
            color: white;
        }
        .pagination li.previous.disabled, li.next.disabled {
            background-color: gray;
            color: white;
        }
        .pagination li.previous a {
            color: white;
        }
        .pagination li.next a {
            color: white;
        }
        .pagination li.active {
            background-color: transparent;
            border: 1px solid #3FB648;
            color: #3FB648;
        }
        .pagination li.disabled {
            cursor: default;
        }
        .pagination li a {
            border-radius: 100%;
            cursor: pointer;
            color: black;
            width: 100%;
            height: 100%;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #3FB648;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: white;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  const CustomStylesTable = {
    table: {
      style: {
        maxWidth: "auto", // set the width of the table wrapper
        border: "1px solid #CCD1D9",
        borderRadius: "6px 6px 0px 0px",
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "left",
      },
    },
    rows: {
      style: {
        backgroundColor: "#FCFDFF",
        // marginTop: "10px",
        // borderRadius: "10px",
        // border: "0px",
        minHeight: "52px", // override the row height
        "&:not(:last-of-type)": {
          // border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#FCFDFF",
        color: "black",
        minHeight: "52px",
        borderRadius: "6px 6px 0px 0px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        // justifyContent: "center",
        color: "black",
        fontWeight: "bold",
      },
    },
    pagination: {
      style: {
        // backgroundColor: "#FCFDFF",
        // borderTop: "none",
        // padding: "10px",
        // border: "1px solid #CCD1D9",
        // borderTop: "0px",
        // justifyContent: "center",
        // borderRadius: "40px",
      },
      pageButtonsStyle: {
        borderRadius: "100%",
        border: "1px solid #CCD1D9",
        margin: "2px",
        color: "#007BFF",
        backgroundColor: "white",
      },
      activePageButtonStyle: {
        backgroundColor: "#007BFF",
        color: "white",
      },
      disabledPageButtonStyle: {
        color: "#ccc",
        cursor: "not-allowed",
      },
    },
  };

  return (
    <>
      {search ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            gap: "10px",
          }}
        >
          <Input
            disableUnderline
            size="small"
            placeholder="Search Nama Donator"
            sx={{
              background: "rgba(63, 182, 72, 0.10)",
              padding: "10px 18px",
              paddingRight: "18px",
              borderRadius: "15px",
              ".MuiInput-input": {
                padding: 0,
              },
            }}
            startAdornment={
              <InputAdornment sx={{ color: "primary.main" }} position="start">
                <Search />
              </InputAdornment>
            }
            onChange={onChangeSearch}
          />
        </Box>
      ) : (
        ""
      )}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
          <br />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DataTable
              customStyles={CustomStylesTable}
              columns={columns}
              data={currentPageData}
              defaultSortFieldId="deposit"
              defaultSortAsc={false}
              onSort={handleSort}
            />
            {pagination ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // backgroundColor: "red",
                  borderRadius: "0px 0px 6px 6px",
                  border: "1px solid #CCD1D9",
                  paddingX: "10px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  Showing <Typography fontWeight={700}>{startIndex}</Typography>{" "}
                  to <Typography fontWeight={700}>{endIndex}</Typography> of{" "}
                  <Typography fontWeight={700}>{data.length}</Typography>{" "}
                  results
                </Box>
                <Box>
                  <style>{styles}</style>
                  <ReactPaginate
                    previousLabel={
                      <IconArrowLeft
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    }
                    nextLabel={
                      <IconArrowRight
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    }
                    breakLabel={<a className="text-merah">...</a>}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    forcePage={currentPage}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default DataTables;
