import { Box, Typography } from "@mui/material";

interface ChildProps {
  children: React.ReactNode;
  title: any;
  subTitle?: any;
}

const DetailCard: React.FC<ChildProps> = ({ children, title, subTitle }) => {
  return (
    <>
      {/* <BaseCard title="Detonator Info" status={data.status}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: "20px",
          paddingX: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        {subTitle && (
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}
          >
            <Typography
              sx={{ color: "red", fontSize: "18px", fontWeight: "bold" }}
            >
              Saldo
            </Typography>
            <Typography
              sx={{ color: "red", fontSize: "18px", fontWeight: "bold" }}
            >
              {subTitle}
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "20px",
          // paddingLeft: "45px",
          // paddingY: "20px",
          backgroundColor: "#FFF",
          borderRadius: "14px",
          boxShadow: "0px 0px 12px 0px rgba(0, 38, 96, 0.08)",
          // borderTop: "1px solid #EBEBEB",
          // borderBottom: "1px solid #EBEBEB",
        }}
      >
        {children}
      </Box>
      {/* </BaseCard> */}
    </>
  );
};

export default DetailCard;
