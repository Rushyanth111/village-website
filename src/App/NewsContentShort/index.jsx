import { Box, Container, makeStyles } from "@material-ui/core";

import AppBar from "../AppBar";
import CardContent from "./cardContent";
import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  async function fetchData() {
    var resp = await fetch("http://localhost:5000/list", {
      mode: "cors",
    });

    resp = await resp.json();

    setData(resp);
    setIsDataFetched(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppBar />
      <Box className={styles.MainBox}>
        <Box className={styles.InnerBox}>
          {isDataFetched && (
            <Container>
              {data.map((val, index) => (
                <CardContent
                  textHeader={val["title"]}
                  imageData={val["image"]}
                  key={index}
                  schemeId={val["schemeid"]}
                />
              ))}
            </Container>
          )}
        </Box>
      </Box>
    </>
  );
}

export default NewsContentShort;
