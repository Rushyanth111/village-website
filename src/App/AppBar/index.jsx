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
  },
}));

function NavigationAppBar({
  isSchemeSelected,
  searchKeyword,
  setIsSchemeSelected,
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
        <div className={styles.Spacer} />
        <div id="google_translate_element" />
      </Toolbar>
    </AppBar>
  );
}

NavigationAppBar.propTypes = {
  isSchemeSelected: PropTypes.bool,
  setIsSchemeSelected: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isSchemeSelected: state.isSchemeSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsSchemeSelected: (val) => dispatch(setIsSchemeSelected(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationAppBar);
