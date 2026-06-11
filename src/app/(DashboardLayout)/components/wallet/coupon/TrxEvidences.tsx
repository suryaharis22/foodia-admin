import { Box, Button, CircularProgress, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import ImageHandler from "../../shared/ImageHandler";
import { ModalPopupFilesDetail } from "../../shared/ModalPopup";

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

const TrxEvidences: React.FC<any> = ({ data, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");

  const onViewImage = (file: string) => {
    setIsOpen(true);
    setFile(file);
  };

  const onCloseView = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "25px",
        flexDirection: "column",
        width: "40%",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Bukti Transaksi
      </Typography>
      <Box sx={{ justifyContent: "space-between" }}>
        <Field label="Foto Makanan">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              width: "300px",
              flexWrap: "wrap",
              justifyContent: "end",
            }}
          >
            {data.report?.image_food?.map((items: any, index: any) => (
              <Button
                key={index}
                onClick={() => onViewImage(items.image_url)}
                variant="contained"
                size="small"
                sx={{
                  padding: 0,
                  width: "130px",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <ImageHandler src={items.image_url} />
              </Button>
            ))}
          </Box>
        </Field>
        <hr />
        <Field label="Bukti Transaksi">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              width: "300px",
              flexWrap: "wrap",
              justifyContent: "end",
            }}
          >
            {data.report?.image_transaction?.map((items: any, index: any) => (
              <Button
                key={index}
                onClick={() => onViewImage(items.image_url)}
                variant="contained"
                size="small"
                sx={{
                  padding: 0,
                  width: "130px",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <ImageHandler src={items.image_url} />
              </Button>
            ))}
          </Box>
        </Field>
      </Box>
      <ModalPopupFilesDetail
        open={isOpen}
        image_url={file}
        handleClose={onCloseView}
      />
    </Box>
  );
};

export default TrxEvidences;
