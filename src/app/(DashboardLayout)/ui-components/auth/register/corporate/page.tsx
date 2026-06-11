"use client";
import RegisterCorp from "@/app/(DashboardLayout)/components/auth/register-corporate";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Grid } from "@mui/material";

const AuthManagement = () => {
  return (
    <PageContainer title="Login" description="please login">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <RegisterCorp />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AuthManagement;
