import { Card, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { setIsSchemeSelected, setScheme, setSearchKeyword } from "../Redux";

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

  //Get All Search Keywords First:
  const [isPresent, setisPresent] = useState(true);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      const keywords = searchKeyword.split(" ");

      for (let i = 0; i < keywords.length; i++) {
        if (textHeader.indexOf(keywords[i]) > 0) {
          setisPresent(true);
          return;
        }
      }

      setisPresent(false);
    } else if (searchKeyword.length == 0) {
      setisPresent(true);
    } else {
      setisPresent(false);
    }

    console.log(isPresent);
  }, [searchKeyword]);

  return (
    <React.Fragment>
      {isPresent == true ? (
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
      ) : null}
    </React.Fragment>
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
