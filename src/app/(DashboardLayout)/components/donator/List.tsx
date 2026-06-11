import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCorporation } from "../api/Corporation";
import { useAppContext } from "../shared/Context";
import DashboardCard from "../shared/DashboardCard";
import DataTableComponent from "./DataTable";

const List = () => {
  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Corporation Donator List
    </Typography>,
  ];

  return (
    <>
      <DashboardCard
        title="Corporation Donators Management"
        breadcrumb={breadcrumbs}
      >
        <Box sx={{ paddingX: "40px" }}>
          <DataTableComponent />
        </Box>
      </DashboardCard>
    </>
  );
};

export default List;
