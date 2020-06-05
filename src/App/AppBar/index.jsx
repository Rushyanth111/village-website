import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  fade,
  makeStyles,
} from "@material-ui/core";

import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import PropTypes from "prop-types";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { setSearchKeyword } from "../Redux";
import { useHistory } from "react-router-dom";

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
  },
  Spacer: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  SearchBox: {
    flex: 1.5,
    display: "flex",
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  SearchInput: {
    flex: 1,
  },
}));

function NavigationAppBar({ isSchemeSelected, searchKeyword }) {
  const styles = useStyles();
  const history = useHistory();
  var searchTimer = 0;
  function onClickHandler() {
    if (isSchemeSelected) {
      history.goBack();
    }
  }

  function onSearchHandler(event) {
    var e = event.target.value

    clearTimeout(searchTimer)

    searchTimer = setTimeout(() => {
      searchKeyword(e);
    }, 1000);
  }

  return (
    <AppBar position="sticky" color="default" className={styles.AppBar}>
      <Toolbar className={styles.Toolbar}>
        <Box className={styles.MenuAndTypography}>
          <IconButton edge="start" onClick={onClickHandler}>
            <ArrowBackTwoToneIcon />
          </IconButton>
          <Typography variant="h6" display="inline">
            Government Schemes
          </Typography>
        </Box>
        <Box className={styles.SearchBox}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search..."
            className={styles.SearchInput}
            onInput={onSearchHandler}
          />
        </Box>
        <Box className={styles.Spacer}></Box>
      </Toolbar>
    </AppBar>
  );
}

NavigationAppBar.propTypes = {
  isSchemeSelected: PropTypes.bool,
  searchKeyword: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isSchemeSelected: state.isSchemeSelected,
    searchKeyword: state.searchKeyword,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchKeyword: (keyword) => dispatch(setSearchKeyword(keyword)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationAppBar);
