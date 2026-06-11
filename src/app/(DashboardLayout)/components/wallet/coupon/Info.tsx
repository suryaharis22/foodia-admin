import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

function Field({ children, label }: { label: any; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          width: "100%",
          color: "#999",
        }}
      >
        <Typography width="auto">{label}</Typography>
        {children}
      </Box>
    </Box>
  );
}

const Info: React.FC<any> = ({ data, isLoading }) => {
  const [isOpenMaps, setIsOpenMaps] = useState(false);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [address, setAddress] = useState("");

  function maskedKTP(str?: any) {
    const len = str?.length;

    const start = Math.floor(len / 4);
    const end = Math.floor((2 * len) / 2.4);
    const masked =
      str?.slice(0, start) + "*".repeat(end - start) + str?.slice(end);

    return masked;
  }

  function maskedPhone(str?: any) {
    const len = str?.length;

    const start = Math.floor(len / 4);
    const end = Math.floor((2 * len) / 2.5);
    const masked =
      str?.slice(0, start) + "*".repeat(end - start) + str?.slice(end);

    return masked;
  }

  const Map = React.useMemo(
    () => dynamic(() => import("../../shared/LeafLet"), { ssr: false }),
    []
  );

  // Ensure latitude and longitude are valid numbers
  const isValidCoordinates =
    !isNaN(parseFloat(lat)) && !isNaN(parseFloat(long));

  return (
    <Box
      sx={{
        display: "flex",
        gap: "25px",
        flexDirection: "column",
        width: "55%",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Informasi Transaksi
      </Typography>

      <Box sx={{ justifyContent: "space-between" }}>
        <Field label="Tanggal Transaksi Kupon">
          <Typography sx={{ color: "black" }}>
            {moment(data?.transaction_date || 0).format(
              "DD MMMM YYYY hh:mm:ss"
            ) + " WIB"}
          </Typography>
        </Field>
        <hr />
        <Box sx={{ display: "flex", gap: "8px", flexDirection: "column" }}>
          <Field label="PIC Merchant">
            <Typography sx={{ color: "#1D5882", fontWeight: "bold" }}>
              {data.merchant?.fullname.toUpperCase()}
            </Typography>
          </Field>
          <Field label="Toko Merchant">
            <Typography sx={{ color: "black" }}>
              {data.merchant?.merchant_name}
            </Typography>
          </Field>
          <Field label="Menu Merchant">
            <Typography sx={{ color: "black" }}>
              {data.merchant_product?.name}
            </Typography>
          </Field>
          <Field label="Harga Menu Merchant">
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ color: "black" }}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.total_amount || 0)}
              </Typography>
              <Typography sx={{ color: "#1D5882", fontSize: "14px" }}>
                (Termasuk Biaya Platform Rp 1.000)
              </Typography>
            </Box>
          </Field>
          <Field label="KTP Merchant">
            <Typography sx={{ color: "black" }}>
              {maskedKTP(data?.merchant?.ktp_number)}
            </Typography>
          </Field>
          <Field label="Kontak Merchant">
            <Typography sx={{ color: "black" }}>
              {maskedPhone(data?.merchant?.no_link_aja)}
            </Typography>
          </Field>
          <Field label="Alamat Merchant">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                sx={{ color: "black", width: "380px", textAlign: "end" }}
              >
                {data.merchant?.address}
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 21 20"
                fill="none"
                cursor="pointer"
                onClick={() => {
                  setIsOpenMaps(true);
                  setAddress(data.merchant.address);
                  setLat(data.merchant.latitude);
                  setLong(data.merchant.longitude);
                }}
              >
                <path
                  d="M16.8346 8.0013C16.8346 9.11387 16.4488 10.3252 15.803 11.5581C15.1607 12.7843 14.2925 13.9726 13.4046 15.022C12.519 16.0686 11.6306 16.9573 10.9625 17.585C10.7929 17.7442 10.6379 17.8863 10.5013 18.0095C10.3647 17.8863 10.2097 17.7442 10.0401 17.585C9.372 16.9573 8.48356 16.0686 7.59802 15.022C6.71006 13.9726 5.84191 12.7843 5.19963 11.5581C4.55379 10.3252 4.16797 9.11387 4.16797 8.0013C4.16797 4.48692 6.98692 1.66797 10.5013 1.66797C14.0157 1.66797 16.8346 4.48692 16.8346 8.0013Z"
                  fill="#DE0606"
                  stroke="#DE0606"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1654 7.9987C14.1654 10.0237 12.5237 11.6654 10.4987 11.6654C8.47365 11.6654 6.83203 10.0237 6.83203 7.9987C6.83203 5.97365 8.47365 4.33203 10.4987 4.33203C12.5237 4.33203 14.1654 5.97365 14.1654 7.9987Z"
                  fill="#FF8484"
                  stroke="#FF8484"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 10C11.6046 10 12.5 9.10457 12.5 8C12.5 6.89543 11.6046 6 10.5 6C9.39543 6 8.5 6.89543 8.5 8C8.5 9.10457 9.39543 10 10.5 10Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Box>
          </Field>
        </Box>
        <hr />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Field label="Beneficiaries">
            <Typography sx={{ color: "#1D5882", fontWeight: "bold" }}>
              {data.beneficiary?.fullname.toUpperCase()}
            </Typography>
          </Field>
          <Field label="KTP Beneficiaries">
            <Typography sx={{ color: "black" }}>
              {maskedKTP(data.beneficiary?.ktp_number)}
            </Typography>
          </Field>
          <Field label="Kontak Beneficiaries">
            <Typography sx={{ color: "black" }}>
              {maskedPhone(data.beneficiary?.phone)}
            </Typography>
          </Field>
          <Field label="Alamat beneficiary">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                sx={{ color: "black", width: "380px", textAlign: "end" }}
              >
                {data.beneficiary?.address}
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 21 20"
                fill="none"
                cursor="pointer"
                onClick={() => {
                  setIsOpenMaps(true);
                  setAddress(data.beneficiary.address);
                  setLat(data.beneficiary.latitude);
                  setLong(data.beneficiary.longitude);
                }}
              >
                <path
                  d="M16.8346 8.0013C16.8346 9.11387 16.4488 10.3252 15.803 11.5581C15.1607 12.7843 14.2925 13.9726 13.4046 15.022C12.519 16.0686 11.6306 16.9573 10.9625 17.585C10.7929 17.7442 10.6379 17.8863 10.5013 18.0095C10.3647 17.8863 10.2097 17.7442 10.0401 17.585C9.372 16.9573 8.48356 16.0686 7.59802 15.022C6.71006 13.9726 5.84191 12.7843 5.19963 11.5581C4.55379 10.3252 4.16797 9.11387 4.16797 8.0013C4.16797 4.48692 6.98692 1.66797 10.5013 1.66797C14.0157 1.66797 16.8346 4.48692 16.8346 8.0013Z"
                  fill="#DE0606"
                  stroke="#DE0606"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1654 7.9987C14.1654 10.0237 12.5237 11.6654 10.4987 11.6654C8.47365 11.6654 6.83203 10.0237 6.83203 7.9987C6.83203 5.97365 8.47365 4.33203 10.4987 4.33203C12.5237 4.33203 14.1654 5.97365 14.1654 7.9987Z"
                  fill="#FF8484"
                  stroke="#FF8484"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 10C11.6046 10 12.5 9.10457 12.5 8C12.5 6.89543 11.6046 6 10.5 6C9.39543 6 8.5 6.89543 8.5 8C8.5 9.10457 9.39543 10 10.5 10Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Box>
          </Field>
        </Box>
      </Box>

      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          paddingTop: "60px",
          paddingBottom: "10px",
          outline: "none",
        }}
        open={isOpenMaps}
        // onClose={() => setIsOpenMaps(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            bgcolor: "white",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            outline: "none",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "end",
              paddingBottom: "20px",
            }}
          >
            <IconX
              color="red"
              cursor="pointer"
              onClick={() => setIsOpenMaps(false)}
            />
          </Typography>
          <Typography sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            {address}
          </Typography>
          {isValidCoordinates ? (
            <Map lat={lat} long={long} />
          ) : (
            <Typography variant="body2" color="error">
              Invalid coordinates
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Info;
