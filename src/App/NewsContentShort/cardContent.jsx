import { Card, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { setIsSchemeSelected, setScheme, setSearchKeyword } from "../Redux";

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
  setIsSchemeSelected,
  searchKeyword,
  setNullKeywordSearch,
}) {
  const styles = useStyles();
  const history = useHistory();
  const [elevation, setElevation] = useState(6);

  function onClickHandler() {
    setIsSchemeSelected(true);
    setScheme(schemeId);
    history.push("/schemeDetails");
    setNullKeywordSearch();
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
  setIsSchemeSelected: PropTypes.func,
  searchKeyword: PropTypes.string,
  setNullKeywordSearch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.searchKeyword,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setScheme: (schemeValue) => dispatch(setScheme(schemeValue)),
    setIsSchemeSelected: (isSchemeSelected) =>
      dispatch(setIsSchemeSelected(isSchemeSelected)),
    setNullKeywordSearch: () => dispatch(setSearchKeyword("")),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContent);
