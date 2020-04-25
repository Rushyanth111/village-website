import { Card, Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { setIsSchemeSelected, setScheme } from "../Redux";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  card: {
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
}));

function CardContent({
  textHeader,
  imageData,
  schemeId,
  setScheme,
  setIsSchemeSelected,
}) {
  const styles = useStyles();
  const history = useHistory();
  const [elevation, setElevation] = useState(6);

  function onClickHandler() {
    setIsSchemeSelected(true);
    setScheme(schemeId);
    history.push('/schemeDetails')
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
        {textHeader}
      </Typography>
      <img
        className={styles.image}
        src={`data:image/png;base64,${imageData}`}
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
};

function mapDispatchToProps(dispatch) {
  return {
    setScheme: (schemeValue) => dispatch(setScheme(schemeValue)),
    setIsSchemeSelected: (isSchemeSelected) =>
      dispatch(setIsSchemeSelected(isSchemeSelected)),
  };
}

export default connect(null, mapDispatchToProps)(CardContent);
