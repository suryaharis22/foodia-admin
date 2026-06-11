import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import ImageHandler from "./ImageHandler";
import { useAppContext } from "./Context";
import { CheckBox } from "@mui/icons-material";

type Props = {
  onClick?: any;
  value?: any;
  open?: any;
  handleClose?: any;
  walletList?: {
    id?: any;
    type?: any;
    name?: any;
    balance?: any;
  }[];
  valueWalletType?: any;
  onChangeWalletType?: any;
  image_url?: any;
  status?: any;
  name?: any;
  note?: any;
  onChange?: any;
  handleSubmit?: any;
  valueEventTypeSelect?: any;
  onChangeEventType?: any;
  disableApprove?: any;
  campaign_name?: any;
  required_donation?: any;
  collected_donation?: any;
  selectedWallet?: any;
  onChangeSelectedWallet?: any;
  handleAddDonation?: any;
  totalValueDonationAmount?: any;
  valueDonationAmount?: any;
  onChangeAddDonationAmount?: any;
  fieldsCsrWalletSelection?: any;
  isLoading?: any;
  theresInputError?: any;
  children?: React.ReactNode;
  couponWalletBalance?: any;
  checkboxes?: any;
  errs?: any;
  handleInputChange?: any;
  handleCheckboxChange?: any;
};

export const ModalPopupAddDonations = ({
  open,
  handleClose,
  campaign_name,
  required_donation,
  collected_donation,
  valueWalletType,
  onChangeWalletType,
  valueDonationAmount,
  totalValueDonationAmount,
  children,
  theresInputError,
}: Props) => {
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        paddingTop: "60px",
        paddingBottom: "10px",
      }}
      open={open}
      // onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          flexDirection: "column",
          width: "900px",
          backgroundColor: "white",
          padding: "20px",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton onClick={handleClose}>
              <IconX />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Wallet Type */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "left",
                width: "auto",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                {campaign_name}
              </Typography>
            </Box>
            <Box
              sx={{
                fontWeight: "bold",
                color: "red",
                display: "flex",
                flexDirection: "column",
                justifyContent: "right",
                alignItems: "end",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "medium",
                  color: "black",
                }}
              >
                Jumlah Kurang Dana
              </Typography>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(required_donation - collected_donation)}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Wallet Type */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "left",
                width: "auto",
              }}
            >
              <Typography sx={{ fontWeight: "medium" }}>
                Choose Wallet
              </Typography>
              <Select
                disabled={theresInputError}
                variant="standard"
                size="small"
                disableUnderline
                // label="Choose Event Type"
                sx={{
                  ".MuiSelect-select": {
                    color: `${
                      valueWalletType === "default" ? "gray" : "black"
                    }`,
                    padding: "10px",
                    width: "200px",
                    background: "rgba(63, 182, 72, 0.10)",
                    borderRadius: "12px",
                    ":focus": {
                      borderRadius: "12px",
                      background: "rgba(63, 182, 72, 0.10)",
                    },
                  },
                }}
                value={valueWalletType}
                onChange={onChangeWalletType}
              >
                <MenuItem key={0} disabled value="default">
                  Select One
                </MenuItem>
                <MenuItem key={1} value="csr">
                  CSR
                </MenuItem>
                <MenuItem key={2} value="agnostic">
                  Agnostic
                </MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "35px" }}>
              {valueWalletType !== "default" && (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "right",
                    alignItems: "end",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "medium",
                      color: "black",
                    }}
                  >
                    Tambahan Dana {valueWalletType}
                  </Typography>
                  {!valueDonationAmount
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(0)
                    : new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(valueDonationAmount)}
                </Typography>
              )}
              <Typography
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "right",
                  alignItems: "end",
                  color: `${
                    totalValueDonationAmount >
                    required_donation - collected_donation
                      ? "red"
                      : "black"
                  }`,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "medium",
                  }}
                >
                  Total Tambahan Dana
                </Typography>
                {!totalValueDonationAmount
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(0)
                  : new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(totalValueDonationAmount)}
              </Typography>
            </Box>
          </Box>
        </Box>
        {valueWalletType !== "default" && <>{children}</>}
      </Box>
    </Modal>
  );
};

export const ModalPopupCouponTopup = ({
  open,
  handleClose,
  campaign_name,
  couponWalletBalance,
  valueWalletType,
  onChangeWalletType,
  valueDonationAmount,
  totalValueDonationAmount,
  children,
  theresInputError,
}: Props) => {
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        paddingTop: "60px",
        paddingBottom: "10px",
      }}
      open={open}
      // onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          flexDirection: "column",
          width: "900px",
          backgroundColor: "white",
          padding: "20px",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton onClick={handleClose}>
              <IconX />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Wallet Type */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "left",
                width: "auto",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                {campaign_name}
              </Typography>
            </Box>
            <Box
              sx={{
                fontWeight: "bold",
                color: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "right",
                alignItems: "end",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "medium",
                  color: "black",
                }}
              >
                Coupon Wallet Balance
              </Typography>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(couponWalletBalance)}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Wallet Type */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "left",
                width: "auto",
              }}
            >
              <Typography sx={{ fontWeight: "medium" }}>
                Choose Wallet
              </Typography>
              <Select
                disabled={theresInputError}
                variant="standard"
                size="small"
                disableUnderline
                // label="Choose Event Type"
                sx={{
                  ".MuiSelect-select": {
                    color: `${
                      valueWalletType === "default" ? "gray" : "black"
                    }`,
                    padding: "10px",
                    width: "200px",
                    background: "rgba(63, 182, 72, 0.10)",
                    borderRadius: "12px",
                    ":focus": {
                      borderRadius: "12px",
                      background: "rgba(63, 182, 72, 0.10)",
                    },
                  },
                }}
                value={valueWalletType}
                onChange={onChangeWalletType}
              >
                <MenuItem key={0} disabled value="default">
                  Select One
                </MenuItem>
                <MenuItem key={1} value="csr">
                  CSR
                </MenuItem>
                <MenuItem key={2} value="agnostic">
                  Agnostic
                </MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "35px" }}>
              {valueWalletType !== "default" && (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "right",
                    alignItems: "end",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "medium",
                      color: "black",
                    }}
                  >
                    Tambahan Dana {valueWalletType}
                  </Typography>
                  {!valueDonationAmount
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(0)
                    : new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(valueDonationAmount)}
                </Typography>
              )}
              <Typography
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "right",
                  alignItems: "end",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "medium",
                  }}
                >
                  Total Tambahan Dana
                </Typography>
                {!totalValueDonationAmount
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(0)
                  : new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(totalValueDonationAmount)}
              </Typography>
            </Box>
          </Box>
        </Box>
        {valueWalletType !== "default" && <>{children}</>}
      </Box>
    </Modal>
  );
};

export const ModalPopupApprovals = ({
  open,
  handleClose,
  status,
  name,
  errs,
  note,
  onChange,
  handleInputChange,
  handleSubmit,
  isLoading,
  checkboxes,
  handleCheckboxChange,
}: Props) => {
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          flexDirection: "column",
          alignItems: "center",
          width: "auto",
          backgroundColor: "white",
          padding: "35px",
          gap: "30px",
        }}
      >
        <Typography
          style={{ display: "flex", flexDirection: "row", gap: "5px" }}
        >
          {status === "approved" ? "Approve" : "Reject"}{" "}
          <Typography style={{ fontWeight: "bold" }}>{name}</Typography> ?
        </Typography>
        {status !== "approved" && checkboxes && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
              // gap: 1, // space between the items
            }}
          >
            {checkboxes?.map((checkbox: any) => (
              <Box key={checkbox.id}>
                <FormControlLabel
                  control={<Checkbox checked={checkbox.checked} />}
                  onChange={() => handleCheckboxChange(checkbox.id)} // Handle the change
                  label={checkbox.label}
                />
              </Box>
            ))}
          </Box>
        )}

        {status === "approved" ? (
          ""
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `${
                errs ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
              }`, // 2 columns
              gap: 2, // space between the items
            }}
          >
            {errs ? (
              <>
                {errs?.map((val: any, index: any) => (
                  <Box key={index} sx={{ width: "100%" }}>
                    <TextField
                      multiline
                      onChange={(e) => handleInputChange(index, e.target.value)} // Handle input change
                      label="Note :"
                      variant="outlined"
                      type="text"
                      sx={{ width: "100%" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ fontSize: "14px" }}>
                              {errs[index].label} :
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {!val.message && (
                      <Typography sx={{ color: "red", fontSize: "14px" }}>
                        *This field must be filled
                      </Typography>
                    )}
                  </Box>
                ))}
                {errs?.length === 0 && (
                  <Typography sx={{ color: "red", fontSize: "14px" }}>
                    *Choose Field That Need To Be Fixed
                  </Typography>
                )}
              </>
            ) : (
              <>
                <TextField
                  multiline
                  onChange={onChange} // Handle input change
                  label="Note :"
                  variant="outlined"
                  type="text"
                  sx={{ width: "100%" }}
                />
                {!note && (
                  <Typography sx={{ color: "red", fontSize: "14px" }}>
                    *This field must be filled
                  </Typography>
                )}
              </>
            )}
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            {isLoading && <CircularProgress size={20} />}
            <Button
              sx={{
                color: "white",
                backgroundColor:
                  status === "rejected" ? "error.main" : "primary.main",
                ":hover": {
                  backgroundColor:
                    status === "rejected" ? "error.dark" : "primary.dark",
                },
              }}
              disabled={
                errs
                  ? status === "rejected" &&
                    errs.filter((val: any) => val.message === "").length > 0
                  : false
              }
              // disabled={
              //   (status === "rejected" && errs === "") ||
              //   (status === "rejected" && note === "")
              // }
              onClick={handleSubmit}
            >
              {status === "approved" ? "Approve" : "Reject"}{" "}
            </Button>
          </Box>
          <Button
            sx={{ backgroundColor: "primary.light" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export const ModalPopupFilesDetail = ({
  open,
  handleClose,
  image_url,
}: Props) => {
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          flexDirection: "column",
          alignItems: "center",
          width: "500px",
          backgroundColor: "transparent",
          paddingBottom: "5px",
          gap: "5px",
        }}
      >
        <Box sx={{}}>
          <ImageHandler fit src={image_url} />
        </Box>
        <Button
          sx={{
            fontWeight: "bold",
            color: "white",
            bgcolor: "green",
            ":hover": { bgcolor: "green" },
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export const ModalPopupCouponPrice = ({
  open,
  onClick,
  handleClose,
  onChange,
  value,
}: Props) => {
  const { isLoading, setIsLoading } = useAppContext();
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        paddingTop: "60px",
        paddingBottom: "10px",
      }}
      open={open}
      // onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          flexDirection: "column",
          width: "380px",
          backgroundColor: "white",
          padding: "20px",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton onClick={handleClose}>
              <IconX />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>COUPON PRICE</Typography>
              <TextField
                variant="standard"
                size="small"
                value={value}
                type="text"
                onChange={onChange}
                sx={{
                  border: `1px solid lightgrey`,
                  paddingX: "10px",
                  paddingTop: "3px",
                  borderRadius: "5px",
                  width: "200px",
                }}
                InputProps={{
                  // style: {
                  //   color: `${
                  //     row.balance <
                  //     (donationAmountsCsr.find((item) => item.id === row.id)
                  //       ?.value_num || 0)
                  //       ? "red"
                  //       : "black"
                  //   }`,
                  // },
                  disableUnderline: true,
                }}
              />
            </Box>
            <button
              onClick={onClick}
              disabled={!value}
              style={{
                display: "flex",
                backgroundColor: !value ? "gray" : "#3FB648",
                gap: "10px",
                padding: "8px",
                border: 0,
                cursor: "pointer",
                borderRadius: "10px",
                width: "140px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoading && (
                <CircularProgress size="15px" sx={{ color: "white" }} />
              )}
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "medium",
                  color: "white",
                }}
              >
                Update Price
              </Typography>
            </button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
