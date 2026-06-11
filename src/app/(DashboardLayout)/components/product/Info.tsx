import {
  Box,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import DetailCard from "../shared/DetailCard";
import { IconBan, IconCircleCheck, IconClock } from "@tabler/icons-react";
import { uniqueId } from "lodash";

type ChildProps = {
  data: {
    id: number;
    name: string;
    price: any;
    status: string;
    qty: string;
    note: string;
    description: string;
    images: [{ id: number; image_url: string }];
  };
};

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
        <Typography width="130px">{label}</Typography>
        <Typography>:</Typography>
      </Box>
      <Box sx={{ paddingLeft: "40px" }}>{value}</Box>
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
    <>
      <DetailCard title="Product Information">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
            width: "100%",
          }}
        >
          <Field label="Name" value={data.name} />
          <Field
            label="Price"
            value={new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(data.price)}
          />
          <Field label="Quantity" value={data.qty} />
          <Field label="Note" value={data.note} />
          <Field label="Description" value={data.description} />
        </Box>
        <Box>{status}</Box>
      </DetailCard>
    </>
  );
};

export default Info;
