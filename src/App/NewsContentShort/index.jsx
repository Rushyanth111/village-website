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

function NewsContentShort({ searchKeyword, geography }) {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [range, setRange] = useState(5);

  function handleLoadMore() {
    setRange(range + 5);
  }

  useEffect(() => {
    setIsDataFetched(false);
    async function fetchData(searchKeyword, range) {
      var resp;
      if (searchKeyword === undefined || searchKeyword === "") {
        resp = await fetch(url + geography + `/list?range=${range}`, {
          mode: "cors",
        });
      } else {
        resp = await fetch(
          url + geography + `/search?phrase=${searchKeyword}`,
          {
            mode: "cors",
          }
        );
      }

      resp = await resp.json();

      setData(resp);
    }
    setIsDataFetched(true);
    fetchData(searchKeyword, range);
  }, [searchKeyword, range, geography]);

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
    geography: state.geography,
  };
}

NewsContentShort.propTypes = {
  searchKeyword: PropTypes.string,
  geography: PropTypes.string,
};

export default connect(mapStateToProps)(NewsContentShort);
