import React from "react";
import {
  Box,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import lorem from "../lorem";

const useStyles = makeStyles((theme) => ({
  OuterBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: '5%'
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

function NewsContentLong() {
  const styles = useStyles();
  return (
    <Box className={styles.OuterBox}>
      <Card className={styles.CardBox}>
        <CardMedia
          className={styles.CardImage}
          image="https://picsum.photos/200/200"
        />
        <CardHeader title={lorem.generateSentences(1)} />

        <CardContent>{lorem.generateParagraphs(1)}</CardContent>
      </Card>
    </Box>
  );
}

export default NewsContentLong;
