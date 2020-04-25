import { Box, Card, LinearProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import AppBar from "../AppBar";
import ProcessLongComponent from "./ProcessContent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

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

function NewsContentLong({ schemeSelected, isSchemeSelected }) {
  const history = useHistory();
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
        schemeId: `${schemeSelected}`,
      }),
    });
    resp = await resp.json(resp);
    setData(resp);
    setIsDataFetched(true);
  }

  if (!isSchemeSelected) {
    history.push("/");
  }

  useEffect(() => {
    fetchSomeData();
  }, []);
  const styles = useStyles();
  return (
    <React.Fragment>
      {!isDataFetched && <LinearProgress />}
      <AppBar />
      <Box className={styles.OuterBox}>
        <Card className={styles.CardBox}>
          {isDataFetched && <ProcessLongComponent jsonData={data} />}
        </Card>
      </Box>
    </React.Fragment>
  );
}

NewsContentLong.propTypes = {
  schemeSelected: PropTypes.number,
  isSchemeSelected: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    schemeSelected: state.selectedSchemeId,
    isSchemeSelected: state.isSchemeSelected,
  };
}

export default connect(mapStateToProps)(NewsContentLong);
