"use client";
import {
  IconBuildingStore,
  IconBurger,
  IconBusinessplan,
  IconHandMove,
  IconMoneybag,
  IconSpeakerphone,
  IconUser,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";
import { useAppContext } from "../../components/shared/Context";
import { useEffect, useState } from "react";
import { getNotifications } from "../../components/api/Notifications";

const Menuitems = () => {
  const {} = useAppContext();
  const { isLoading, setIsLoading } = useAppContext();
  const [notifData, setNotifData] = useState<any>({});

  useEffect(() => {
    getNotifications(setNotifData, setIsLoading);
  }, [setIsLoading]);

  if (localStorage.getItem("ROLE") == "superadmin") {
    return [
      {
        id: uniqueId(),
        title: "Dashboard",
        href: "/ui-components/pages/dashboard",
        icon: IconWallet,
      },
      {
        id: uniqueId(),
        title: "Wallet",
        icon: IconWallet,
        submenu: [
          {
            id: uniqueId(),
            href: "/ui-components/pages/wallet/csr",
            name: "CSR Wallet",
            icon: <IconWallet />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/wallet/agnostic",
            name: "Agnostic Wallet",
            icon: <IconWallet />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/wallet/merchant-payments",
            name: "Merchant Wallet",
            icon: <IconWallet />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/wallet/coupon",
            name: "Coupon Wallet",
            isShowBadge: notifData.coupon,
            icon: <IconWallet />,
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Donator",
        icon: IconHandMove,
        submenu: [
          {
            id: uniqueId(),
            href: "/ui-components/pages/donator",
            name: "Corporations",
            icon: <IconBusinessplan />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/donator/individuals",
            name: "Individuals",
            icon: <IconUser />,
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Volunteer",
        icon: IconUsers,
        submenu: [
          {
            id: uniqueId(),
            href: "/ui-components/pages/detonator",
            name: "List Volunteer",
            isShowBadge: notifData.detonator,
            icon: <IconUser />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/campaign",
            name: "List Campaign",
            isShowBadge: notifData.coupon,
            icon: <IconSpeakerphone />,
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Merchant",
        icon: IconBuildingStore,
        submenu: [
          {
            id: uniqueId(),
            href: "/ui-components/pages/merchant",
            name: "List Merchant",
            isShowBadge: notifData.merchant,
            icon: <IconUser />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/product",
            name: "List Product",
            isShowBadge: notifData.product,
            icon: <IconBurger />,
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Beneficiaries",
        icon: IconMoneybag,
        submenu: [
          {
            id: uniqueId(),
            href: "/ui-components/pages/beneficiaries",
            name: "List Beneficiaries",
            isShowBadge: notifData.beneficiaries,
            icon: <IconUser />,
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Disbursement",
        icon: IconMoneybag,
        submenu: [
          {
            id: uniqueId(),
            href: "/ui-components/pages/disbursement",
            name: "List Disbursement",
            isShowBadge: notifData.disbursement,
            icon: <IconUser />,
          },
        ],
      },
    ];
  } else if (localStorage.getItem("ROLE") == "corporate") {
    return [
      {
        id: uniqueId(),
        title: "Wallet",
        icon: IconWallet,
        submenu: [
          {
            id: uniqueId(),
            href: "/ui-components/pages/wallet/csr",
            name: "CSR Wallet",
            icon: <IconWallet />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/wallet/agnostic",
            name: "Agnostic Wallet",
            icon: <IconWallet />,
          },
          {
            id: uniqueId(),
            href: "/ui-components/pages/wallet/merchant-payments",
            name: "Merchant Payments",
            icon: <IconWallet />,
          },
        ],
      },
    ];
  }
};

export default Menuitems;
