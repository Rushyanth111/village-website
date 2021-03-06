import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import SearchBox from "./searchbox";
import { connect } from "react-redux";
import { setMenuBar } from "../Redux/actions";
import { setSchemeSelected } from "../Redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
  TranslateButton: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

function NavigationAppBar({
  isSchemeSelected,
  setSchemeSelected,
  setMenuOpen,
}) {
  const styles = useStyles();
  const history = useHistory();

  function onClickHandler() {
    if (isSchemeSelected) {
      //If the Scheme is selected, do not show them the options, send them back.
      setSchemeSelected(false);
      history.goBack();
    }
    setMenuOpen();
  }

  return (
    <AppBar position="sticky" color="default">
      <Toolbar className={styles.Toolbar}>
        <Box className={styles.MenuAndTypography}>
          <IconButton edge="start" onClick={onClickHandler}>
            {isSchemeSelected ? <ArrowBackTwoToneIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h5" display="inline">
            Government Schemes
          </Typography>
        </Box>
        <SearchBox />
        <div className={styles.Spacer} />
        <div id="google_translate_element" className={styles.TranslateButton} />
      </Toolbar>
    </AppBar>
  );
}

NavigationAppBar.propTypes = {
  isSchemeSelected: PropTypes.bool,
  setSchemeSelected: PropTypes.func,
  setMenuOpen: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isSchemeSelected: state.isSchemeSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSchemeSelected: (val) => dispatch(setSchemeSelected(val)),
    setMenuOpen: () => dispatch(setMenuBar(true)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationAppBar);
