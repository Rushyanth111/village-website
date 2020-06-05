import { Box, Button, CircularProgress, Container, makeStyles } from "@material-ui/core";

import AppBar from "../AppBar";
import CardContent from "./cardContent";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import url from "../../constants";
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
  Button: {
    flex: 1,
    padding: "10px",
    margin: "10px",
    borderRadius: 16,
  },
}));

function NewsContentShort({ searchKeyword }) {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [range, setRange] = useState(5);
  async function fetchData(searchKeyword, range) {
    setIsDataFetched(false);
    var resp;
    if (searchKeyword === undefined || searchKeyword === "") {
      resp = await fetch(url + `list?range=${0}-${range}`, {
        mode: "cors",
      });
    } else {
      resp = await fetch(url + `search?phrase=${searchKeyword}`, {
        mode: "cors",
      });
    }

    resp = await resp.json();

    setData(resp);
    setIsDataFetched(true);
  }

  function handleLoadMore(){
    setRange(range+5);
  }


  useEffect(() => {
    fetchData(searchKeyword, range);
  }, [searchKeyword, range]);

  return (
    <>
      <AppBar />
      <Box className={styles.MainBox}>
        <Box className={styles.InnerBox}>
          {!isDataFetched ? <CircularProgress/>: (
            <Container>
              {data.map((val, index) => (
                <CardContent
                  textHeader={val["title"]}
                  imageData={val["encoded_image"]}
                  key={index}
                  schemeId={val["schemeid"]}
                />
              ))}
            </Container>
          )}
          <Button className={styles.Button} onClick={handleLoadMore}>Load More</Button>
        </Box>
      </Box>
    </>
  );
}

function mapStateToProps(state) {
  return {
    searchKeyword: state.searchKeyword,
  };
}

NewsContentShort.propTypes = {
  searchKeyword: PropTypes.string,
};

export default connect(mapStateToProps)(NewsContentShort);
