import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import Menuitems from "./MenuItems";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const menuItems = Menuitems();

  return (
    <Box sx={{ px: 2 }}>
      <List className="sidebarNav" component="div">
        {menuItems?.map((item, index) => {
          // {/********SubHeader**********/}
          // if (item.subheader) {
          //   return <NavGroup item={item} key={item.subheader} />;

          //   // {/********If Sub Menu**********/}
          //   /* eslint no-else-return: "off" */
          // } else {
          return (
            <NavItem
              item={item}
              index={index}
              key={item.id}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          );
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
