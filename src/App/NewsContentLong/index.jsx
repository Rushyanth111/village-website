import { Box, Card, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import ProcessLongComponent from "./ProcessContent";

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

function NewsContentLong() {
  const [data, setData] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  async function fetchSomeData() {
    var resp = await fetch("https://api.rxav.pw/village/content", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schemeId: "2",
      }),
    });
    resp = await resp.json(resp);

    setData(resp);
    setIsDataFetched(true);
  }

  useEffect(() => {
    fetchSomeData();
    console.log("I HAVE RUN")
  }, []);
  const styles = useStyles();
  return (
    <Box className={styles.OuterBox}>
      <Card className={styles.CardBox}>
        {isDataFetched && <ProcessLongComponent jsonData={data} />}
      </Card>
    </Box>
  );
}

export default NewsContentLong;
