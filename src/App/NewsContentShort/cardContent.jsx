import { Card, Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { setScheme, setSchemeSelected, setSearchKeyword } from "../Redux";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  card: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px",
    margin: "10px",
    borderRadius: 16,
  },
  text: {
    flex: 1,
    padding: "10px",
    alignItems: "left",
    fontWeight: 500,
  },
  image: {
    alignSelf: "right",
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  cardHidden: {
    display: "none",
  },
}));

function CardContent({
  textHeader,
  imageData,
  schemeId,
  setScheme,
  setSchemeSelected,
  setNullKeywordSearch,
}) {
  const styles = useStyles();
  const history = useHistory();
  const [elevation, setElevation] = useState(6);

  function onClickHandler() {
    setScheme(schemeId);
    setSchemeSelected(true);
    setNullKeywordSearch();
    history.push("/schemeDetails");
  }

  return (
    <Card
      className={styles.card}
      variant="elevation"
      elevation={elevation}
      onMouseEnter={() => {
        setElevation(20);
      }}
      onMouseLeave={() => {
        setElevation(6);
      }}
      onClick={onClickHandler}
    >
      <Typography variant="body1" display="block" className={styles.text}>
        {textHeader.replace("# ", "")}
      </Typography>
      <img
        className={styles.image}
        src={`data:image/jpeg;base64,${imageData}`}
        alt=""
      />
    </Card>
  );
}

CardContent.propTypes = {
  textHeader: PropTypes.string,
  imageData: PropTypes.string,
  schemeId: PropTypes.number,
  setScheme: PropTypes.func,
  setSchemeSelected: PropTypes.func,
  setNullKeywordSearch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    setScheme: (schemeValue) => dispatch(setScheme(schemeValue)),
    setSchemeSelected: (isSchemeSelected) =>
      dispatch(setSchemeSelected(isSchemeSelected)),
    setNullKeywordSearch: () => dispatch(setSearchKeyword("")),
  };
}

export default connect(null, mapDispatchToProps)(CardContent);
