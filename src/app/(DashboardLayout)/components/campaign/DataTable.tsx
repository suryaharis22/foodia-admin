import { SelectChangeEvent, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCampaign } from "../api/Campaign";
import { ApprovalStatus, ButtonAction, EventStatus } from "../shared/Buttons";
import { useAppContext } from "../shared/Context";
import DataTables from "../shared/DataTables";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface Data {
  id: number;
  event_name: string;
  event_type: string;
  description: string;
  donation_target: number;
  donation_collected: number;
  created_at: string;
  status: string;
  detonator: { id: number; oauth: { fullname: string } };
}

const DataTableComponent: React.FC<any> = ({
  filterText,
  searchBy,
  currentPageIndex,
  data,
  meta,
  handleChangeFilterText,
  handleKeyUp,
  handleChangePage,
  handleChangeSearch,
  handleChangeSearchBy,
  removableFilter,
  setRemovableFilter,
  removeFilter,
}) => {
  const { isLoading, setIsLoading } = useAppContext();

  const columns = [
    {
      name: "No",
      selector: (_row: any, i: any) => i + 1 + currentPageIndex * meta.per_page,
      // sortable: true,
      width: "70px",
      // style: {
      //   paddingLeft: "30px",
      // },
    },
    {
      name: "Volunteer",
      cell: (row: any) => <div>{row.detonator?.oauth?.fullname}</div>,
      // sortable: true,
      width: "auto",
    },
    {
      name: "Event Name",
      cell: (row: any) => <div>{row.event_name}</div>,
      // sortable: true,
    },
    {
      name: "Target",
      cell: (row: any) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.donation_target)}
        </div>
      ),
      // sortable: true,
      width: "auto",
    },
    {
      name: "Collected",
      cell: (row: any) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.donation_collected)}
        </div>
      ),
      // sortable: true,
      width: "auto",
    },
    {
      name: "Remaining",
      cell: (row: any) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.donation_remaining)}
        </div>
      ),
      // sortable: true,
      width: "auto",
    },
    {
      name: "Event Type",
      cell: (row: any) => (
        <div>
          {row.event_type === "one_time" ? "Dana Mandiri" : "Dana Terbuka"}
        </div>
      ),
      width: "auto",
      // sortable: true,
    },
    {
      name: "Approval Status",
      cell: (row: any) => <ApprovalStatus row={row} />,
      width: "auto",
      // sortable: true,
    },
    {
      name: "Event Status",
      // cell: (row: any) => <div>{row.campaign_status}</div>,
      cell: (row: any) => <EventStatus row={row} />,
      // sortable: true,
      width: "auto",
    },
    {
      name: "Action",
      // selector: (row: any) => row.age,
      cell: (row: any) => (
        <Stack spacing={1} direction="row">
          <Link
            href={{
              pathname: "/ui-components/pages/campaign/info",
              query: {
                id: row.id,
              },
            }}
          >
            <ButtonAction label="View" />
          </Link>
        </Stack>
      ),
      // width: "auto",
      sortable: true,
    },
    // Add more columns as needed
  ];

  const searchOption = [
    {
      id: 1,
      value: "detonator_name",
      label: "Volunteer",
    },
    {
      id: 2,
      value: "event_name",
      label: "Event Name",
    },
  ];

  return (
    <>
      <DataTables
        value={filterText}
        removableFilter={removableFilter}
        onClickRemoveFilter={(i: any) => removeFilter(i)}
        searchOption={searchOption}
        valueSearchBy={searchBy}
        onChangeFilterText={handleChangeFilterText}
        onKeyUpSearch={handleKeyUp}
        onChange={handleChangePage}
        onChangeSearch={handleChangeSearch}
        onChangeSearchBy={handleChangeSearchBy}
        pageItems={data.length}
        meta={meta}
        columns={columns}
        data={data}
        pagination={true}
        currentPageIndex={currentPageIndex}
      />
    </>
  );
};

export default DataTableComponent;
