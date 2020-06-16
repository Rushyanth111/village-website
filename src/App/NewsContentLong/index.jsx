import { Box, Card, LinearProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import ProcessLongComponent from "./ProcessContent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import url from "../../constants";

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

function NewsContentLong({ schemeSelected }) {
  const [data, setData] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    setIsDataFetched(false);
    async function fetchSomeData() {
      var resp = await fetch(url + "content", {
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
    }
    setIsDataFetched(true);
    fetchSomeData();
  }, [schemeSelected]);
  const styles = useStyles();
  return (
    <React.Fragment>
      {!isDataFetched && <LinearProgress />}
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
};

function mapStateToProps(state) {
  return {
    schemeSelected: state.selectedSchemeId,
  };
}

export default connect(mapStateToProps)(NewsContentLong);
