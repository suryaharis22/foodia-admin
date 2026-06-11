import { Box, Typography } from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import DataTableComponent from "./DataTable";

const List = () => {
  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Volunteer List
    </Typography>,
  ];

  return (
    <>
      <BaseCard title="Volunteer Management" breadcrumb={breadcrumbs}>
        <Box sx={{ paddingX: "30px" }}>
          <DataTableComponent />
        </Box>
      </BaseCard>
    </>
  );
};

export default List;
