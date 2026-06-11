"use client";
import { Grid, Paper } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DonatorData from "@/app/(DashboardLayout)/components/donator/List";

const MerchantManagement = () => {
  return (
    <PageContainer
      title="Merchant Management"
      description="this is Merchant management"
    >
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <DonatorData />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default MerchantManagement;
