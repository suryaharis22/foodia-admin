import { Box, Card, StepIconProps, Typography } from "@mui/material";
import { IconBan, IconCircleCheck, IconClock } from "@tabler/icons-react";
import React from "react";
import PageHeader from "../../layout/header/PageHeader";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  status?: string;
  currentBalance?: any;
  breadcrumb?: any;
  lastUpdate?: any;
  filterYear?: any;
  onChangeFilterYear?: any;
  filterYearValue?: any;
  yearMonthOption?: any;
};

interface CustomStepIconProps extends StepIconProps {
  stepNumber: number;
}

const DashboardCard = ({
  subtitle,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  title,
  children,
  status,
  currentBalance,
  breadcrumb,
  lastUpdate,
  filterYear,
  filterYearValue,
  onChangeFilterYear,
  yearMonthOption,
}: Props) => {
  const steps = ["Waiting", "Rejected", "Approved"];
  const activeStep = () => {
    if (status === "warning") {
      return 0;
    } else if (status === "rejected") {
      return 1;
    } else if (status === "approved") {
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
        borderRadius="15px"
        paddingX="50px"
        width="60px"
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

  return (
    <Card
      sx={{
        padding: "0px",
        borderRadius: 0,
        height: "100%",
        backgroundColor: "#FFF",
        boxShadow: "none",
      }}
    >
      <PageHeader
        title={title}
        breadcrumb={breadcrumb}
        currentBalance={currentBalance}
        lastUpdate={lastUpdate}
        filterYear={filterYear}
        filterYearValue={filterYearValue}
        onChangeFilterYear={onChangeFilterYear}
        yearMonthOption={yearMonthOption}
      />
      <Box sx={{ paddingX: "24px", paddingY: "12px" }}>{children}</Box>
    </Card>
  );
};

export default DashboardCard;
