import { Box, Table, TableBody, TableCell, TableRow } from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";

function TableComponent({ TableData }) {
  const table = [];
  TableData["data"].forEach((row) => {
    let rowData = [];
    row.forEach((cell) => {
      rowData.push(
        <TableCell>
          <ReactMarkdown source={cell} />
        </TableCell>
      );
    });
    table.push(<TableRow>{rowData}</TableRow>);
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
