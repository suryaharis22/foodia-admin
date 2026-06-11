import React, { useEffect, useState } from "react";
// mui imports
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import {
  IconChevronDown,
  IconChevronUp,
  IconCircle,
  IconCircleFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import { getNotifications } from "@/app/(DashboardLayout)/components/api/Notifications";

type NavGroup = {
  [x: string]: any;
  id?: any;
  navlabel?: boolean;
  subheader?: string;
  // submenu?: [
  //   {
  //     id?: number;
  //     href?: any;
  //     name?: string;
  //   }
  // ];
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  isShowBadge?: any;
  level?: number | any;
  pathDirect: string;
  index?: any;
}

const NavItem = ({ item, index, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const [open, setOpen] = useState(true);
  const [Index, setIndex] = useState(
    parseInt(`${localStorage.getItem("Index")}`, 10)
  );
  const { isLoading, setIsLoading } = useAppContext();

  const handleClick = (index: any) => {
    setOpen((prevOpen) => (index === Index ? !prevOpen : true));
    setIndex(index);
    localStorage.setItem("Index", index);
  };

  const ListItemStyled = styled(ListItemButton)(() => ({
    display: "flex",
    flexDirection: "column",
    ".MuiButtonBase-root": {
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: "black",
      "&:hover": {
        backgroundColor: "black",
        color: "black",
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "black",
        "&:hover": {
          backgroundColor: "black",
          color: "black",
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      {item.submenu ? (
        <>
          <Button
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              width: "100%",
              color: "black",
              marginBottom: "5px",
            }}
            onClick={() => handleClick(index)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%", // Added width to take up the full width
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 0,
                  }}
                >
                  {itemIcon}
                </ListItemIcon> */}
                <Typography
                  fontWeight={900}
                  sx={{
                    marginLeft: "20px",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {item.submenu[0].isShowBadge ? (
                  <IconCircleFilled
                    size={10}
                    style={{
                      backgroundColor: "red",
                      color: "transparent",
                      borderRadius: "100%",
                      marginRight: "27px",
                    }}
                  />
                ) : (
                  ""
                )}
                {item.submenu[3]?.isShowBadge ? (
                  <IconCircleFilled
                    size={10}
                    style={{
                      backgroundColor: "red",
                      color: "transparent",
                      borderRadius: "100%",
                      marginRight: "27px",
                    }}
                  />
                ) : (
                  ""
                )}
                {index === Index && open ? (
                  <IconChevronUp />
                ) : (
                  <IconChevronDown />
                )}
              </Box>
            </Box>
          </Button>

          {item.submenu.map((t: any, i: any) => (
            <Collapse
              key={i}
              in={index === Index && open ? true : false}
              timeout="auto"
            >
              <ListItemButton
                sx={{
                  display: "flex",
                  marginBottom: "8px",
                  marginLeft: "40px",
                  padding: "8px 10px",
                  // borderRadius: "9px",
                  // color: theme.palette.text.secondary,
                  paddingLeft: "10px",
                  ":hover": {
                    color: "black",
                    backgroundColor: "#E9FBF0",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    borderLeft: "5px solid #3FB648",
                    color: "black",
                    ":hover": {
                      backgroundColor: "#E9FBF0",
                    },
                  },
                }}
                component={Link}
                key={t.id}
                href={t.href}
                selected={pathDirect === t.href}
                onClick={() => {
                  pathDirect !== t.href && setIsLoading(true);
                }}
              >
                {/* <ListItemIcon
                  sx={{
                    minWidth: "36px",
                    p: "3px 0",
                    color: "inherit",
                  }}
                  >
                  {t.icon}
                </ListItemIcon> */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontSize={"14px"} fontWeight={500}>
                    {t.name}
                  </Typography>
                  {t.isShowBadge ? (
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        backgroundColor: "red",
                        width: "25px",
                        padding: "5px",
                        color: "white",
                        borderRadius: "100%",
                      }}
                    >
                      {t.isShowBadge}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </ListItemButton>
            </Collapse>
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "8px",
            justifyContent: "space-between",
            width: "100%", // Added width to take up the full width
          }}
        >
          <ListItemButton
            sx={{
              display: "flex",
              padding: "5px 0px",
              // borderRadius: "9px",
              ":hover": {
                color: "black",
                backgroundColor: "#E9FBF0",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
                borderLeft: "5px solid #3FB648",
                color: "black",
                ":hover": {
                  backgroundColor: "#E9FBF0",
                },
              },
            }}
            component={Link}
            href={item.href}
            selected={pathDirect === item.href}
            onClick={() => {
              pathDirect !== item.href && setIsLoading(true);
            }}
          >
            {/* <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                }}
              >
                {itemIcon}
              </ListItemIcon> */}
            <Typography fontWeight={900} sx={{ marginLeft: "20px" }}>
              {item.title}
            </Typography>
            {/* <IconCircleFilled
              size={10}
              style={{
                backgroundColor: "red",
                color: "transparent",
                borderRadius: "100%",
                marginRight: "45px",
              }}
            /> */}
          </ListItemButton>
        </Box>
      )}
    </List>
  );
};

export default NavItem;
