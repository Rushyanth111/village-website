import { Card, LinearProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import ProcessLongComponent from "./ProcessContent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import url from "../../constants";

const useStyles = makeStyles((theme) => ({
  CardBox: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    [theme.breakpoints.up("md")]: {
      marginTop: "4rem",
      maxWidth: "50%",
      margin: "auto",
    },
  },
}));

function NewsContentLong({ schemeSelected, geography }) {
  const styles = useStyles();
  const [data, setData] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    async function fetchSomeData() {
      var resp = await fetch(
        url + geography + "/content" + "?schemeId=" + schemeSelected,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      resp = await resp.json(resp);
      setData(resp);
    }
    setIsDataFetched(false);
    fetchSomeData();
    setIsDataFetched(true);
  }, [schemeSelected, geography]);

  return (
    <React.Fragment>
      {!isDataFetched && <LinearProgress />}
      <Card className={styles.CardBox}>
        {isDataFetched && <ProcessLongComponent jsonData={data} />}
      </Card>
    </React.Fragment>
  );
}

NewsContentLong.propTypes = {
  schemeSelected: <PropTypes className="string"></PropTypes>,
  geography: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    schemeSelected: state.selectedSchemeId,
    geography: state.geography,
    searchKeyword: state.searchKeyword,
  };
}

export default connect(mapStateToProps)(NewsContentLong);
