import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

function TableComponent({ TableData }) {
  const table = [];
  TableData["data"].forEach((row, index) => {
    let rowData = [];
    row.forEach((cell, iindex) => {
      rowData.push(<TableCell key={`${index}-${iindex}`}>{cell}</TableCell>);
    });
    table.push(<TableRow key={`row-${index}`}>{rowData}</TableRow>);
  });

  return (
    <Box style={{ overflowX: "auto" }}>
      <Table>
        <TableBody>{table}</TableBody>
      </Table>
    </Box>
  );
}

TableComponent.propTypes = {
  TableData: PropTypes.object,
};

export default TableComponent;
