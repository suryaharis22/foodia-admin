import {
  Box,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { IconBan, IconCircleCheck, IconClock } from "@tabler/icons-react";
import DetailCard from "../shared/DetailCard";
import { uniqueId } from "lodash";
import { Padding } from "@mui/icons-material";
import moment from "moment";

interface ChildProps {
  data: {
    id: number;
    recipient_name: any;
    bank: any;
    amount: any;
    admin_fee: any;
    rekening: any;
    merchant: {
      merchant_name: any;
      oauth: { fullname: string; email: string };
      wallet: {
        balance: any;
      };
    };
    payment_method: any;
    status: string;
    created_at: string;
    updated_at: string;
    note: any;
  };
}

interface CustomStepIconProps extends StepIconProps {
  stepNumber: number;
}

export const Field = ({ value, label }: any) => {
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
          width: "25%",
          color: "#999",
        }}
      >
        <Typography>{label}</Typography>
        <Typography>:</Typography>
      </Box>
      <Box sx={{ paddingX: "10px" }}>{value}</Box>
    </Box>
  );
};

const Info: React.FC<ChildProps> = ({ data }) => {
  const steps = ["Waiting", "Rejected", "Approved"];

  const activeStep = () => {
    if (data.status === "warning") {
      return 0;
    } else if (data.status === "rejected") {
      return 1;
    } else if (data.status === "approved") {
      return 2;
    }
  };

  const CustomStepIcon: React.FC<CustomStepIconProps> = ({
    active,
    stepNumber,
  }) => {
    // Customize each step's icon individually
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX="20px"
        color="white"
        zIndex={1}
      >
        {stepNumber === 1 ? (
          <Typography
            display="flex"
            flexDirection="row"
            sx={
              active
                ? {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "warning.main",
                  }
                : {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "grey",
                  }
            }
          >
            Waiting <IconClock />
          </Typography>
        ) : stepNumber === 2 ? (
          <Typography
            display="flex"
            flexDirection="row"
            sx={
              active
                ? {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "error.main",
                  }
                : {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "grey",
                  }
            }
          >
            Rejected <IconBan />
          </Typography>
        ) : (
          stepNumber === 3 && (
            <Typography
              display="flex"
              flexDirection="row"
              sx={
                active
                  ? {
                      borderRadius: "15px",
                      paddingX: "10px",
                      backgroundColor: "success.main",
                    }
                  : {
                      borderRadius: "15px",
                      paddingX: "10px",
                      backgroundColor: "grey",
                    }
              }
            >
              Approved <IconCircleCheck />
            </Typography>
          )
        )}
      </Box>
    );
  };

  const status = [
    <Stepper key={uniqueId()} activeStep={activeStep()} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon stepNumber={index + 1} {...props} />
            )}
          >
            {/* {label} */}
          </StepLabel>
        </Step>
      ))}
    </Stepper>,
  ];

  return (
    <DetailCard
      title="Disbursement Information"
      subTitle={new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(data.merchant.wallet.balance)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "10px",
          width: "100%",
        }}
      >
        <Field label="Merchant Name" value={data.merchant.merchant_name} />
        <Field label="Recipient Name" value={data.recipient_name} />
        <Field label="User Name" value={data.merchant.oauth.fullname} />
        <Field label="Email" value={data.merchant.oauth.email} />
        <Field
          label="Payment Method"
          value={data.payment_method === "BANK" ? "Bank" : "E-Wallet"}
        />
        <Field
          label={data.payment_method === "BANK" ? "Bank Name" : "E-Wallet Name"}
          value={data.bank}
        />
        <Field
          label={
            data.payment_method === "BANK" ? "Rekening" : "E-Wallet Number"
          }
          value={data.rekening}
        />
        <Field
          label="Amount"
          value={new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.amount - data.admin_fee)}
        />
        <Field
          label="Admin Fee"
          value={new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.admin_fee)}
        />
        <Field
          label="Created At"
          value={moment(data.created_at).format("MM/DD/YYYY")}
        />
        <Field
          label="Updated At"
          value={moment(data.updated_at).format("MM/DD/YYYY")}
        />
        <Field label="Note" value={data.note} />
      </Box>
      <Box>{status}</Box>
    </DetailCard>
  );
};

export default Info;
