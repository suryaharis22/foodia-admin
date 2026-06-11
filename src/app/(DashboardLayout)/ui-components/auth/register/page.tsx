"use client";
import Register from "@/app/(DashboardLayout)/components/auth/register";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Grid } from "@mui/material";

const AuthManagement = () => {
  return (
    <PageContainer title="Login" description="please login">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Register />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AuthManagement;
