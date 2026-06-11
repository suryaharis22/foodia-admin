"use client";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import CouponData from "@/app/(DashboardLayout)/components/wallet/coupon/List";
import { CircularProgress } from "@mui/material";

const CouponManagement = () => {
  const { isLoading, setIsLoading } = useAppContext();
  return (
    <>
      <CouponData />
    </>
  );
};

export default CouponManagement;
