import { Box, Typography } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import DataTableComponent from "./DataTable";

const List = () => {
  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Individuals Donator List
    </Typography>,
  ];

  return (
    <>
      <DashboardCard
        title="Individuals Donator Management"
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
