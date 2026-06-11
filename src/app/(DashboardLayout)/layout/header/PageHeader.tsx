import {
  AppBar,
  Box,
  Breadcrumbs,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";

// components
import { KeyboardArrowRight } from "@mui/icons-material";
import moment from "moment";
import { useSearchParams } from "next/navigation";

interface ItemType {
  title?: any;
  breadcrumb?: any;
  currentBalance?: any;
  lastUpdate?: any;
  filterYear?: any;
  filterYearValue?: any;
  onChangeFilterYear?: any;
  yearMonthOption?: any;
}

const PageHeader: React.FC<ItemType> = ({
  title,
  breadcrumb,
  currentBalance,
  lastUpdate,
  filterYear,
  filterYearValue,
  onChangeFilterYear,
  yearMonthOption,
}) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: "#FFF",
    boxShadow: "0px 0px 12px 0px rgba(0, 38, 96, 0.08)",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    marginBottom: "20px",
    zIndex: 0,
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    height: "100px",
    color: theme.palette.text.secondary,
  }));

  const date: any = [];
  let i = "2023";

  while (i != moment(new Date()).format("YYYY")) {
    date.push(i);
    i = moment(i, "YYYY").add(1, "year").format("YYYY");
  }

  date.push(i);

  const currentYear = useSearchParams().get("year");

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingX: "20px",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{ color: "#333", fontSize: "28px", fontWeight: "700" }}
            >
              {title}
            </Typography>
            {breadcrumb ? (
              <Breadcrumbs
                separator={<KeyboardArrowRight fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumb}
              </Breadcrumbs>
            ) : (
              ""
            )}
          </Box>
          {lastUpdate ? (
            <Typography sx={{ fontSize: "14px" }}>
              Last Updated {lastUpdate}
            </Typography>
          ) : (
            ""
          )}
          {currentBalance ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 900,
                  }}
                >
                  Total Balance
                </Typography>
                <Typography
                  sx={{
                    fontSize: "32px",
                    color: "primary.main",
                    fontWeight: 800,
                  }}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(currentBalance)}
                </Typography>
              </Box>
            </>
          ) : (
            ""
          )}
          {filterYear ? (
            <Select
              variant="standard"
              disableUnderline
              sx={{
                width: "auto",
                ".MuiSelect-select": {
                  padding: "5px",
                  border: "1px solid black",
                  borderRadius: "8px",
                  background: "transparent",
                  color: "#333",
                  ":focus": {
                    borderRadius: "8px",
                    background: "transparent",
                  },
                },
              }}
              value={filterYearValue}
              onChange={onChangeFilterYear}
            >
              {yearMonthOption
                ? yearMonthOption?.map((data: any, i: any) => (
                    <MenuItem key={i} value={data}>
                      {data} {currentYear}
                    </MenuItem>
                  ))
                : date.map((data: any, i: any) => (
                    <MenuItem key={i} value={data}>
                      {data}
                    </MenuItem>
                  ))}
            </Select>
          ) : (
            ""
          )}
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

// PageHeader.propTypes = {
//   sx: PropTypes.object,
// };

export default PageHeader;
