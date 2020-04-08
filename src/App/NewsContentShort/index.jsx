import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import CardContent from "./cardContent";
const lorem = require('../lorem')
const useStyles = makeStyles(() => ({
  MainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  InnerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

function NewsContentShort() {
  const styles = useStyles();
  let CardContents = [];

  for (let i = 0; i < 10; i++) {
    CardContents.push(
      <CardContent key={i} textHeader={lorem.generateSentences(1)} />
    );
  }
  return (
    <Box className={styles.MainBox}>
      <Box className={styles.InnerBox}>{CardContents}</Box>
    </Box>
  );
}

export default NewsContentShort;
