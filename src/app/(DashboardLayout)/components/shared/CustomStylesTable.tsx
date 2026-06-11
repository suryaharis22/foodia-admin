const CustomStylesTable = {
  table: {
    style: {
      width: "100%",
      // maxWidth: "auto", // set the width of the table wrapper
      border: "1px solid #CCD1D9",
      borderRadius: "6px 6px 0px 0px",
    },
  },
  cells: {
    style: {
      paddingLeft: "20px", // override the cell padding for data cells
      justifyContent: "left",
    },
  },
  rows: {
    style: {
      backgroundColor: "#FCFDFF",
      // marginTop: "10px",
      // borderRadius: "10px",
      // border: "0px",
      minHeight: "72px", // override the row height
      "&:not(:last-of-type)": {
        // border: "0px",
      },
    },
  },
  denseStyle: {
    minHeight: "32px",
  },
  headRow: {
    style: {
      backgroundColor: "#FCFDFF",
      color: "black",
      minHeight: "52px",
      borderRadius: "6px 6px 0px 0px",
    },
    denseStyle: {
      minHeight: "32px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "20px", // override the cell padding for head cells
      paddingRight: "10px",
      // justifyContent: "center",
      color: "black",
      fontWeight: "bold",
    },
  },
  pagination: {
    style: {
      // backgroundColor: "#FCFDFF",
      // borderTop: "none",
      // padding: "10px",
      // border: "1px solid #CCD1D9",
      // borderTop: "0px",
      // justifyContent: "center",
      // borderRadius: "40px",
    },
    pageButtonsStyle: {
      borderRadius: "100%",
      border: "1px solid #CCD1D9",
      margin: "2px",
      color: "#007BFF",
      backgroundColor: "white",
    },
    activePageButtonStyle: {
      backgroundColor: "#007BFF",
      color: "white",
    },
    disabledPageButtonStyle: {
      color: "#ccc",
      cursor: "not-allowed",
    },
  },
};

export default CustomStylesTable;
