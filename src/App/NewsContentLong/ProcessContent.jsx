import {
  CardHeader,
  CardMedia,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  OuterBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  CardBox: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50%",
    },
  },
  CardImage: {
    display: "flex",
    minWidth: 200,
    minHeight: 200,
  },
  CardContent: {
    display: "flex",
  },
}));

function ProcessLongComponent({ jsonData }) {
  const style = useStyles();
  const components = [];
  var keyno = 0;
  var initialTitleSet = false;
  for (const [, v] of Object.entries(jsonData)) {
    const componentSection = [];
    for (const [dkey, val] of Object.entries(v)) {
      if (!dkey.localeCompare("000-title") && !initialTitleSet) {
        componentSection.push(
          <CardHeader
            title={val.slice(2)}
            key={keyno++}
            titleTypographyProps={{
              variant: "h3",
            }}
          />
        );
        initialTitleSet = true;
      } else if (dkey.endsWith("title")) {
        componentSection.push(
          <CardHeader title={val.slice(val.indexOf(" "))} key={keyno++} />
        );
      } else if (dkey.endsWith("image")) {
        componentSection.push(
          <CardMedia
            className={style.CardImage}
            image={`data:image/jpeg;base64,${val["encoded_image"]}`}
            key={keyno++}
          />
        );
      } else if (dkey.endsWith("listElement")) {
        componentSection.push(
          <Typography key={keyno++} component={"span"}>
            <ReactMarkdown source={val} />
          </Typography>
        );
      } else if (dkey.endsWith("normal")) {
        componentSection.push(
          <Typography key={keyno++} component={"span"}>
            <ReactMarkdown source={val} />
          </Typography>
        );
      } else if (dkey.endsWith("table")) {
        const table = [];
        val["data"].forEach((row) => {
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
        componentSection.push(
          <Table key={keyno++}>
            <TableBody>{table}</TableBody>
          </Table>
        );
      } else {
        continue;
      }
    }

    components.push(<Container key={keyno++}>{componentSection}</Container>);
  }

  return <>{components}</>;
}

ProcessLongComponent.propTypes = {
  jsonData: PropTypes.object,
};

export default ProcessLongComponent;
