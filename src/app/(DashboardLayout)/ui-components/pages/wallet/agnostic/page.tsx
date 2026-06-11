"use client";
import { Grid, Paper } from "@mui/material";
import CampaignData from "@/app/(DashboardLayout)/components/wallet/agnostic/List";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const CampaignManagement = () => {
  return (
    <PageContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <CampaignData />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CampaignManagement;
