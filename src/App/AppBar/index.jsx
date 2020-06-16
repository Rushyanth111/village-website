import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

import React, { useState } from "react";
import { setIsSchemeSelected, setSearchKeyword } from "../Redux";

import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setGeography } from "../Redux/actions";
import { useHistory } from "react-router-dom";

import SearchBox from "./searchbox";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "white",
    width: "100%",
  },
  Toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  MenuAndTypography: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  Spacer: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  GeographyButton: {
    padding: 2,
    margin: 10,
  },
}));

function NavigationAppBar({
  isSchemeSelected,
  searchKeyword,
  setIsSchemeSelected,
  geography,
  setGeography,
}) {
  const styles = useStyles();
  const history = useHistory();
  var searchTimer = 0;

  function onClickHandler() {
    if (isSchemeSelected) {
      setIsSchemeSelected(false);
      searchKeyword("");
      history.goBack();
    }
  }

  return (
    <AppBar position="sticky" color="default" className={styles.AppBar}>
      <Toolbar className={styles.Toolbar}>
        <Box className={styles.MenuAndTypography}>
          <IconButton edge="start" onClick={onClickHandler}>
            {isSchemeSelected ? <ArrowBackTwoToneIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" display="inline">
            Government Schemes
          </Typography>
        </Box>
        <SearchBox />
        <Box className={styles.Spacer}></Box>
        <div id="google_translate_element" />
      </Toolbar>
    </AppBar>
  );
}

NavigationAppBar.propTypes = {
  isSchemeSelected: PropTypes.bool,
  searchKeyword: PropTypes.func,
  setIsSchemeSelected: PropTypes.func,
  geography: PropTypes.string,
  setGeography: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isSchemeSelected: state.isSchemeSelected,
    geography: state.geography,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchKeyword: (keyword) => dispatch(setSearchKeyword(keyword)),
    setIsSchemeSelected: (val) => dispatch(setIsSchemeSelected(val)),
    setGeography: (val) => dispatch(setGeography(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationAppBar);
