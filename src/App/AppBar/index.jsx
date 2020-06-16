import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  fade,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { setIsSchemeSelected, setSearchKeyword } from "../Redux";

import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { setGeography } from "../Redux/actions";
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
  SearchBox: {
    flex: 1.5,
    display: "flex",
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 10,
    width: "100%",
  },
  SearchInput: {
    flex: 1,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  var searchTimer = 0;

  function onClickHandler() {
    if (isSchemeSelected) {
      setIsSchemeSelected(false);
      searchKeyword("");
      history.goBack();
    }
  }

  function onSearchHandler(event) {
    var e = event.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchKeyword(e);
    }, 1000);
  }

  function onChangeGeophraphy(event) {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  }

  function onChangeGeophraphySubIndia() {
    setGeography("India");
    setMenuOpen(false);
  }
  function onChangeGeophraphySubKarnataka() {
    setGeography("Karnataka");
    setMenuOpen(false);
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
        <Button onClick={onChangeGeophraphy} className={styles.GeographyButton}>
          {geography}
        </Button>
        <Menu open={menuOpen} anchorEl={anchorEl}>
          <MenuItem onClick={onChangeGeophraphySubKarnataka}>
            Karnataka
          </MenuItem>
          <MenuItem onClick={onChangeGeophraphySubIndia}>India</MenuItem>
        </Menu>
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
