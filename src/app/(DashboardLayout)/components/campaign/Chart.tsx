import React from "react";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import BaseCard from "../shared/DashboardCard";
import { Box, Typography } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Charts = ({ options, series, label, type, width }: any) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <Box>
      <Typography sx={{ fontStyle: "italic", fontSize: "15px" }}>
        {label}
      </Typography>
      <Chart
        options={options}
        series={series}
        type={type}
        height="205px"
        width={width ? width : "100%"}
      />
    </Box>
  );
};

export default Charts;
