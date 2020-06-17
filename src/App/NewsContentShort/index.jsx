import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import CardContent from "./cardContent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import url from "../../constants";

const useStyles = makeStyles((theme) => ({
  MainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "strech",
    [theme.breakpoints.up("md")]: {
      maxWidth: "75%",
      margin: "auto",
    },
  },
  Button: {
    flex: 1,
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

  function handleLoadMore() {
    setRange(range + 5);
  }

  useEffect(() => {
    fetchData(searchKeyword, range);
  }, [searchKeyword, range]);

  return (
    <Box className={styles.MainBox}>
      {!isDataFetched ? (
        <CircularProgress className={styles.Progress} />
      ) : (
        data.map((val, index) => (
          <CardContent
            textHeader={val["title"]}
            imageData={val["encoded_image"]}
            key={index}
            schemeId={val["schemeId"]}
          />
        ))
      )}
      <Button className={styles.Button} onClick={handleLoadMore}>
        Load More
      </Button>
    </Box>
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
